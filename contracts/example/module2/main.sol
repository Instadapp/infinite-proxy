// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../common/variables.sol";

contract ReadModule is Variables {
    /**
     * @dev Read function to get user's balance in the contract.
     * @param user_ address of user.
     */
    function userBalance(address user_) public view returns (uint256) {
        return _userBalance[user_];
    }
}
