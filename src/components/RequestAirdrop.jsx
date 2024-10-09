import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import { useWallet } from "@solana/wallet-adapter-react";
import { useConnection } from "@solana/wallet-adapter-react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";
import { toast } from 'sonner';
// Style for the modal
const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: '#C8ACD6', 
  border: '1px solid #17153B', 
  borderRadius: '20px',
  boxShadow: 24,
  p: 4,
};

export default function AirdropModal() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  // Solana wallet and connection hooks
  const wallet = useWallet();
  const { connection } = useConnection();

  // Function to request an airdrop
  async function requestAirdrop() {
    let amount = document.getElementById("amount").value;
    await connection.requestAirdrop(wallet.publicKey, amount * LAMPORTS_PER_SOL);
    toast.success("Airdropped " + amount + " SOL to " + wallet.publicKey.toBase58());
    
  }

  return (
    <div>
      {/* Button to open the modal */}
      <div className="airdrop-button-container"> {/* Added class name for styling */}
        <Button 
          className="airdrop-button" 
          onClick={handleOpen}
          style={{
            backgroundColor: '#624E88', 
            color: 'white', 
            padding: '10px 20px', 
            borderRadius: '8px'
          }}
        > 
          AIR DROP 
        </Button>
      </div>

      {/* Modal component */}
      <Modal
        open={open}
        onClose={handleClose}
      >
        <Box sx={style}>
          <h2 style={{ color: '#17153B', textAlign: 'center' }}>Request AIRDROP</h2>
          <p style={{ color: '#17153B', textAlign: 'center' }}>This tool does <strong>NOT</strong> give real $SOL or Solana tokens.</p>
          {/* Airdrop request form */}
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#17153B', marginBottom: '8px' }}>Wallet Address</label>
            <input 
              id="wallet-address" 
              type="text" 
              placeholder="Enter wallet address" 
              style={{
                width: '95%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #17153B'
              }} 
            />
          </div>
          <div style={{ marginBottom: '16px' }}>
            <label style={{ display: 'block', color: '#17153B', marginBottom: '8px' }}>SOL Amount</label>
            <select 
              id="amount" 
              style={{
                width: '100%',
                padding: '8px',
                borderRadius: '8px',
                border: '1px solid #17153B'
              }}
            >
              <option value="0.1">0.1 SOL</option>
              <option value="0.5">0.5 SOL</option>
              <option value="1">1 SOL</option>
              <option value="1.5">1.5 SOL</option>
              <option value="2">2 SOL</option>
              <option value="2.5">2.5 SOL</option>
              <option value="3">3 SOL</option>
              <option value="3.5">3.5 SOL</option>
            </select>
          </div>
          <Button 
            onClick={requestAirdrop} 
            style={{ 
              backgroundColor: '#17153B', 
              color: 'white', 
              width: '100%', 
              padding: '10px', 
              borderRadius: '8px'
            }}
          >
            Request Airdrop
          </Button>
        </Box>
      </Modal>
    </div>
  );
}
