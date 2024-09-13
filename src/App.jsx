import './App.css'
import Navbar from './components/Navbar'; // Add this import at the top of the file
import { TypeWriter } from './components/TypeWriter';
import Footer from './components/Footer';
function App() {
  

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1 className="main-title">
          Master and unlock the power of <span className="highlight"><TypeWriter/></span>
        </h1>
        <div className="input-container">
          <button className="create-wallet-btn">Connect Wallet</button>
        </div>
      </div>
      <Footer />
    </div>
  )
}



export default App
