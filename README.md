# infinite-proxy (Infinite Extendable Proxy)

Upgradable proxy with infinite implementations enabled at once.

Read about general upgradable contacts with 1 implementation contract [here](https://docs.openzeppelin.com/upgrades-plugins/1.x/writing-upgradeable).

### Details
- Creates a mapping from bytes4 sig to implementation's address
- Stores mapping from implementation's address to bytes4[] sigs. All the external functions we want to be callable from our contract.
- Every call (other than addition & removal of implementation & sigs) goes through fallback.
- In fallback it fetches the msg.sig, fetches the implementation from it and run the code logic on that.