import { useState } from 'react';
import * as EC from 'elliptic';
import { Buffer } from 'buffer';
import { Keypair } from '@solana/web3.js';
// import nacl from 'tweetnacl';

const ec = new EC.ec('secp256k1'); // Use the SECP256k1 curve (used in Bitcoin, Ethereum)

const KeyGenerator = () => {
  const [inputString, setInputString] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');
  const [keyType, setKeyType] = useState('solana');// Toggle between Solana and secp256k1 keys
 
  const generateSecp256k1Keys = () => {
    // Hash the input string to generate a deterministic private key for secp256k1
    const keyPair = ec.keyFromPrivate(Buffer.from(inputString, 'utf8').toString('hex'));

    // Extract the public and private keys
    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic('hex');

    // Set state with keys
    setPrivateKey(privateKey);
    setPublicKey(publicKey);
  };

  const generateSolanaKeys = () => {
    // Generate a new Solana keypair
    const keypair = Keypair.generate();

    // Extract and convert keys
    const publicKey = keypair.publicKey.toString(); // Solana public key as a string
    const secretKey = Buffer.from(keypair.secretKey).toString('hex'); // Convert secret key (private key) to hex format

    // Set state with keys
    setPrivateKey(secretKey);
    setPublicKey(publicKey);
  };

  const handleGenerateKeys = () => {
      if (keyType === 'solana') {
        generateSolanaKeys();
      } else if (keyType === 'secp256k1') {
        generateSecp256k1Keys();
      }
    };  
  
  return (
    <div className="key-generator-container">
      <div className="key-generator">
        <h2>Public/Private Key Generator</h2>
        <div className="radio-group">
          <label className="radio-label">
            <input
              type="radio"
              value="secp256k1"
              checked={keyType === 'secp256k1'}
              onChange={(e) => setKeyType(e.target.value)}
            />
            SECP256k1 (Bitcoin, Ethereum)
          </label>
          <label className="radio-label">
            <input
              type="radio"
              value="solana"
              checked={keyType === 'solana'}
              onChange={(e) => setKeyType(e.target.value)}
            />
            Solana
          </label>
        </div>

        <div className="input-button-container">
          <input
            type="text"
            placeholder="Enter your string"
            value={inputString}
            onChange={(e) => setInputString(e.target.value)}
            className="input-field"
          />
          <button onClick={handleGenerateKeys} className="generate-button">Generate Keys</button>
        </div>

        <div className="key-display">
          {privateKey && (
            <>
              <p className="key-label">Private Key:</p>
              <p className="key-value">{privateKey}</p>
            </>
          )}
          {publicKey && (
            <>
              <p className="key-label">Public Key:</p>
              <p className="key-value">{publicKey}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default KeyGenerator;
