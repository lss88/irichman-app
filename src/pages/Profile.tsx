import { useWallet } from '../context/WalletContext';
import ConnectButton from '../components/ConnectButton';
import { Wallet, Copy, CheckCircle, ExternalLink, TrendingUp } from 'lucide-react';

export default function Profile() {
  const { isConnected, address, balance } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 8)}...${addr.slice(-8)}`;
  };

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center mb-4 shadow-lg shadow-accent/30">
            <Wallet size={40} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Профиль</h1>
          <p className="text-gray-400 text-sm">Управление кошельком</p>
        </header>

        {!isConnected ? (
          <div className="glass rounded-2xl p-8 text-center space-y-6 animate-fade-in stagger-1">
            <p className="text-gray-300">Подключи кошелёк для просмотра профиля</p>
            <div className="flex justify-center">
              <ConnectButton />
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in stagger-1">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Адрес кошелька</span>
                <button className="text-accent hover:text-accent/80 transition-colors">
                  <Copy size={18} />
                </button>
              </div>
              <div className="p-3 bg-secondary/50 rounded-xl">
                <code className="text-white font-mono text-sm">{formatAddress(address || '')}</code>
              </div>
              <a
                href={`https://tonscan.io/address/${address}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-success text-sm hover:underline"
              >
                Открыть в TonScan
                <ExternalLink size={14} />
              </a>
            </div>

            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in stagger-2">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">Баланс</span>
                <TrendingUp size={20} className="text-success" />
              </div>
              <div className="text-4xl font-bold text-white">
                {balance} <span className="text-lg text-gray-400">TON</span>
              </div>
            </div>

            <div className="glass rounded-2xl p-6 space-y-4 animate-fade-in stagger-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-400">NFT Club</span>
                <CheckCircle size={20} className="text-success" />
              </div>
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent/30 to-pink-600/30 flex items-center justify-center">
                  <span className="text-2xl">🐱</span>
                </div>
                <div>
                  <p className="text-white font-semibold">3 NFT</p>
                  <p className="text-gray-400 text-sm">В коллекции</p>
                </div>
              </div>
            </div>

            <div className="pt-4 animate-fade-in stagger-4">
              <ConnectButton className="w-full justify-center" />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}