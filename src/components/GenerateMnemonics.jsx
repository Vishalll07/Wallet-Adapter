import { useState } from 'react';
import * as bip39 from 'bip39';

const GenerateMnemonics = () => {
  const [mnemonic, setMnemonic] = useState('');

  // Function to generate a new mnemonic phrase
  const generateMnemonic = () => {
    const newMnemonic = bip39.generateMnemonic();
    console.log(newMnemonic);  
    setMnemonic(newMnemonic);
  };

  return (
    <div className="mnemonic-generator-container">
      <h2>Mnemonic Generator</h2>
      <button onClick={generateMnemonic} className="generate-mnemonic-button">
        Generate Mnemonic
      </button>
      {mnemonic && (
        <div className="mnemonic-display-container">
          <h3>Your Mnemonic Phrase:</h3>
          <p className="mnemonic-phrase">{mnemonic}</p>
          <button onClick={() => navigator.clipboard.writeText(mnemonic)} className="copy-mnemonic-button">
            Copy 
          </button>
        </div>
      )}
    </div>
  );
};

export default GenerateMnemonics;
