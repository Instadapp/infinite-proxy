// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./events.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC20/utils/SafeERC20.sol";

contract UserModule is Events {
    using SafeERC20 for IERC20;

    /**
     * @dev User function to supply.
     * @param amount_ amount to supply.
     */
    function supply(uint256 amount_) external {
        IERC20(token).safeTransferFrom(msg.sender, address(this), amount_);
        _userBalance[msg.sender] += amount_;

        emit supplyLog(amount_);
    }

    /**
     * @dev User function to withdraw.
     * @param amount_ amount to withdraw.
     */
    function withdraw(uint256 amount_) external {
        _userBalance[msg.sender] -= amount_;
        IERC20(token).safeTransfer(msg.sender, amount_);

        emit withdrawLog(amount_);
    }
}
