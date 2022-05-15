import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
import { Ballot } from "../../typechain";
import { connectToBlockchain } from "./utils";

async function main() {
  const signer = await connectToBlockchain();
  const ballotAddress = "0x0ca02ed57ed09f2ac3bf2809dd1ea91410ac00c2";
  const ballotContract: Ballot = new Contract(
    ballotAddress,
    ballotJson.abi,
    signer
  ) as Ballot;

  let index = 0;

  while (index !== -1) {
    try {
      const proposal = await ballotContract.proposals(index);
      const proposalName = ethers.utils.parseBytes32String(proposal.name);

      console.log(`Proposal ${index} has name ${proposalName}`);
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
