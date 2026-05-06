import { useNavigate } from 'react-router-dom';
import { useWallet } from '../context/WalletContext';
import ConnectButton from '../components/ConnectButton';
import { Sparkles, Users, Gift, ArrowRight, Star } from 'lucide-react';

export default function Home() {
  const navigate = useNavigate();
  const { isConnected } = useWallet();

  const benefits = [
    { icon: Users, text: 'Закрытый клуб единомышленников' },
    { icon: Gift, text: 'Эксклюзивные NFT-коллекции' },
    { icon: Star, text: 'Доступ к закрытым мероприятиям' },
  ];

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-8">
        <header className="text-center space-y-4 animate-fade-in">
          <div className="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center shadow-lg shadow-accent/40 animate-pulse-glow">
            <Sparkles size={40} className="text-white" />
          </div>

          <h1 className="text-3xl font-bold neon-text">NFT Club</h1>

          <p className="text-gray-400 text-sm">
            Присоединяйся к эксклюзивному клубу владельцев NFT
          </p>
        </header>

        <div className="space-y-4">
          {!isConnected ? (
            <div className="glass rounded-2xl p-6 text-center space-y-4">
              <p className="text-gray-300">Подключи кошелёк для доступа к клубу</p>
              <div className="flex justify-center">
                <ConnectButton />
              </div>
            </div>
          ) : (
            <div className="space-y-3">
              <button
                onClick={() => navigate('/mint')}
                className="w-full py-4 bg-gradient-to-r from-accent to-pink-600 rounded-xl font-bold text-white shadow-lg shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 animate-fade-in stagger-1"
              >
                <Sparkles size={22} />
                Mint NFT
              </button>

              <button
                onClick={() => navigate('/gallery')}
                className="w-full py-4 bg-secondary/60 rounded-xl font-semibold text-white border border-white/10 hover:border-accent/30 hover:bg-secondary/80 transition-all flex items-center justify-center gap-2 animate-fade-in stagger-2"
              >
                <Gift size={22} className="text-success" />
                Моя коллекция
                <ArrowRight size={18} />
              </button>
            </div>
          )}
        </div>

        <div className="glass rounded-2xl p-6 animate-fade-in stagger-3">
          <h2 className="text-lg font-semibold text-white mb-4">Привилегии клуба</h2>
          <ul className="space-y-3">
            {benefits.map(({ icon: Icon, text }, i) => (
              <li key={i} className="flex items-center gap-3 text-gray-300">
                <Icon size={18} className="text-accent" />
                <span>{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center text-gray-500 text-xs animate-fade-in stagger-4">
          <p>Powered by TON Blockchain</p>
        </div>
      </div>
    </div>
  );
}