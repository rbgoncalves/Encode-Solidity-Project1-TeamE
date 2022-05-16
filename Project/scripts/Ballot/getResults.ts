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


    const winner = await ballotContract.winnerName();
    const winnerString = ethers.utils.parseBytes32String(winner);
    console.log(`The winner is proposal ${winnerString}`);
}
main().catch((error) => {
    console.error(error);
    process.exit(1);
});
