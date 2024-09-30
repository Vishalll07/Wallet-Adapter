import { useState } from 'react'; // Import useState
import { useWalletConnection } from './ConnectWallet'; // Import the function


const FunctionNavbar = () => {
    const isConnected = useWalletConnection(); 
    const [activeButton, setActiveButton] = useState(null); 
    const [showMessage, setShowMessage] = useState(false); 

    const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); 
        if (!isConnected) {
            setShowMessage(true); 
        }
    };

    return (
        <div className="function-navbar">
            <div className="button-container">
                {['AirDrop', 'Send sol', 'Check sol', 'Sign a Message', 'Create Token'].map((buttonName) => (
                    <button
                        key={buttonName}
                        className={activeButton === buttonName ? 'active' : ''}
                        onClick={() => handleButtonClick(buttonName)} 
                    >
                        {buttonName}
                    </button>
                ))}
            </div>
            {showMessage && !isConnected && ( 
                <div className="wallet-connection-message">
                    Please Connect your Wallet first
                </div>
            )}
        </div>
    );
}

export default FunctionNavbar;