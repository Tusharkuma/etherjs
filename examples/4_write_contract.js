//sending LINK token(ERC20) from 1 address to another. 
const {ethers} = require('ethers');
require("dotenv").config();

Infura_id = process.env.RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(`https://sepolia.infura.io/v3/${Infura_id}`);

const private_key = process.env.PRIVATE_KEY;
const wallet = new ethers.Wallet(private_key, provider); 


const Eth_abi = [
    "function balanceOf(address) view returns (uint256)",
    "function transfer(address to, uint amount) returns (bool)", 
];

const senders_address = '0x0835d237073698d5b7218C35Ebe78fA714a9C417'; //sender
const receiver_address = '0x85F696B5de58Acf126cF819bABb4eb4b1790440D'; //receiver
const address = '0x779877A7B0D9E8603169DdbD7836e478b4624789'; //LINK contract address

const contract = new ethers.Contract(address, Eth_abi, provider); 

const main = async () => {
    const senderBalanceBefore = await contract.balanceOf(senders_address);
    const receiverBalanceBefore = await contract.balanceOf(receiver_address);
    const senderBalance = await provider.getBalance(senders_address);

    console.log(`${ethers.utils.formatEther(senderBalanceBefore)}`);
    console.log(`${ethers.utils.formatEther(receiverBalanceBefore)}`);
    console.log(ethers.utils.formatEther(senderBalance));

    const connectWithWallet = contract.connect(wallet);

    const tx = await connectWithWallet.transfer(receiver_address , ethers.utils.parseEther("1"));
    await tx.wait();

    console.log(tx);

    const senderBalanceAfter = await contract.balanceOf(senders_address);
    const receiverBalanceAfter = await contract.balanceOf(receiver_address);

    console.log(`${ethers.utils.formatEther(senderBalanceAfter)}`);
    console.log(`${ethers.utils.formatEther(receiverBalanceAfter)}`);

    console.log(provider.getBalance(senders_address));
}

main();