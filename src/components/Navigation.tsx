import { NavLink } from 'react-router-dom';
import { Home, Sparkles, Images, Users, Wallet } from 'lucide-react';

const navItems = [
  { to: '/', icon: Home, label: 'Главная' },
  { to: '/mint', icon: Sparkles, label: 'Mint' },
  { to: '/gallery', icon: Images, label: 'Галерея' },
  { to: '/club', icon: Users, label: 'Клуб' },
  { to: '/profile', icon: Wallet, label: 'Профиль' },
];

export default function Navigation() {
  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 glass border-t border-accent/20">
      <div className="flex justify-around items-center h-16 max-w-md mx-auto px-2">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            className={({ isActive }) =>
              `flex flex-col items-center justify-center w-14 h-14 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'text-accent bg-accent/10'
                  : 'text-gray-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={22} strokeWidth={2} />
            <span className="text-[10px] mt-1 font-medium">{label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  );
}