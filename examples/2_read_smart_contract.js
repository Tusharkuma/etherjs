//connect to blockchain, connect to an address(smart_contract here) and read from it.
const {ethers} = require("ethers");

const INFURA_ID = '202823d225134af28f8bbeba71943fa8';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               //mainnet.infura.io/v3/202823d225134af28f8bbeba71943fa8');

const Eth_abi = [
    "function name() view returns(string)",
    "function symbol() view returns(string)",
    "function totalSupply() view returns(uint256)",
    "function balanceOf(address) view returns(uint)" 
];

const address = '0x6B175474E89094C44Da98b954EedeAC495271d0F';

const contract = new ethers.Contract( address , Eth_abi , provider);

const main = async () => {
    const name = await contract.name();
    const totalsupply = await contract.totalSupply();
    const balance = await contract.balanceOf(address);

    console.log(`reading from: ${address}`)
    console.log(`name: ${name}`);
    console.log(`totalsupply: ${totalsupply}`);
    console.log(`raw balance of ${address}: ${balance}`);
    console.log(`formatted balance ${ethers.utils.formatEther(balance)}`);
}

main();