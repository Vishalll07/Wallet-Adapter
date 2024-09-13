import { useState, useEffect } from 'react';

const Navbar = () => {
  const [wallets, setWallets] = useState([]);
  const [selectedWallet, setSelectedWallet] = useState(null);
  const [error, setError] = useState(null);
  const [showError, setShowError] = useState(false);

  useEffect(() => {
    // Load the previously selected wallet from localStorage (if any)
    const savedWallet = localStorage.getItem('selectedWallet');
    if (savedWallet) {
      setSelectedWallet(savedWallet);
    }
  }, []);

  // Function to connect to Ethereum wallet (MetaMask)
  const connectWallet = async () => {
    if (typeof window.ethereum !== 'undefined') {
      try {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setWallets(accounts);

        if (accounts.length === 1) {
          handleWalletSelect(accounts[0]);
        }
        setError(null);
      } catch (error) {
        setError("Failed to connect wallet. Please try again.");
        triggerErrorPopup();
        console.error("Error connecting to wallet:", error);
      }
    } else {
      setError('No Ethereum wallet detected. Please install MetaMask!');
      triggerErrorPopup();
    }
  };

  // Handle wallet selection
  const handleWalletSelect = (wallet) => {
    setSelectedWallet(wallet);
    localStorage.setItem('selectedWallet', wallet); // Save the selected wallet
  };

  // Disconnect the wallet and clear localStorage
  const disconnectWallet = () => {
    setSelectedWallet(null);
    setWallets([]);
    localStorage.removeItem('selectedWallet');
  };

  // Trigger error popup for 3 seconds
  const triggerErrorPopup = () => {
    setShowError(true);
    setTimeout(() => setShowError(false), 3000);
  };

  // Check the network (you can customize this to handle different networks)
  // const checkNetwork = async () => {
  //   if (window.ethereum) {
  //     try {
  //       const network = await window.ethereum.request({ method: 'eth_chainId' });
  //       switch (network) {
  //         case '0x1': // Ethereum Mainnet
  //           console.log("Connected to Ethereum Mainnet");
  //           break;
  //         case '0x3': // Ropsten Testnet
  //           console.log("Connected to Ropsten Testnet");
  //           break;
  //         case '0x4': // Rinkeby Testnet
  //           console.log("Connected to Rinkeby Testnet");
  //           break;
  //         case '0x5': // Goerli Testnet
  //           console.log("Connected to Goerli Testnet");
  //           break;
  //         case '0x2a': // Kovan Testnet
  //           console.log("Connected to Kovan Testnet");
  //           break;
  //         case '0x38': // Binance Smart Chain Mainnet
  //           console.log("Connected to Binance Smart Chain Mainnet");
  //           break;
  //         case '0x61': // Binance Smart Chain Testnet
  //           console.log("Connected to Binance Smart Chain Testnet");
  //           break;
  //         case '0x89': // Polygon Mainnet
  //           console.log("Connected to Polygon Mainnet");
  //           break;
  //         case '0x13881': // Polygon Mumbai Testnet
  //           console.log("Connected to Polygon Mumbai Testnet");
  //           break;
  //         case '0xa86a': // Avalanche Mainnet
  //           console.log("Connected to Avalanche Mainnet");
  //           break;
  //         case '0xa869': // Avalanche Fuji Testnet
  //           console.log("Connected to Avalanche Fuji Testnet");
  //           break;
  //         default:
  //           console.log("Unknown network:", network);
  //           break;
  //       }
  //     } catch (error) {
  //       console.error("Error checking network:", error);
  //     }
  //   } else {
  //     console.error("Ethereum provider not found");
  //   }
  // };
  

  return (
    <>
      <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '1rem' }}>
        {/* Left side: CoinLatch logo */}
        <div>
          <h1>CoinLatch</h1>
        </div>

        {/* Right side: GitHub, Twitter, and Connect Wallet buttons */}
        <div>
          <a href="https://github.com" target="_blank" rel="noopener noreferrer">GitHub</a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" style={{ margin: '0 10px' }}>Twitter</a>
          {selectedWallet ? (
            <button onClick={disconnectWallet}>
              Disconnect: {selectedWallet.slice(0, 6)}...{selectedWallet.slice(-4)}
            </button>
          ) : (
            <button onClick={connectWallet}>Connect Wallet</button>
          )}
        </div>
        
        {/* If multiple wallets detected, display selection options */}
        {wallets.length > 1 && !selectedWallet && (
          <div style={{ position: 'absolute', top: '100%', right: 0, background: 'white', padding: '1rem', borderRadius: '5px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
            <h3>Select a Wallet:</h3>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              {wallets.map((wallet, index) => (
                <li key={index} onClick={() => handleWalletSelect(wallet)} style={{ cursor: 'pointer', padding: '0.5rem', borderRadius: '3px', margin: '0.5rem 0', backgroundColor: '#f7f7f7', hover: { backgroundColor: '#f0f0f0' } }}>
                  {wallet.slice(0, 6)}...{wallet.slice(-4)}
                </li>
              ))}
            </ul>
          </div>
        )}
      </nav>

      {/* Error message popup */}
      {showError && error && (
        <div style={{
          position: 'fixed',
          bottom: '20px',
          right: '20px',
          backgroundColor: 'rgba(255, 0, 0, 0.8)',
          color: 'white',
          padding: '10px',
          borderRadius: '5px',
          zIndex: 1000
        }}>
          {error}
        </div>
      )}
    </>
  );
};

export default Navbar;
