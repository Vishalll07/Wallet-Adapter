import { useState } from 'react';
import { Toaster, toast } from 'sonner'; 
import { useWallet } from '@solana/wallet-adapter-react';

const FunctionNavbar = () => {
    const isConnected = useWallet(); 
    const [activeButton, setActiveButton] = useState(null); 
     // State to control airdrop modal

     const handleButtonClick = (buttonName) => {
        setActiveButton(buttonName); 

        if (!isConnected) {
            toast.error('Wallet has not been connected'); 
        } else if(isConnected) {
            toast.success('Airdrop Successful');
            console.log(`${buttonName} clicked`);
        }else{
            toast.error('Something went wrong');
        }
    };

  

    return (
        <div className="function-navbar">
            <Toaster position="top-right" richColors /> 
            
            <div className="button-container">
                {['Send sol', 'Check sol', 'Sign a Message', 'Create Token'].map((buttonName) => (
                    <button
                        key={buttonName}
                        className={activeButton === buttonName ? 'active' : ''}
                        onClick={() => handleButtonClick(buttonName)} 
                    >
                        {buttonName}
                    </button>
                ))}
            </div>

           
        </div>
    );
}

export default FunctionNavbar;
