//log event from contract
const {ethers} = require("ethers");

require("dotenv").config();

const INFURA_ID = process.env.RPC_URL;
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F'; //contract address
const ERC20_ABI = [
    "function balanceOf(address) view returns {uint}",
    "function name() view returns (string)",
    "function symbol() view returns (string)",
    "function totalSupply() view returns (uint256)",

    "event Transfer(address indexed from , address indexed to , uint amount)"
];

const contract = new ethers.Contract(address, ERC20_ABI , provider);

const main = async () => {
    const block = await provider.getBlockNumber();

    const transferEvents = await contract.queryFilter('Transfer', block - 10 , block);
    console.log(transferEvents);
} 

main()