import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useEffect, useState } from "react";

export default function ViewBalance() {

  const [balance, setBalance] = useState(0);
  const { connection } = useConnection();
  const { publicKey, sendTransaction } = useWallet();

  useEffect(() => {
    const fetchBalance = async () => {
      if (!connection || !publicKey) {
        return;
      }
      try {
        const balanceInLamports = await connection.getBalance(publicKey);
        const balanceInSOL = balanceInLamports / web3.LAMPORTS_PER_SOL;
        setBalance(balanceInSOL);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    };

    fetchBalance();
  }, [connection, publicKey]);

  return <div>
    SOL Balance: {balance}
  </div>
}
