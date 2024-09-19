import { useState, useEffect } from 'react';
import * as bip39 from 'bip39';
import { Buffer } from 'buffer';
const GenerateMnemonics = () => {
  const [mnemonic, setMnemonic] = useState('');

  useEffect(() => {
    // Add Buffer polyfill buffer is used to parse binary data manupulation data into a string
    if (typeof window !== 'undefined' && !window.Buffer) {
      if (typeof require !== 'undefined') {
        window.Buffer = Buffer;
      }
    }
  }, []);

  // Function to generate a new mnemonic phrase
  const generateMnemonic = () => {
    try {
      const newMnemonic = bip39.generateMnemonic();
      console.log(newMnemonic);  
      setMnemonic(newMnemonic);
    } catch (error) {
      console.error('Error generating mnemonic:', error);
    }
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
