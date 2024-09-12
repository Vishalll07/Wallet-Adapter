
import './App.css'
import Navbar from './components/Navbar'; // Add this import at the top of the file

function App() {
  

  return (
    <div>
      <Navbar />
      <div className="home-content">
        <h1 className="main-title">
          Master blockchain transactions, unlock the power of <span className="highlight">wallets</span>.
        </h1>
        <div className="input-container">
          <button className="create-wallet-btn">Connect Wallet</button>
        </div>
      </div>
    </div>
  )
}

export default App
