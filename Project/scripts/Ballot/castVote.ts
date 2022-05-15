import "dotenv/config";
import { ethers } from "ethers";
import { connectToBlockchain, connectToContract, getArg } from "./utils";

async function main() {
  const signer = await connectToBlockchain();

  const ballotAddress = getArg(2, "Ballot address missing");
  const proposalIndex = getArg(3, "Proposal index missing");
  const ballotContract = connectToContract(ballotAddress, signer);

  const [proposal, voter] = await Promise.all([
    ballotContract.proposals(proposalIndex),
    ballotContract.voters(signer.address),
  ]);

  if (voter.voted) {
    throw new Error("Caller already voted");
  }

  console.log(`Voting in "${ethers.utils.parseBytes32String(proposal.name)}"`);

  const tx = await ballotContract.vote(proposalIndex);
  console.log("Awaiting confirmation");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
