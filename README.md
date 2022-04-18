# infinite-proxy (Infinite Extendable Proxy)

Upgradeable proxy with infinite implementations enabled at once.

Read about general upgradeable contacts with 1 implementation contract [here](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable).

## Introduction
Upgradeable proxies are a big part of ethereum development, they allow smart contracts to be upgradable add/remove code and almost all protocol now uses it one way or another. Still there are some problems which aren't solved via these proxies. Eg:- Ethereum code-limit issue, deployment of full contract again for updates in small part of the code, unability to easily disable/enable some functions.
So whats the solution? Normal proxies have the implementation address stored (in the implementaion slot) to which they delegate call for every external call. What if there could be multiple implementations for a single proxy, the proxy able to decide which implementation to delegate call to for a particular external call. This solves the ethereum-code limit issue as the code can be separated out into different implementations, for smaller updates to the code only that particular implementation has to be redeployed, lastly functions can be easily disabled/enabled by removing/adding implementations.

## Comparision
Proxy                      |  Infinite Proxy
:-------------------------:|:-------------------------:
![image](https://user-images.githubusercontent.com/34437877/163826330-3c67a894-1f6b-4833-8d3d-7ad947407b3d.png) | ![image](https://user-images.githubusercontent.com/34437877/163826362-4bf95d26-3914-4cc5-900b-4ab610ff1959.png)


## How it works?
- Creates a mapping from bytes4 sig to implementation's address
- Stores mapping from implementation's address to bytes4[] sigs. All the external functions we want to be callable from our contract.
- Every call (other than addition & removal of implementation & sigs) goes through fallback.
- In fallback it fetches the msg.sig, fetches the implementation from it and runs the code logic on that.

## How to use it?
- Proxies and implementations are deployed separately, then multiple(infinite) implementations can be added to the proxy. One thing to make sure is the storage variables of all implementations should be at the same storage slot so storage don't get messed up (similar to what we do in upgradable proxy).
- This repo contains an example of using infinite proxies. Checkout the example contracts. Different implementations have been separated out into different modules, but they use the same variables contract.
- Deployment of infinite-proxies is also a little different from normal proxies, the repo also contains an example deployment script.

## Dummy Implementation
One issue with infinite proxies is that etherscan isn't able to detect that the contract is a proxy and hence isn't able to link it to the implementations. This makes it not usable via etherscan, also users can't see the list of all the read/write functions they can call.
An innovative solution for the problem is using a dummy implemenatation. A dummy implementation is nothing but a contract containing all external functions which are callable by the users. The dummy implementation doesn't contain any logics of the functions (analogous to contract interfaces). The dummy implementation's address is stored at the implementation slot which etherscan detects in order to link proxies to their implementations, hence all the external functions can then be seen/called directly via etherscan. Through dummy impelementations, etherscan gets the functions sigs, generates the calldata, but the actual call is delegated to the respective implementation.

## Calling an infinite proxy
All the calls (read & write) are exactly same as any other smart contract (upgradable or non-upgradable) which allows infinite proxy to be composable with any contracts or integrations.

## Live contracts using Infinite Proxy.
- iUSDC vault of [Instadapp Lite](https://lite.instadapp.io/). [here](https://etherscan.io/address/0xc8871267e07408b89aA5aEcc58AdCA5E574557F8)
- DSA v2 contracts [here](https://github.com/Instadapp/dsa-contracts/tree/master/contracts/v2). It been live for more than a year now uses an older version of infinite proxy.
