# Ballot project Report

## Deployed contract

**Address:** 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605

**Chairperson:** 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377 

**Proposals:** proposalA, proposalB, proposalC

**Etherscan:** https://ropsten.etherscan.io/address/0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605

## Operations

### Deployment

**Script:** deployment.ts

**Txn Hash:** 0x1a4806449f7b500931fa96ee9c9af8aecf52b76d0094c9765a76abf9f250aa30

**Description:** Deploys Ballot contract with given proposals

**Script:** 

`yarn ts-node scripts/Ballot/deployment.ts proposalA proposalB proposalC`

**Output:**

```
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 1
Deploying Ballot contract
Proposals: 
Proposal N. 1: proposalA
Proposal N. 2: proposalB
Proposal N. 3: proposalC
Awaiting confirmations
Completed
Contract deployed at 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605
```

------

### Give Voting Right

**Script:** giveVotingRight.ts

**Txn Hash:** 0x0622ba7e4cb6527fec5c0417763a8836f956f0b188f22987e3ba9d

**Description:** Chairperson gives voting right to someones (weight = 1)

**Script:** 

`yarn ts-node scripts/Ballot/giveVotingRight.ts 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0`

**Output:**

```
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 0.9935871429409198
Attaching ballot contract interface to address 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605
Giving right to vote to 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Awaiting confirmations
Transaction completed. Hash: 0x0622ba7e4cb6527fec5c0417763a8836f956f0b188f22987e3ba9d3170c4c87f
```

------

### Get proposals

**Script:** getProposals.ts

**Txn Hash:** n/a (read-only)

**Description:** Get Ballot's proposals and it's votes

**Script:** 

`yarn ts-node scripts/Ballot/getProposals.ts 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605`

**Output:**

```
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 0.9935090637562107
Attaching ballot contract interface to address 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605
Proposal 0 has name proposalA and 0 votes
Proposal 1 has name proposalB and 0 votes
Proposal 2 has name proposalC and 0 votes
```

------

### Delegate vote

**Script:** delegateVote.ts

**Txn Hash:** 0x4e154d35267cd4b02d3bf2de8bf6420335d97e7d0ea1e77bd61fd0a0b7aa5d97

**Description:** Delegates voting right to target account (The owner losses the voting ability, and the target gets more weight in it's vote)

**Script:** 

`yarn ts-node scripts/Ballot/delegateVote.ts 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0`

**Output:**

```
Using address 0x63FaC9201494f0bd17B9892B9fae4d52fe3BD377
Wallet balance 0.9935090637562107
Attaching ballot contract interface to address 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605
Delegating vote to 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Awaiting confirmation
Transaction completed. Hash: 0x4e154d35267cd4b02d3bf2de8bf6420335d97e7d0ea1e77bd61fd0a0b7aa5d97
```

------

### Cast vote

**Script:** castVote.ts

**Txn Hash:** 0x682c978d5844dc35fd34a87528511062c287de601b36b19dfc012afd1e3f3f88

**Description:** Account votes in a chosen proposal(weight is converted into proposal votes)

**Script:** 

`yarn ts-node scripts/Ballot/castVote.ts 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605 1`

**Output:**

```
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 9.994179840379172
Attaching ballot contract interface to address 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605
Voting in "proposalB"
Awaiting confirmation
Transaction completed. Hash: 0x682c978d5844dc35fd34a87528511062c287de601b36b19dfc012afd1e3f3f88
```

------

### Get voting results

**Script:** getResults.ts

**Txn Hash:** n/a (read only)

**Description:** Get the winner proposal (the one with more votes)

**Script:** 

`yarn ts-node scripts/Ballot/getResults.ts 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605`

**Output:**

```
Using address 0x9DaB0ba7eC8630e01c6E26a4Df78DceEb20beac0
Wallet balance 9.994038875908826
Attaching ballot contract interface to address 0x1F0D05a2c411961dE8394Cfa16c4307E75F8e605
The winner is proposal proposalB
```







