import './App.css'
import Navbar from './components/Navbar'; // Add this import at the top of the file
import { TypeWriter } from './components/TypeWriter';
import Footer from './components/Footer';
import KeyGenerator from './components/Keygenerator';
import GenerateMnemonics from './components/GenerateMnemonics';
function App() {
  

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1 className="main-title">
          Master and Unlock the power of<p className="highlight"><TypeWriter/></p>
        </h1>
        <div className="input-container">
          <button className="create-wallet-btn">Connect Wallet</button>
        </div>
      </div>
      <KeyGenerator />
      <GenerateMnemonics />
      <Footer />
    </div>
  )
}



export default App
