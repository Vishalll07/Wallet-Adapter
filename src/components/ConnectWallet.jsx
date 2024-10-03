import { useWallet } from '@solana/wallet-adapter-react';
import { ConnectionProvider, WalletProvider } from '@solana/wallet-adapter-react';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import '@solana/wallet-adapter-react-ui/styles.css';

export const ConnectWallet = () => {
    return (
        <ConnectionProvider endpoint={"https://solana-devnet.g.alchemy.com/v2/Rqk6eHurjXGevgzm-F37dGX-ktmJoo0B"}>
            <WalletProvider wallets={[]} autoConnect>
                <WalletModalProvider>
                    <div style={{ display: 'flex', gap: '35px' }}>
                        <WalletMultiButton className="wallet-adapter-button-trigger" />
                        <WalletDisconnectButton />
                    </div>
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};

// Function to check if the wallet is connected

export const useWalletConnection = () => {
    const { connected } = useWallet();
    return connected;
};

export default ConnectWallet;
