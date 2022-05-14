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
    const proposalArray = ballotContract.proposals;
    for (let index = 0; index < proposalArray.length; index++) {
        const proposal = await proposalArray(index);
        const proposalName = ethers.utils.parseBytes32String(proposal.name);
        console.log(`proposal ${index} is called ${proposalName}`);
    }
}