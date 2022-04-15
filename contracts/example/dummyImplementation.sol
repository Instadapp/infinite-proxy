// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract UserModule {
    /**
     * @dev User function to supply.
     * @param amount_ amount to supply.
     */
    function supply(uint256 amount_) external {}

    /**
     * @dev User function to withdraw.
     * @param amount_ amount to withdraw.
     */
    function withdraw(uint256 amount_) external {}
}

contract ReadModule {
    /**
     * @dev Read function to get user's balance in the contract.
     * @param user_ address of user.
     */
    function userBalance(address user_) public view returns (uint256) {}
}

contract DummyImplementation is UserModule, ReadModule {}
