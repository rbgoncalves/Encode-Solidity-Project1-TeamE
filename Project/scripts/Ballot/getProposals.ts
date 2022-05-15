import { ethers } from "ethers";
import "dotenv/config";
import { connectToBlockchain, connectToContract, getArg } from "./utils";

async function main() {
  const signer = await connectToBlockchain();

  const ballotAddress = getArg(2, "Ballot address missing");
  const ballotContract = connectToContract(ballotAddress, signer);

  let index = 0;
  while (index !== -1) {
    try {
      const proposal = await ballotContract.proposals(index);
      const proposalName = ethers.utils.parseBytes32String(proposal.name);

      console.log(
        `Proposal ${index} has name ${proposalName} and ${proposal.voteCount} votes`
      );
      index++;
    } catch (e) {
      index = -1;
      break;
    }
  }
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
