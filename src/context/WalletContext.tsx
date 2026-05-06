import { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useTonWallet, useTonConnectUI } from '@tonconnect/ui-react';

interface WalletState {
  address: string | null;
  balance: string;
  isConnected: boolean;
  isConnecting: boolean;
}

interface WalletContextType extends WalletState {
  connect: () => void;
  disconnect: () => void;
  refreshBalance: () => Promise<void>;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

export function WalletProvider({ children }: { children: ReactNode }) {
  const wallet = useTonWallet();
  const [tonConnectUI] = useTonConnectUI();
  const [balance, setBalance] = useState('0');
  const [, setIsConnecting] = useState(false);

  const [state, setState] = useState<WalletState>({
    address: null,
    balance: '0',
    isConnected: false,
    isConnecting: false,
  });

  useEffect(() => {
    if (wallet?.account?.address) {
      setState({
        address: wallet.account.address,
        balance: balance,
        isConnected: true,
        isConnecting: false,
      });
      refreshBalance();
    } else if (!wallet) {
      setState({
        address: null,
        balance: '0',
        isConnected: false,
        isConnecting: false,
      });
    }
  }, [wallet]);

  const refreshBalance = async () => {
    if (!wallet?.account?.address) return;
    try {
      const response = await fetch(
        `https://toncenter.com/api/v2/getAddressBalance?address=${wallet.account.address}`
      );
      const data = await response.json();
      if (data.result) {
        const nanoTon = BigInt(data.result);
        const ton = (Number(nanoTon) / 1e9).toFixed(2);
        setBalance(ton);
        setState(prev => ({ ...prev, balance: ton }));
      }
    } catch (error) {
      console.error('Error fetching balance:', error);
    }
  };

  const connect = () => {
    if (tonConnectUI) {
      setIsConnecting(true);
      setState(prev => ({ ...prev, isConnecting: true }));
      tonConnectUI.connectWallet().catch(() => {}).finally(() => {
        setIsConnecting(false);
        setState(prev => ({ ...prev, isConnecting: false }));
      });
    }
  };

  const disconnect = () => {
    if (tonConnectUI) {
      tonConnectUI.disconnect();
      setState({
        address: null,
        balance: '0',
        isConnected: false,
        isConnecting: false,
      });
    }
  };

  return (
    <WalletContext.Provider
      value={{
        ...state,
        connect,
        disconnect,
        refreshBalance,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (!context) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}