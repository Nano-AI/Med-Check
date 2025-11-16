# MedCheck
## Setup
Terminal 1:
```
cd medcheck-backend
node index.js
```
Terminal 2:
```
cd medcheck-hardhat
npx hardhat node
```
Terminal 3:
```
cd medcheck-hardhat
npx hardhat compile
npx hardhat ignition deploy ignition/modules/PrescriptionRegistry.ts --network localhost
```
Terminal 4:
```
cd medCheck
npm run dev
```