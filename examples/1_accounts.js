//connect to blockchain node, read from it.
const { ethers } = require("ethers");
const INFURA_ID = '202823d225134af28f8bbeba71943fa8';
const provider = new ethers.providers.JsonRpcProvider(`https://mainnet.infura.io/v3/${INFURA_ID}`);

const address = '0x89f9798a8d8BAc15a47031779cC6aa08D8059c52';
const main = async () => {
    const balance = await provider.getBalance(address);
    console.log(`/nETH balance of ${address} is ${ethers.utils.formatEther(balance)} ETH\n`);
}

main()
