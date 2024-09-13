import  { useState } from 'react';
import * as EC from 'elliptic';
import { Buffer } from 'buffer';

const ec = new EC.ec('secp256k1'); // Use the SECP256k1 curve (used in Bitcoin, Ethereum)

const KeyGenerator = () => {
  const [inputString, setInputString] = useState('');
  const [privateKey, setPrivateKey] = useState('');
  const [publicKey, setPublicKey] = useState('');

  const generateKeys = () => {
    // Hash the input string to generate deterministic private key
    const keyPair = ec.keyFromPrivate(Buffer.from(inputString, 'utf8').toString('hex'));

    // Extract the public and private keys
    const privateKey = keyPair.getPrivate('hex');
    const publicKey = keyPair.getPublic('hex');

    // Set state with keys
    setPrivateKey(privateKey);
    setPublicKey(publicKey);
  };

  return (
    <div>
      <h2>Public/Private Key Generator</h2>
      <input
        type="text"
        placeholder="Enter your string"
        value={inputString}
        onChange={(e) => setInputString(e.target.value)}
      />
      <button onClick={generateKeys}>Generate Keys</button>

      {privateKey && publicKey && (
        <div>
          <p><strong>Private Key:</strong> {privateKey}</p>
          <p><strong>Public Key:</strong> {publicKey}</p>
        </div>
      )}
    </div>
  );
};

export default KeyGenerator;
