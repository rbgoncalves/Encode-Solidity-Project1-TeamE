import "dotenv/config";

import { connectToBlockchain, connectToContract, getArg } from "./utils";

async function main() {
  const signer = await connectToBlockchain();

  const ballotAddress = getArg(2, "Ballot address missing");
  const voterAddress = getArg(3, "Voter address missing");
  const ballotContract = connectToContract(ballotAddress, signer);

  const chairpersonAddress = await ballotContract.chairperson();

  if (chairpersonAddress !== signer.address) {
    throw new Error("Caller is not the chairperson for this contract");
  }

  console.log(`Giving right to vote to ${voterAddress}`);
  const tx = await ballotContract.giveRightToVote(voterAddress);
  console.log("Awaiting confirmations");
  await tx.wait();
  console.log(`Transaction completed. Hash: ${tx.hash}`);
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
