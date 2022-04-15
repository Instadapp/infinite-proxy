// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "../common/variables.sol";

contract Events is Variables {
    event supplyLog(uint256 amount_);

    event withdrawLog(uint256 amount_);
}
