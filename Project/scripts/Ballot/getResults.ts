// query the results
import { ethers } from "ethers";
import "dotenv/config";
import { connectToBlockchain, connectToContract, getArg } from "./utils";

async function main() {
  const signer = await connectToBlockchain();

  const ballotAddress = getArg(2, "Ballot address missing");
  const ballotContract = connectToContract(ballotAddress, signer);

  const winner = await ballotContract.winnerName();
  const winnerString = ethers.utils.parseBytes32String(winner);
  console.log(`The winner is proposal ${winnerString}`);
}
main().catch((error) => {
  console.error(error);
  process.exit(1);
});
