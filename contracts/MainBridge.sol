//SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {USDT} from "./USDT.sol";

contract MainBridge {
    address usdt_addr; // USDT smart contract address on Excoincial
    address owner; // Owner address
    address MainChainProxyManager;  //MainChainProxyManager address
    bool warning = false;

    USDT usdtContract;

    mapping (address => bool) gateways;
    address[] addedAddress;

    event Lock(address from, uint amount);
    event Unlock(address from, uint amount);
    event Withdraw(uint amount);
    event TransferOwnerAddress(address newOwner);
    event TransferMainChainProxyManagerAddress(address newMainChainProxyManager);

    modifier onlyOwner() {
        require(owner == msg.sender, "You are not Owner");
        _;
    }

    modifier onlyMainChainProxyManager() {
        require(MainChainProxyManager == msg.sender, "You are not MainChainProxyManager");
        _;
    }

    modifier onlyGateway() {
        require(gateways[msg.sender], "Your information is not verified by MainChainProxyManager.");
        _;
    }




    constructor(address _usdt) {
        owner = msg.sender;
        MainChainProxyManager = msg.sender;
        usdt_addr = _usdt;
        usdtContract = USDT(usdt_addr);
    }





    function lock(address _from, uint _amount) public onlyGateway {
        require(usdtContract.allowance(_from, address(this)) >= _amount, "The approved amount is not enough.");
        usdtContract.transferFrom(_from, address(this), _amount);
        emit Lock(_from, _amount);
    }

    function unlock(address _to, uint _amount) public onlyGateway {
        if (usdtContract.balanceOf(address(this)) <= _amount) {
            warning = true;
            require(!warning, "Excuse me, please try again later.");
        }
        usdtContract.transfer(_to, _amount);
        emit Unlock(_to, _amount);
    }

    function withdraw(uint _amount) public onlyOwner{
        require(_amount != 0, "Check the amount you want to withdraw.");
        require(_amount <= usdtContract.balanceOf(address(this)), "The amount you want is too large");
        usdtContract.transfer(owner, _amount);
        emit Withdraw(_amount);
    }





    function addGateway(address[] memory _gateways) public onlyMainChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            add(_gateways[i]);
        }
    }

    function removeGateway(address[] memory _gateways) public onlyMainChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            remove(_gateways[i]);
        }
    }
    function disableGateway(address[] memory _gateways) public onlyMainChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            disable(_gateways[i]);
        }
    }
    function enableGateway(address[] memory _gateways) public onlyMainChainProxyManager{
        for(uint i = 0; i < _gateways.length; i++) {
            enable(_gateways[i]);
        }
    }

    function add(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        gateways[_gateway] = true;
    }
    function remove(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        delete gateways[_gateway];
    }
    function disable(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        gateways[_gateway] = false;
    }
    function enable(address _gateway) private {
        require(_gateway != address(0), "Please recheck gateway address.");
        gateways[_gateway] = true;
    }





    function checkGatewayVerify(address _gateway) public view returns(bool){
        require(_gateway != address(0), "Please recheck gateway address.");
        bool temp = gateways[_gateway];
        return temp;
    }





    function setUSDTaddress(address newCoinAddress) public onlyMainChainProxyManager {
        require(newCoinAddress != address(0), "Please recheck new contract address.");
        usdt_addr = newCoinAddress;
        usdtContract = USDT(usdt_addr);
    }

    function getUSDTaddress() public view onlyMainChainProxyManager returns(address) {
        return usdt_addr;
    }




    function getLiquidityTotalAmount() public view onlyMainChainProxyManager returns(uint) {
        return usdtContract.balanceOf(address(this));
    }




    function defaultWarning() public onlyMainChainProxyManager {
        warning = false;
    }



    function transferOwnership(address newOwner) public onlyOwner {
        require(newOwner != address(0), "Please recheck new Owner address.");
        owner = newOwner;
        emit TransferOwnerAddress(owner);
    }
    function transferMainChainProxyManagership(address newMainChainProxyManager) public onlyMainChainProxyManager {
        require(newMainChainProxyManager != address(0), "Please recheck new ProxyManager address.");
        MainChainProxyManager = newMainChainProxyManager;
        emit TransferMainChainProxyManagerAddress(MainChainProxyManager);
    }



    function checkWarning() public view onlyMainChainProxyManager returns(bool) {
        return warning;
    }
}