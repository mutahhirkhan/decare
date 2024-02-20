# DeCare

## ABSTRACT

Blockchain technology has emerged as one of the most hyped IT buzzwords in recent years. Its impact across various industries is comparable to the internet's influence over two decades ago. This project, DeCare, addresses challenges faced by NGOs and donors in ensuring transparent and secure transactions of funds. By leveraging blockchain technology, DeCare aims to revolutionize the funding industry, making transactions safe, transparent, and efficient for all stakeholders involved.

## DE CARE: A DECENTRALIZED DONATION PLATFORM

### 1. PROJECT DESCRIPTION

DeCare is a blockchain-based transparency solution for NGOs, designed to minimize cash flow activities and prevent fraud. It whitelists receiver addresses, ensuring safe deposit of funds. Beneficiaries can create campaigns, donors can contribute funds, and receivers can approve transactions. All transaction details are accessible to users, providing transparency throughout the process.

### 2. VISION

The vision of DeCare is to adopt transparent and adaptable technology. By leveraging the core value of blockchain—transparency—DeCare aims to set new standards in the donation ecosystem.

### 3. PURPOSE OF PROJECT

The project aims to address the challenges faced by individuals and communities in need of funds, providing donors with confidence in transparent and secure donations.

### 4. SCOPE OF WORK

The Minimum Viable Product (MVP) ensures secure fundraising, transparent transaction history viewing, user-friendly web interface, and fee-free fund withdrawal.

### 5. PRODUCT SCENARIOS

DeCare facilitates fundraising campaigns for individuals in need, ensuring funds are securely deposited and transparently managed. Donors can contribute to specific campaigns, and beneficiaries can withdraw funds safely.

### 6. STAKEHOLDERS

1. Beneficiary
2. Donor
3. Receiver
4. Development Team

### 7. TECHNOLOGY STACK

- React JS Library
- Material UI Library
- Context API
- Firebase Realtime Database
- Firebase Firestore
- EVM Based Smart Contract (Solidity)
- Hardhat Development Tool

### 8. FLOW CHART
[Access Flow Chart here](https://i.ibb.co/GRCrGMf/image.png)

### 9. NAMING CONVENTION AND DEFINITIONS

| TERMS             | EXPLANATION                                                                                                                                                                                             |
|-------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Wallet            | A blockchain wallet is a cryptocurrency wallet that allows users to manage different kinds of cryptocurrencies. For example, Bitcoin or Ethereum. A blockchain wallet helps someone exchange funds easily. Transactions are secure, as they are cryptographically signed. |
| Wallet address    | A blockchain wallet address is like a bank account for crypto assets. Every address is unique and they are 26-35 alphanumeric characters in length. They are generated from the private key, which is required to send or receive data from one address to another.  |
| Meta mask         | Meta Mask is a cryptocurrency wallet that enables users to store Ether and other ERC-20 tokens. The wallet can also be used to interact with decentralized applications, or dapps.                                  |
| Eth currency      | ETH is a cryptocurrency. It is scarce digital money that you can use on the internet similar to Bitcoin. The Ethereum blockchain is powered by its native cryptocurrency ether (ETH) and enables developers to create new types of ETH-based tokens that power dapps through the use of smart contracts. |
| Decentralization  | Decentralization refers to the transfer of control and decision-making from a centralized entity (individual, organization, or group thereof) to a distributed network                                                  |
| Transaction hash  | A transaction hash/id is a unique string of characters that is given to every transaction that is verified and added to the blockchain. In many cases, a transaction hash is needed in order to locate funds.                   |
| Required amount   | The target amount required in a campaign to be raised.                                                                                                                                                  |
| Collected amount  | The amount collected so far by the campaign.                                                                                                                                                            |
| Spended amount    | The amount spent till now in the campaign.                                                                                                                                                              |
| Delegated amount  | The amount received by the receiver; the ngos.                                                                                                                                                         |
| Campaigns         | A goal set by the beneficiary to meet the target amount. It includes details of the users, donors and receivers.                                                                                     |
| Goal Pending      | A status which indicates that the target amount hasn’t reached yet.                                                                                                                                     |
| Closed            | The campaign is closed, either by the user or when it has reached the target the amount to be raised.                                                                                                   |
| Etherscan         | Etherscan is a blockchain explorer platform for the Ethereum blockchain. You can use this free tool to view any past transaction, wallet, smart contract, NFT, and anything else you may want to view in the history of Ethereum. |

### 10. RELEVANT FACTS AND ASSUMPTIONS

Assumptions include the coordination between NGOs and beneficiaries, with receivers approving fund transactions.

### 11. PRODUCT USE CASE

- For Individuals
- For Communities
- For Ongoing Relief Campaigns

### 12. FUNCTIONAL REQUIREMENTS

- User Onboarding: Specific platforms for donors and beneficiaries
- Campaign Creation: Creations of campaigns for the beneficiaries for funds raising.
- Withdraw of Funds: Safe and secure withdrawal of the amount of funds.
- Closure of Campaigns: Closing of campaigns after the funds hit the target amount.

### 13. NON-FUNCTIONAL REQUIREMENTS

- Scalability: DeCare should be able to provide services to multiple users at any given time.
- Security: Only registered users can use or access the application.
- Performance: Application must be lightweight and works smoothly.

### 14. DEPENDABILITY REQUIREMENTS

#### 14.1 AVAILABILITY OF NETWORK

The network on which our application is currently deployed, if it faces downtime then our platform will be inaccessible.

#### 14.2 AVAILABILITY OF FULL NODE CLIENTS

#### 14.3 BYZANTINE FAULT TOLERANCE

#### 14.4 PROOF OF WORK MIGRATION TO PROOF OF STAKE

### 15. NETWORK DESIGN / ARCHITECTURE

we delve into the underlying structure and framework that supports the functionality and operation of the application. This includes outlining the network topology, communication protocols, and data flow mechanisms utilized within the system. The architecture is designed to ensure scalability, reliability, and security, catering to the project's requirements and user expectations. By detailing the network design, stakeholders gain insights into how data is transmitted, processed, and stored across different components and nodes. This section also addresses considerations such as fault tolerance, load balancing, and redundancy to maintain robustness and integrity within the network infrastructure. Overall, a well-defined network design/architecture lays the foundation for a resilient and efficient system operation.

### 16. CURRENT DAPP SOFTWARE ARCHITECTURE

Client side gets data from the smart contracts. Single response are got by a single query, that’s why there is a need to integrate separate APIs which is time consuming.
For example we want to retrieve the information of user. So their information will be retrieved from the database. The campaigns will be connected to the database and the funds raised by that specific donor can be retrieved from there.

### 17. FUTURE VARIATION IN DAPP SOFTWARE ARCHITECTURE

Contracts are based on EVM, which are written on compatibles chain. There is a concept of Events emission which describes that whenever any transaction take place, the values present in that event will be broadcasted and listeners who are listening on that smart contract also catches the values.
We use the services provided by the indexer that is whenever there a transaction will take place in the contract, the generated values will be listened by the Graph. The Graph QL provides an indexer which optimizes the searching time and saves the time of every query.
The point of query will become single, united. The data will no longer be scattered. And the architecture will be changed as well.

### 18. LOOK AND FEEL

we focus on the aesthetics and user experience of the application. It aims to provide users with a visually appealing and intuitive interface, ensuring an engaging and seamless interaction. Elements such as color schemes, typography, layout, and graphical elements are carefully crafted to enhance usability and convey the project's branding and identity. The user interface is designed to be user-friendly, responsive across different devices, and accessible to a diverse audience. Overall, the "Look and Feel" of the application is tailored to create a positive impression and foster user satisfaction and engagement.

### 19. OUR DAPP VS OTHER DAPPS

- Quality Content: Effective and meaningful content is used for providing significant and relevant information for the target audience.
- User Interface: The interface designed is user-friendly and eye-catching with appropriate elements, light colors, and themes. Users associate good feelings with brands that speak to them at all levels and keep the seamless experience alive.

### 20. TEST PLAN

- Unit Cases on Hardhat

### 21. USER INTERFACE

- Registration Form: For user interaction.
- Campaigns: A broad view of campaigns for the users.
- History: All users can view the history of the previous donations and transactions.
- Beneficiary Funds: Amounts can be viewed in the Beneficiary funds.
- Receiver: Receiver can approve the raised funds, and the amount will be transferred to their accounts.

### 22. RISK

- Misuse of Platform: Platform can be misused by the beneficiaries and the receivers.
- Approval from Receiver: Upon a single approval from the receiver, multiple approvals can be generated.
- Network Downtime: Due to inaccessibility of a network, the on-time collection can be compromised.
- Protocol Exploitation: Attacks can be done on this platform to exploit the contract due to which the funding amount can be compromised.
