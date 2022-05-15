// query the results
import { Contract, ethers } from "ethers";
import "dotenv/config";
import * as ballotJson from "../../artifacts/contracts/Ballot.sol/Ballot.json";
// eslint-disable-next-line node/no-missing-import
import { Ballot } from "../../typechain";
import { connectToBlockchain } from "./utils"

async function main() {
    const signer = await connectToBlockchain();
    const ballotAddress = "0x0ca02ed57ed09f2ac3bf2809dd1ea91410ac00c2";
    const ballotContract: Ballot = new Contract(
        ballotAddress,
        ballotJson.abi,
        signer
    ) as Ballot;
    const userInput = process.argv.slice(2);
    if (userInput.length < 2) {
        const proposalArray = ballotContract.proposals;
        for (let index = 0; index < proposalArray.length; index++) {
            getProposalVote(ballotContract, index);
        }
    }
    else {
        userInput.forEach(function (value) {
            getProposalVote(ballotContract, Number(value));
        });
    }


}
async function getProposalVote(ballotContract: Ballot, index: number) {
    const proposal = await ballotContract.proposals(index);
    const proposalName = ethers.utils.parseBytes32String(proposal.name);
    const proposalVoteCount = proposal.voteCount.toNumber();
    console.log(`proposal ${proposalName} has ${proposalVoteCount}`);
}
