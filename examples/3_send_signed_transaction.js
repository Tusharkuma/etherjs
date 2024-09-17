//(Writing in blockchain) make transaction on blockchain, like in wallet address to address
const {ethers} = require('ethers');
require("dotenv").config();

const INFURA_ID = process.env.RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${INFURA_ID}`);

const senderAddress = '0x0835d237073698d5b7218C35Ebe78fA714a9C417'; //sender
const receiverAddress = '0x85F696B5de58Acf126cF819bABb4eb4b1790440D'; //receiver

const private_key = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(private_key, provider); //blockchain checks correct key for tranction from that address(account)

const main = async () => {
    
    const senderBalanceBefore = await provider.getBalance(senderAddress);
    const receiverBalanceBefore = await provider.getBalance(receiverAddress);
    
    console.log(`senderBalanceBefore: ${ethers.utils.formatEther(senderBalanceBefore)}\n`);
    console.log(`receiverBalanceBefore: ${ethers.utils.formatEther(receiverBalanceBefore)}`);
    
    const tx = await wallet.sendTransaction({
        to: receiverAddress, 
        value: ethers.utils.parseEther("0.001")
    });

    await tx.wait();
    console.log(tx);

    const senderBalanceAfter = await provider.getBalance(senderAddress);
    const receiverBalanceAfter = await provider.getBalance(receiverAddress);

    console.log(`\nsenderBalanceAfter ${ethers.utils.formatEther(senderBalanceAfter)}`)
    console.log(`receiverBalanceAfter ${ethers.utils.formatEther(receiverBalanceAfter)}`)
}

main()