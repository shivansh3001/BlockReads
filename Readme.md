# BlockReads

## Description

This project implements a decentralized application (DApp) that allows users to view and buy research papers stored on IPFS (InterPlanetary File System). Users interact with the blockchain to execute transactions, while access to the research papers is controlled through dynamically generated, time-limited access links provided by the Pinata Cloud service.

## Features

- **View Research Papers**: Users can view research papers for a limited time.
- **Buy Research Papers**: Users can buy permanent access to research papers.
- **Blockchain Integration**: Uses Ethereum blockchain to manage transactions.
- **IPFS for Storage**: Research papers are stored on IPFS, ensuring decentralized storage.
- **Pinata Cloud Integration**: Utilizes Pinata for secure and time-limited access to IPFS content.
  
## Contract Details

- **Contract Address**: 0x6471EACC40D24bC9F4BAB843560eDFEa190730c5.
- **Deployed on**: EduChain Testnet.
- **Block Explorer Url**: [View on Explorer](https://edu-chain-testnet.blockscout.com/address/0x6471EACC40D24bC9F4BAB843560eDFEa190730c5)

## How to Use

### Viewing a Research Paper

1. **Select a Research Paper**: Browse the available research papers on the platform.
2. **Click View**: Use the View button associated with the research paper you wish to access.
3. **Confirm Transaction**: Confirm the transaction in your Ethereum wallet (e.g., MetaMask).
4. **Access Content**: Once the transaction is confirmed, a link will be provided to access the paper for a specified duration.

### Buying a Research Paper

1. **Select a Research Paper**: Find a paper you are interested in owning permanently.
2. **Click Buy**: Use the Buy button for the desired research paper.
3. **Confirm Transaction**: Approve the transaction in your Ethereum wallet.
4. **Permanent Access**: After purchase, you will receive a permanent link to access the research paper.

## Technologies Used

- **React**: For building the user interface.
- **Ethereum**: As the blockchain platform.
- **IPFS**: For decentralized file storage.
- **PinataSDK**: To manage IPFS content access securely.
- **Express.js**: For backend server operations.
