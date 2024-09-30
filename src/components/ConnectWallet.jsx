import { useMemo, useContext } from 'react';
import { ConnectionProvider, WalletProvider, WalletContext } from '@solana/wallet-adapter-react';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import { UnsafeBurnerWalletAdapter } from '@solana/wallet-adapter-wallets';
import {
    WalletModalProvider,
    WalletDisconnectButton,
    WalletMultiButton
} from '@solana/wallet-adapter-react-ui';
import { clusterApiUrl } from '@solana/web3.js';

// Import Solana wallet styles
import '@solana/wallet-adapter-react-ui/styles.css';

export const ConnectWallet = () => {
    const network = WalletAdapterNetwork.Devnet;

    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    const wallets = useMemo(
        () => [new UnsafeBurnerWalletAdapter()],
        [network]
    );

    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
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
    const { connected } = useContext(WalletContext);
    return connected;
};

export default ConnectWallet;
