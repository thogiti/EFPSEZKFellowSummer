# zku-c3-week1-q2

Install the required node modules by running:
```shell
npm install
```

Try running some of the following tasks:

```shell
. scripts/compile-HelloWorld.sh
node scripts/bump-solidity.js && npx hardhat test
```


First run these ZKSNARK operations to build the necessary files.

```shell 
./scripts/compile-HellowWorld.sh

./scripts/compile-Multiplier3-groth16.sh

./scripts/compile-Multiplier3-plonk.sh

```

Then run the nodejs test file `npm run test`.

