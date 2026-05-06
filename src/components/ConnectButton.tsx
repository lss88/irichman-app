import { useWallet } from '../context/WalletContext';
import { Wallet, Loader2 } from 'lucide-react';

export default function ConnectButton({ className = '' }: { className?: string }) {
  const { connect, disconnect, isConnected, isConnecting, address } = useWallet();

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 4)}...${addr.slice(-4)}`;
  };

  if (isConnecting) {
    return (
      <button
        disabled
        className={`flex items-center justify-center gap-2 px-6 py-3 bg-secondary rounded-xl text-gray-400 cursor-not-allowed ${className}`}
      >
        <Loader2 size={20} className="animate-spin" />
        <span>Подключение...</span>
      </button>
    );
  }

  if (isConnected) {
    return (
      <button
        onClick={disconnect}
        className={`flex items-center gap-2 px-4 py-2 bg-accent/20 hover:bg-accent/30 rounded-xl text-white border border-accent/30 transition-all ${className}`}
      >
        <Wallet size={18} className="text-accent" />
        <span className="font-mono text-sm">{formatAddress(address || '')}</span>
      </button>
    );
  }

  return (
    <button
      onClick={connect}
      className={`flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-pink-600 hover:from-accent/90 hover:to-pink-600/90 rounded-xl text-white font-semibold shadow-lg shadow-accent/30 transition-all hover:scale-105 active:scale-95 ${className}`}
    >
      <Wallet size={20} />
      <span>Подключить кошелёк</span>
    </button>
  );
}