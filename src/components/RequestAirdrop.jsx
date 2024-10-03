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
  bgcolor: 'background.paper',
  border: '2px solid #000',
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
        <Button className="airdrop-button" onClick={handleOpen}> AIR DROP </Button> {/* Added class name for styling */}
      </div>

      {/* Modal component */}
      <Modal
        open={open}
        onClose={handleClose}
        >
        <Box sx={style}>
          <h1 style={{ color: 'black' }}>Add Amount</h1>
          <h3 style={{ color: 'black'}}>Amount should less than2</h3>
          {/* Airdrop request form */}
          
          <input id="Wallet Address" type="text" placeholder="Wallet address" />
          <br></br>
          <input id="amount" type="text" placeholder="Amount in SOL" />
          <Button onClick={requestAirdrop} style={{ backgroundColor: 'green', color: 'white', padding: '10px 10px'  }}>
                Request Airdrop
        </Button>
        </Box>
      </Modal>
    </div>
  );
}
