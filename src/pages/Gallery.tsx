import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import NFTCard from '../components/NFTCard';
import { Images, Filter } from 'lucide-react';

const mockNFTs = [
  { id: '001', name: 'Club Member', image: 'https://picsum.photos/seed/nft1/400/400', owner: 'EQCD...1234', isOwned: false },
  { id: '002', name: 'Club Member', image: 'https://picsum.photos/seed/nft2/400/400', owner: 'EQAB...5678', isOwned: true },
  { id: '003', name: 'Club Member', image: 'https://picsum.photos/seed/nft3/400/400', owner: 'EQCD...9012', isOwned: false },
  { id: '004', name: 'Club Member', image: 'https://picsum.photos/seed/nft4/400/400', owner: 'EQEF...3456', isOwned: false },
  { id: '005', name: 'Club Member', image: 'https://picsum.photos/seed/nft5/400/400', owner: 'EQGH...7890', isOwned: true },
  { id: '006', name: 'Club Member', image: 'https://picsum.photos/seed/nft6/400/400', owner: 'EQIJ...1234', isOwned: false },
  { id: '007', name: 'Club Member', image: 'https://picsum.photos/seed/nft7/400/400', owner: 'EQKL...5678', isOwned: false },
  { id: '008', name: 'Club Member', image: 'https://picsum.photos/seed/nft8/400/400', owner: 'EQMN...9012', isOwned: true },
];

export default function Gallery() {
  const { isConnected } = useWallet();
  const [filter, setFilter] = useState<'all' | 'owned'>('all');

  const filteredNFTs = filter === 'owned' ? mockNFTs.filter(nft => nft.isOwned) : mockNFTs;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <header className="flex items-center justify-between animate-fade-in">
          <div>
            <h1 className="text-2xl font-bold text-white mb-1">Галерея</h1>
            <p className="text-gray-400 text-sm">Коллекция NFT Club</p>
          </div>
          <Images size={32} className="text-accent" />
        </header>

        {isConnected && (
          <div className="flex gap-2 animate-fade-in stagger-1">
            <button
              onClick={() => setFilter('all')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                filter === 'all'
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-gray-400 hover:text-white'
              }`}
            >
              Все ({mockNFTs.length})
            </button>
            <button
              onClick={() => setFilter('owned')}
              className={`flex-1 py-2.5 px-4 rounded-xl font-medium text-sm transition-all ${
                filter === 'owned'
                  ? 'bg-accent text-white'
                  : 'bg-secondary text-gray-400 hover:text-white'
              }`}
            >
              Мои ({mockNFTs.filter(n => n.isOwned).length})
            </button>
          </div>
        )}

        {!isConnected && (
          <div className="glass rounded-2xl p-8 text-center animate-fade-in stagger-2">
            <Filter size={40} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400">Подключи кошелёк для просмотра коллекции</p>
          </div>
        )}

        {isConnected && (
          <div className="grid grid-cols-2 gap-4 animate-fade-in stagger-2">
            {filteredNFTs.map((nft) => (
              <NFTCard key={nft.id} {...nft} />
            ))}
          </div>
        )}

        {isConnected && filteredNFTs.length === 0 && (
          <div className="text-center py-8 text-gray-400">
            <p>NFT не найдены</p>
          </div>
        )}
      </div>
    </div>
  );
}