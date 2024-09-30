import './App.css';
import Navbar from './components/Navbar';
import { TypeWriter } from './components/TypeWriter';
import Footer from './components/Footer';
import KeyGenerator from './components/KeyGenerator';
import GenerateMnemonics from './components/GenerateMnemonics';
import ConnectWallet from './components/ConnectWallet';
import FunctionNavbar from './components/FunctionNavbar'; 

function App() {

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1 className="main-title">
          Master and Unlock the power of <p className="highlight"><TypeWriter /></p>
        </h1>
        <div className="mt-10">
          <ConnectWallet />
        </div>
      </div>
      <div className="mt-11 function-navbar-container">
        <FunctionNavbar />
      </div> 
      <KeyGenerator />
      <GenerateMnemonics />
      <Footer />
    </div>
  );
}

export default App;
