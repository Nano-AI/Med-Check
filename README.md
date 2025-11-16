# MedCheck
[YouTube Presentation](https://youtu.be/fAjWG8-LzMA?si=j0dDPDOYYdaCicj_)
## Inspiration
Prescription medication is no joke. Controlled substances need to be verified and proven authentic before it is safe for an individual to consume them. There have been a few cases where this has been an issue. 
This year, there was a [nationwide recall of Adderall](https://www.thehealthy.com/news/adhd-medication-recall-september-2025/). 
[A 9 year-old was prescribed an opioid which was more powerful than morphine!](https://people.com/pharmacy-gives-9-year-old-opioids-instead-of-adhd-meds-11753383). 
[580,000 bottles of a blood pressure drug were recalled due to cancer risks](https://www.cbsnews.com/news/blood-pressure-drug-recall-cancer-prazosin-hydrochloride-fda/)
Errors in pharmaceutical drugs are no joke, and we wanted to help create an app that verified and ensured that users would be able to check and stay on top of any information related to their prescribed meds. 

### Why Blockchain
Because pharmaceutical errors are critical and life altering, we opted for a system built on unquestionable trust and transparency. A traditional and centralized database could be a potential point of failure, since records could theoretically be altered, or a server could be backed. This is where blockchain would come best in play.
We chose blockchain for three core reasons:
- Immutability: Once a drug batch is logged to the blockchain, its record—represented by a unique hash—is permanent and cannot be altered or deleted. This creates a tamper-proof standard for authenticity that a standard database cannot guarantee.
- Transparency & Traceability: The ledger provides a clear, auditable, and accessible trail. Any user, pharmacist, or regulator can scan the QR code and verify the medication's origin, timestamp, and status.
- Decentralized Trust: Our system removes the need to place blind trust in a single company's private database. Instead, trust is distributed and secured cryptographically. This creates a new layer of accountability for manufacturers and provides true peace of mind for patients.
In short, blockchain is the only technology that provides the verifiable, unchangeable, and transparent foundation required to build a medication tracking system that patients can truly depend on.
## What it does
MedCheck leverages blockchain technology to log and keep track of batches of drugs they produce. These hashes can be printed as QR codes and stuck on labels, in addition to the already existing ones. These QR codes will redirect to MedCheck, which will display information about the medication. This provides users with information like the hash, dosage, wallet of the company, the provider, the timestamp it was logged, as well as any warnings or alerts that companies decide to issue. 
MedCheck also provides companies with a separate portal to log each drug. In the MVP, this has to be done manually, but can be expanded and automated when being produced, labeled, and packaged. The current amount of visible parameters are also limited for the sake of simplicity, though they can be expanded to include the production facility, and more. The admin dashboard also allows companies to issue warnings about specific drugs, specific providers, specific dosages, and even ranges for timestamps.
All of this is in hopes that companies streamline communication by providing greater transparency to the user. By creating an extra layer of information, it helps everybody make be
tter informed decisions.

## How we built it
Blockchain/Smart Contract: Ethereum with Solidity and HardHat.
Web3 Interaction: ethers.js (Ethereum JavaScript API) for connecting to the contract, generating hashes (Keccak-256), signing transactions, and querying data.
Frontend Framework: React
UI Components: shadcn/ui (e.g., Button, Card, Badge, Accordion) for styled elements, likely with Tailwind CSS under the hood; Lucide-react icons for visual enhancements.
Backend/API: Express.js server querying a database. 

## Challenges we ran into
None of us had ever worked with blockchain, so we spent about the first six hours trying to figure out the best way to host and run a blockchain. Due to the complexity of requiring an Ethereum Faucet (tesetnet), we opted to locally deploy it for simplicity's sake. Learning Solidity was time consuming, and took a majority of our time. 
Another challenge we faced was coming up with an idea; blockchains can be used for energy distribution, voting/ledger systems, medical records, and more, so coming up with a good solution that we resonated with and could see through was definitely a hurdle to get through. After spending a few hours working on a voting system we decided to switch plans and restart the entire project.

## Accomplishments that we're proud of
We were able to fully implement a blockchain system. Given that none of us had prior experience with blockchains, Etherium, cryptocurrency, etc., it was really fun and exciting to make a product that leveraged this technology.

## What we learned
We learned a lot about Solidity and the fundamentals on how to use Ethereum and Web3. We had always heard about blockchains but assumed that it was strictly for cryptocurrency. It turns out that no, ledgers don’t just track receipts of currency transactions, but they have the ability to keep track of data! Almost like a database, but decentralized and available for everyone to use.

## What's next for MedCheck
We would like to learn more about blockchains and how it could potentially be used as a public solution. After polishing the product, it could be presented to local pharmacies as a potential feature included in medicine containers around Madison! Long-term, MedCheck wishes to be a verification layer that helps the industry provide secure and transparent drug tracking.
This could potentially be sold as a BaaS (blockchain-as-a-service) for pharmaceutical companies.

## Run This Locally 
Terminal 1:
```
cd medcheck-backend
npm i
node index.js
```
Terminal 2:
```
cd medcheck-hardhat
npm i
npx hardhat node
```
Terminal 3:
```
cd medcheck-hardhat
npm i
npx hardhat compile
npx hardhat ignition deploy ignition/modules/PrescriptionRegistry.ts --network localhost
```
Terminal 4:
```
cd medCheck
npm i
npm run dev
```