import { useState, useEffect } from 'react';
import * as React from 'react';
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import { Toaster, toast } from 'sonner'; 
import { LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction } from "@solana/web3.js";
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';

const style_sendsol = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FABC3F', 
    border: '1px solid #17153B', 
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };
  const style_checksol = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: '#FABC3F', 
    border: '1px solid #17153B', 
    borderRadius: '20px',
    boxShadow: 24,
    p: 4,
  };

const FunctionNavbar = () => {
    // MODAL LOGIC for Send sol
    const [openSendModal, setOpenSendModal] = React.useState(false);
    const handleOpen = () => setOpenSendModal(true);
    const handleClose = () => setOpenSendModal(false);
    // MODAL LOGIC for Check Sol 
    const[openCheckModal, setOpenCheckModal] = React.useState(false);
    const handleOpenCheck = () => setOpenCheckModal(true);
    const handleCloseCheck = () => setOpenCheckModal(false);



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

    // SEND SOL LOGIC 
    const wallet = useWallet();
    const { connection } = useConnection();
  
    // State variables
    const [walletConnect, setWalletConnect] = useState(false);
    const [amount, setAmount] = useState('');
    const [to, setTo] = useState('');

    // Check wallet connection status
    useEffect(() => {
        if (wallet.publicKey != null) {
        setWalletConnect(true);
        } else {
        setWalletConnect(false);
        }
    }, [wallet.publicKey]);

  // Function to send a transaction
  const sendTransaction = async () => {
    if (wallet.publicKey != null) {
      if (amount === '' || to === '') {
        toast.warning("Please enter all Fields first.");
        return;
      }

      const idd = toast.loading('Initiating transaction...');
      try {
        const transaction = new Transaction();
        transaction.add(SystemProgram.transfer({
          fromPubkey: wallet.publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        }));
  
        await wallet.sendTransaction(transaction, connection);
        toast.dismiss(idd);
        toast.success('Transaction complete!');
        setAmount('');
        setTo('');
      } catch (error) {
        toast.dismiss(idd);
        toast.error('Something went wrong :/');
      }
    } else {
      toast.warning("Please Connect your Wallet first.");
    }
  };

  // Function to check sol balance 

  const [balance, setBalance] = useState(0); // Initial balance set to 0
  const [send, setSend] = useState(false); // Using useState to manage send state


    useEffect(() => {
        if (send) {
            console.log("calling.......");
            checkBalance();
        }
    }, [send]);

    useEffect(() => {
        if (wallet.publicKey != null) {
            setWalletConnect(true);
        } else {
            setWalletConnect(false);
        }
    }, [wallet.publicKey]);

  const checkBalance = async () => {
    if (wallet.publicKey != null) {
        try {
            const bal = await connection.getBalance(wallet.publicKey);
            setBalance(bal / LAMPORTS_PER_SOL);
            toast.success('Sol Balance loaded!');
        } catch (error) {
            toast.error('Error fetching balance');
        }
    } else {
        toast.warning("Please connect your wallet first.");
    }
};

  

  return (
    <div className="function-navbar">
        <Toaster position="top-right" richColors />

        <div className="button-container">
            <Button
                className={activeButton === 'Send sol' ? 'active' : ''}
                onClick={handleOpen}
            >Send SOL
            </Button>
             {/* Modal component */}
            <Modal
                open={openSendModal}
                onClose={handleClose}
            >
                <Box sx={style_sendsol}>
                    <h2 style={{ color: '#17153B', textAlign: 'center' }}>SEND SOLANA</h2>
                    <p style={{ color: '#17153B', textAlign: 'center' }}>For now, only <strong>SOLANA</strong> is available for Transaction</p>
                    {/* Airdrop request form */}
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#17153B', marginBottom: '8px' }}>Recipeint Wallet Address</label>
                        <input 
                        id="recipient-wallet-address" 
                        type="text" 
                        placeholder="Recipient wallet address" 
                        style={{
                            width: '95%',
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid #17153B'
                        }} 
                        value={to}
                        onChange={(e) => setTo(e.target.value)}
                        />
                    </div>
                    <div style={{ marginBottom: '16px' }}>
                        <label style={{ display: 'block', color: '#17153B', marginBottom: '8px' }}>SOL Amount</label>
                        <input 
                        id="solana-amount" 
                        type="text" 
                        placeholder="Enter Solana Amount" 
                        style={{
                            width: '95%',
                            padding: '8px',
                            borderRadius: '8px',
                            border: '1px solid #17153B'
                        }}
                        value={amount}
                        onChange={(e)=>setAmount(e.target.value)} 
                        />
                    </div>
                    <Button 
                        onClick={sendTransaction} 
                        style={{ 
                        backgroundColor: '#982B1C', 
                        color: 'white', 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '8px'
                        }}
                    >
                        Send Solana 
                    </Button>
                </Box>
      </Modal>



            <Button
                className={activeButton === 'Check sol' ? 'active' : ''}
                onClick={handleOpenCheck}
            >Check sol
            </Button>
             {/* Modal component */}
             <Modal
                open={openCheckModal}
                onClose={handleCloseCheck}
            >
                <Box sx={style_checksol}>
                    <h2 style={{ color: '#17153B', textAlign: 'center' }}>CHECK YOUR SOLANA BALANCE</h2>
                    <p style={{ color: '#17153B', textAlign: 'center' }}>For now, only <strong>SOLANA </strong>bal. can be checked </p>
                    {/* Airdrop request form */}
                    <Button 
                        onClick={checkBalance} 
                        style={{ 
                        backgroundColor: '#982B1C', 
                        color: 'white', 
                        width: '100%', 
                        padding: '10px', 
                        borderRadius: '8px'
                        }}
                    >
                        check SOLANA BALANCE
                    </Button>
                </Box>
      </Modal>








            <Button
                className={activeButton === 'Sign a Message' ? 'active' : ''}
                onClick={() => handleButtonClick('Sign a Message')}
            >
                Sign a Message
            </Button>
            <Button
                className={activeButton === 'Create Token' ? 'active' : ''}
                onClick={() => handleButtonClick('Create Token')}
            >
                Create Token
            </Button>
        </div>
    </div>
);

}

export default FunctionNavbar;
