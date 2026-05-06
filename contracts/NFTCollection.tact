// NFT Collection Smart Contract for TON
// Standard: TEP-62

import "@stdlib/ownable";
import "@stdlib/jetton";

contract NFTCollection {
    owner: Address;
    nextItemIndex: Int as uint64 = 0;
    collectionContent: String;
    nftItemCode: Cell;
    mintPrice: Int;

    init(collectionContent: String, nftItemCode: Cell, mintPrice: Int) {
        self.owner = sender();
        self.collectionContent = collectionContent;
        self.nftItemCode = nftItemCode;
        self.mintPrice = mintPrice;
    }

    receive("Mint") {
        let ctx = context();
        let msgValue = ctx.value;

        require(msgValue >= self.mintPrice, "Insufficient funds for mint");

        let itemIndex = self.nextItemIndex;
        self.nextItemIndex = itemIndex + 1;

        let itemContent = self.collectionContent + "/item/" + itemIndex.toString();

        let nftInit = initOf NFTItem(self.owner, itemIndex, itemContent, myAddress());
        let itemAddress = contractAddress(nftInit);

        send(SendParameters{
            to: itemAddress,
            value: 0,
            mode: SendIgnoreErrors,
            body: "Init".toCell(),
            code: nftInit.code,
            data: nftInit.data
        });

        if (msgValue > self.mintPrice) {
            send(SendParameters{
                to: ctx.sender,
                value: msgValue - self.mintPrice,
                mode: SendIgnoreErrors,
                body: "Refund excess".toCell()
            });
        }
    }

    receive(msg: TransferOwnership) {
        require(sender() == self.owner, "Only owner can transfer ownership");
        self.owner = msg.newOwner;
    }

    get fun get_collection_data() -> CollectionData {
        return CollectionData{
            nextItemIndex: self.nextItemIndex,
            collectionContent: self.collectionContent,
            owner: self.owner
        };
    }

    get fun get_nft_address_by_index(index: Int) -> Address {
        let nftInit = initOf NFTItem(self.owner, index, "", myAddress());
        return contractAddress(nftInit);
    }

    get fun get_mint_price() -> Int {
        return self.mintPrice;
    }
}

struct CollectionData {
    nextItemIndex: Int;
    collectionContent: String;
    owner: Address;
}

message TransferOwnership {
    newOwner: Address;
}

contract NFTItem {
    owner: Address;
    index: Int as uint64;
    content: String;
    collectionAddress: Address;

    init(owner: Address, index: Int, content: String, collectionAddress: Address) {
        self.owner = owner;
        self.index = index;
        self.content = content;
        self.collectionAddress = collectionAddress;
    }

    receive(msg: Transfer) {
        require(sender() == self.owner, "Not the owner");
        self.owner = msg.target;
    }

    get fun get_nft_data() -> NFTData {
        return NFTData{
            index: self.index,
            collectionAddress: self.collectionAddress,
            owner: self.owner,
            content: self.content
        };
    }
}

struct NFTData {
    index: Int;
    collectionAddress: Address;
    owner: Address;
    content: String;
}

message Transfer {
    target: Address;
}