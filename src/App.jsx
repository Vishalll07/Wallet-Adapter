import './App.css';
import Navbar from './components/Navbar';
import { TypeWriter } from './components/TypeWriter';
import Footer from './components/Footer';
import KeyGenerator from './components/KeyGenerator';
import GenerateMnemonics from './components/GenerateMnemonics';
import ConnectWallet from './components/ConnectWallet'; 
import { WalletDisconnectButton, WalletMultiButton } from '@solana/wallet-adapter-react-ui'; 
import { useState } from 'react'; 

function App() {
  const [showWallet, setShowWallet] = useState(false); // State to toggle wallet modal
  const [showConnect, setShowConnect] = useState(false); // State to track connection

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1 className="main-title">
          Master and Unlock the power of <p className="highlight"><TypeWriter /></p>
        </h1>

        
        <div className="mt-10">
          <div style={{ display: 'flex', gap: '10px' }}>
            <div
              onClick={() => {
                console.log("connect clicked!");
                setShowWallet(true);
              }}
            >
              <WalletMultiButton />
            </div>
            <div
              onClick={() => {
                console.log("disconnect clicked!");
                setShowConnect(false); 
              }}
            >
              <WalletDisconnectButton />
            </div>
          </div>
        </div>
      </div>

     
      {showWallet && <ConnectWallet />} 

      <KeyGenerator />
      <GenerateMnemonics />
      <Footer />
    </div>
  );
}

export default App;
