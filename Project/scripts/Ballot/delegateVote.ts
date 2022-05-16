import "dotenv/config";
import { connectToBlockchain, connectToContract, getArg } from "./utils";

async function main() {
  const signer = await connectToBlockchain();

  const ballotAddress = getArg(2, "Ballot address missing");
  const userAddress = getArg(3, "Target user address missing");
  const ballotContract = connectToContract(ballotAddress, signer);

  const voter = await ballotContract.voters(signer.address);

  if (voter.voted) {
    throw new Error("Caller already voted");
  }

  console.log(`Delegating vote to ${userAddress}`);

  const tx = await ballotContract.delegate(userAddress);
  console.log("Awaiting confirmation");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
