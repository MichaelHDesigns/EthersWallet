// src/App.js
import React, { useState } from 'react';
import { Web3Provider } from '@ethersproject/providers';
import { formatEther } from '@ethersproject/units';

function App() {
  const [address, setAddress] = useState(null);
  const [balance, setBalance] = useState(null);
  const [error, setError] = useState(null);

  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new Web3Provider(window.ethereum);
        await provider.send("eth_requestAccounts", []);
        const signer = provider.getSigner();
        const userAddress = await signer.getAddress();
        setAddress(userAddress);

        const userBalance = await signer.getBalance();
        setBalance(formatEther(userBalance));
      } catch (err) {
        setError(err.message);
      }
    } else {
      setError("Please install MetaMask!");
    }
  };

  const disconnectWallet = () => {
    setAddress(null);
    setBalance(null);
    setError(null);
  };

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>Ethereum Wallet Connector</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {address ? (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance} ETH</p>
          <button onClick={disconnectWallet}>Disconnect Wallet</button>
        </div>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
}

export default App;