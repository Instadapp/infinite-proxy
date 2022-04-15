// We require the Hardhat Runtime Environment explicitly here. This is optional
// but useful for running the script in a standalone fashion through `node <script>`.
//
// When running the script with `npx hardhat run <script>` you'll find the Hardhat
// Runtime Environment's members available in the global scope.
import { ethers } from "hardhat";
import { Contract } from "ethers";
import { SignerWithAddress } from "@nomiclabs/hardhat-ethers/signers";
const hre = require("hardhat");

const UserModuleSigs = [
  "supply(uint256)",
  "withdraw(uint256)"
].map((a) => ethers.utils.id(a).slice(0, 10));

const ReadModuleSigs = [
  "userBalance(address)"
].map((a) => ethers.utils.id(a).slice(0, 10));

async function main() {
  // Hardhat always runs the compile task when running scripts with its command
  // line interface.
  //
  // If this script is run directly using `node` you may want to call compile
  // manually to make sure everything is compiled
  // await hre.run('compile');

  // We get the contract to deploy
  let proxy: Contract,
    userModule: Contract,
    readModule: Contract,
    dummyImplementation: Contract,
    signer: SignerWithAddress

  [signer] = await ethers.getSigners();
  const proxyAdmin = signer.address

  const UserModule = await ethers.getContractFactory(
    "contracts/example/module1/main.sol:UserModule"
  );
  userModule = await UserModule.deploy();
  await userModule.deployed();
  console.log("User module deployed to: ", userModule.address);

  const ReadModule = await ethers.getContractFactory(
    "contracts/example/module2/main.sol:ReadModule"
  );
  readModule = await ReadModule.deploy();
  await readModule.deployed();
  console.log("Read module deployed to: ", readModule.address);

  const DummyImplementation = await ethers.getContractFactory(
    "contracts/example/dummyImplementation.sol:DummyImplementation"
  );
  dummyImplementation = await DummyImplementation.deploy();
  await dummyImplementation.deployed();
  console.log(
    "Dummy Implementation deployed to: ",
    dummyImplementation.address
  );

  const Proxy = await ethers.getContractFactory(
    "contracts/example/proxy.sol:Example"
  );
  proxy = await Proxy.deploy(proxyAdmin, dummyImplementation.address);
  await proxy.deployed();
  console.log("Proxy deployed to: ", proxy.address);

  let tx = await proxy.addImplementation(userModule.address, UserModuleSigs);
  await tx.wait();
  console.log("User Module implementation enabled!");

  tx = await proxy.addImplementation(readModule.address, ReadModuleSigs);
  await tx.wait();
  console.log("Read Module implementation enabled!");

  try {
    await hre.run("verify:verify", {
      address: userModule.address,
      constructorArguments: [],
      contract: "contracts/example/module1/main.sol:UserModule",
    });
  } catch (error) {
    console.log("Failed to verify User Module");
    console.log(error);
    console.log();
  }
  try {
    await hre.run("verify:verify", {
      address: readModule.address,
      constructorArguments: [],
      contract: "contracts/example/module2/main.sol:ReadModule",
    });
  } catch (error) {
    console.log("Failed to verify Read Module");
    console.log(error);
    console.log();
  }
  try {
    await hre.run("verify:verify", {
      address: dummyImplementation.address,
      constructorArguments: [],
      contract:
        "contracts/example/dummyImplementation.sol:DummyImplementation",
    });
  } catch (error) {
    console.log("Failed to verify Dummy Implementation");
    console.log(error);
    console.log();
  }
  try {
    await hre.run("verify:verify", {
      address: proxy.address,
      constructorArguments: [proxyAdmin, dummyImplementation.address],
      contract: "contracts/example/proxy.sol:Example",
    });
  } catch (error) {
    console.log("Failed to verify Proxy");
    console.log(error);
    console.log();
  }
}

// We recommend this pattern to be able to use async/await everywhere
// and properly handle errors.
main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});