import { Contract, ethers, Signer } from "ethers";
import ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
import { Ballot } from "../../typechain";
import "dotenv/config";

export async function connectToBlockchain() {
  const wallet = new ethers.Wallet(
    process.env.PRIVATE_KEY as ethers.utils.BytesLike
  );

  console.log(`Using address ${wallet.address}`);

  const provider = ethers.providers.getDefaultProvider("ropsten", {
    etherscan: process.env.ETHERSCAN_API_KEY,
  });

  const signer = await wallet.connect(provider);
  const balanceBN = await signer.getBalance();
  const balance = Number(ethers.utils.formatEther(balanceBN));

  console.log(`Wallet balance ${balance}`);

  if (balance < 0.01) {
    throw new Error("Not enough ether");
  }

  return signer;
}

export function convertStringArrayToBytes32(stringArray: string[]) {
  return stringArray.map(ethers.utils.formatBytes32String);
}

export function getArg(position: number, errorMsg: string) {
  if (process.argv.length < position + 1) throw new Error(errorMsg);
  return process.argv[position];
}

export function connectToContract(ballotAddress: string, signer: Signer) {
  console.log(
    `Attaching ballot contract interface to address ${ballotAddress}`
  );

  return new Contract(ballotAddress, ballotJson.abi, signer) as Ballot;
}
