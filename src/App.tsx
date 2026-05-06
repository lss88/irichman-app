import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import WebApp from '@twa-dev/sdk';
import { WalletProvider } from './context/WalletContext';
import Navigation from './components/Navigation';
import Home from './pages/Home';
import Mint from './pages/Mint';
import Gallery from './pages/Gallery';
import Club from './pages/Club';
import Profile from './pages/Profile';

function App() {
  useEffect(() => {
    WebApp.ready();
    WebApp.expand();
    document.body.style.backgroundColor = '#0f0f1a';
  }, []);

  return (
    <WalletProvider>
      <BrowserRouter>
        <div className="min-h-screen bg-dark text-white">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/mint" element={<Mint />} />
            <Route path="/gallery" element={<Gallery />} />
            <Route path="/club" element={<Club />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
          <Navigation />
        </div>
      </BrowserRouter>
    </WalletProvider>
  );
}

export default App;