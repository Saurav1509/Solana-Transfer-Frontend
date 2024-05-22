import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import * as web3 from "@solana/web3.js";
import { useState } from "react";

export default function TransferSOL() {

    const [sol, setSol] = useState(0);
    const [receiver, setReceiver] = useState("");
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
    const transaction = new web3.Transaction();

    const onClick = async () => {

        const lamportsToSend = sol * web3.LAMPORTS_PER_SOL;

        const toPubkey = new web3.PublicKey(receiver);

        console.log(`lamports to send: ${lamportsToSend}`);

        console.log(`receiver: ${receiver}`)

        const sendSOLInstruction = web3.SystemProgram.transfer({
            fromPubkey: publicKey,
            toPubkey,
            lamports: lamportsToSend
        })

        transaction.add(sendSOLInstruction);

        const signature = await sendTransaction(transaction, connection)
        console.log(`Transaction Signature: ${signature}`)
    }

    return <div>
        Amount in SOL to send:
        <input type="" onChange={(e) => {
            setSol(Number(e.target.value))
        }} />

        Receiver Address to send to:
        <input type="string" onChange={(e) => {
            setReceiver(e.target.value)
        }} />

        <button onClick={onClick}>Send</button>
    </div>
}