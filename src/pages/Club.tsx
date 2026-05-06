import { useWallet } from '../context/WalletContext';
import { Users, MessageCircle, Gift, Calendar, Crown, Lock, CheckCircle } from 'lucide-react';

const privileges = [
  { icon: MessageCircle, title: 'Закрытый чат', description: 'Доступ к приватному Telegram-чату', locked: true },
  { icon: Gift, title: 'Эксклюзивные airdrops', description: 'Получайте редкие NFT и токены', locked: true },
  { icon: Calendar, title: 'VIP-мероприятия', description: 'Участие в закрытых ивентах', locked: true },
  { icon: Crown, title: 'Ранний доступ', description: 'Первым получайте новые коллекции', locked: true },
];

const unlockedPrivileges = [
  { icon: CheckCircle, title: 'Подтверждённое членство', description: 'Ваш статус в клубе подтверждён', isUnlocked: true },
];

export default function Club() {
  const { isConnected } = useWallet();
  const isMember = true;

  return (
    <div className="min-h-screen pb-24 px-4 pt-6">
      <div className="max-w-md mx-auto space-y-6">
        <header className="text-center animate-fade-in">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-gradient-to-br from-accent to-pink-600 flex items-center justify-center mb-4">
            <Users size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white mb-2">Клуб</h1>
          <p className="text-gray-400 text-sm">Привилегии для владельцев NFT</p>
        </header>

        {isMember && (
          <div className="glass rounded-2xl p-4 border-success/30 bg-success/10 animate-fade-in stagger-1">
            <div className="flex items-center gap-3">
              <Crown size={24} className="text-success" />
              <div>
                <p className="text-white font-semibold">Премиум участник</p>
                <p className="text-gray-400 text-sm">Владелец NFT Club</p>
              </div>
            </div>
          </div>
        )}

        <div className="space-y-3 animate-fade-in stagger-2">
          {isMember ? (
            unlockedPrivileges.map((item, i) => (
              <div
                key={i}
                className="flex items-start gap-4 p-4 bg-secondary/50 rounded-xl border border-success/20"
              >
                <div className="w-10 h-10 rounded-xl bg-success/20 flex items-center justify-center flex-shrink-0">
                  <item.icon size={20} className="text-success" />
                </div>
                <div>
                  <h3 className="text-white font-semibold">{item.title}</h3>
                  <p className="text-gray-400 text-sm">{item.description}</p>
                </div>
              </div>
            ))
          ) : null}

          {privileges.map((item, i) => (
            <div
              key={i}
              className={`flex items-start gap-4 p-4 rounded-xl transition-all ${
                isMember
                  ? 'bg-secondary/50 border border-success/20'
                  : 'bg-secondary/30 border border-white/5 opacity-60'
              }`}
            >
              <div
                className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${
                  isMember ? 'bg-success/20' : 'bg-gray-700'
                }`}
              >
                {isMember ? (
                  <CheckCircle size={20} className="text-success" />
                ) : (
                  <Lock size={20} className="text-gray-500" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold flex items-center gap-2">
                  {item.title}
                  {isMember && <CheckCircle size={16} className="text-success" />}
                </h3>
                <p className="text-gray-400 text-sm">{item.description}</p>
                {!isMember && (
                  <a
                    href="#"
                    className="inline-block mt-2 text-accent text-sm hover:underline"
                  >
                    Mint NFT для доступа →
                  </a>
                )}
              </div>
            </div>
          ))}
        </div>

        {isMember && (
          <a
            href="https://t.me/clubchat"
            target="_blank"
            rel="noopener noreferrer"
            className="block w-full py-4 bg-gradient-to-r from-accent to-pink-600 rounded-xl font-bold text-white text-center shadow-lg shadow-accent/30 hover:scale-[1.02] active:scale-[0.98] transition-all animate-fade-in stagger-3"
          >
            <MessageCircle size={20} className="inline mr-2" />
            Войти в закрытый чат
          </a>
        )}

        {!isMember && isConnected && (
          <div className="glass rounded-2xl p-6 text-center animate-fade-in stagger-3">
            <Lock size={40} className="text-gray-500 mx-auto mb-4" />
            <p className="text-gray-300 mb-4">Стань владельцем NFT Club</p>
            <a
              href="/mint"
              className="inline-block px-6 py-3 bg-accent rounded-xl font-semibold text-white hover:bg-accent/90 transition-colors"
            >
              Mint NFT
            </a>
          </div>
        )}

        {!isConnected && (
          <div className="glass rounded-2xl p-6 text-center animate-fade-in stagger-3">
            <p className="text-gray-400">Подключи кошелёк для доступа к клубу</p>
          </div>
        )}
      </div>
    </div>
  );
}