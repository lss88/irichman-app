import { useState } from 'react';
import { useWallet } from '../context/WalletContext';
import { Minus, Plus, Zap, Loader2 } from 'lucide-react';

const MINT_PRICE = 1;
const MAX_PER_WALLET = 10;

export default function Mint() {
  const { isConnected, balance } = useWallet();
  const [quantity, setQuantity] = useState(1);
  const [isMinting, setIsMinting] = useState(false);
  const [txHash, setTxHash] = useState<string | null>(null);

  const totalPrice = quantity * MINT_PRICE;
  const canMint = isConnected && Number(balance) >= totalPrice;

  const handleMint = async () => {
    if (!canMint || isMinting) return;

    setIsMinting(true);
    setTxHash(null);

    setTimeout(() => {
      setIsMinting(false);
      setTxHash('example-tx-hash-' + Date.now());
    }, 3000);
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center animate-fade-in">
          <h1 className="text-2xl font-bold text-white mb-2">Mint NFT</h1>
          <p className="text-gray-400 text-sm">Создай уникальный NFT в коллекции клуба</p>
        </header>

        <div className="glass rounded-2xl p-6 space-y-6 animate-fade-in stagger-1">
          <div className="text-center space-y-2">
            <div className="w-40 h-40 mx-auto rounded-2xl bg-gradient-to-br from-accent/30 to-pink-600/30 flex items-center justify-center border border-accent/30">
              <Zap size={60} className="text-accent" />
            </div>
            <h2 className="text-xl font-bold text-white">NFT Club #001</h2>
            <p className="text-gray-400 text-sm">Эксклюзивный член клуба</p>
          </div>

          <div className="space-y-3">
            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <span className="text-gray-300">Количество</span>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  disabled={quantity <= 1}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-white">{quantity}</span>
                <button
                  onClick={() => setQuantity(Math.min(MAX_PER_WALLET, quantity + 1))}
                  disabled={quantity >= MAX_PER_WALLET}
                  className="w-8 h-8 rounded-lg bg-secondary flex items-center justify-center text-white hover:bg-accent/20 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>

            <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
              <span className="text-gray-300">Цена за NFT</span>
              <span className="font-mono text-white">{MINT_PRICE} TON</span>
            </div>

            <div className="flex items-center justify-between p-4 bg-accent/10 rounded-xl border border-accent/30">
              <span className="text-white font-semibold">Итого</span>
              <span className="font-mono text-xl font-bold text-accent">{totalPrice} TON</span>
            </div>
          </div>

          {!isConnected ? (
            <div className="text-center text-gray-400 py-4">
              Подключи кошелёк для минта
            </div>
          ) : Number(balance) < totalPrice ? (
            <div className="text-center text-red-400 py-4">
              Недостаточно средств. Баланс: {balance} TON
            </div>
          ) : (
            <button
              onClick={handleMint}
              disabled={isMinting}
              className="w-full py-4 bg-gradient-to-r from-accent to-pink-600 rounded-xl font-bold text-white shadow-lg shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {isMinting ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  Минтим...
                </>
              ) : (
                <>
                  <Zap size={20} />
                  Mint {quantity} NFT
                </>
              )}
            </button>
          )}

          {txHash && (
            <div className="p-4 bg-success/10 rounded-xl border border-success/30 animate-fade-in">
              <p className="text-success text-sm text-center font-medium">
                ✓ Mint успешен! Транзакция: {txHash.slice(0, 20)}...
              </p>
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-4 animate-fade-in stagger-2">
          <p className="text-gray-400 text-xs text-center">
            Лимит: {MAX_PER_WALLET} NFT на кошелёк<br />
            Комиссия сети: ~0.01 TON
          </p>
        </div>
      </div>
    </div>
  );
}