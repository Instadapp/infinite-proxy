// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Constants {
    // token supported
    address public constant token = 0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48; // USDC
}

contract Variables is Constants {
    // userAddress => amount deposited
    mapping(address => uint256) internal _userBalance;
}
