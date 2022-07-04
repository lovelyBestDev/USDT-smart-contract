const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Greeter", function () {
  it("Should return the new greeting once it's changed", async function () {
    const Greeter = await hre.ethers.getContractFactory("USDT");
    const greeter = await Greeter.deploy("EXL-USD", "USDT", 18, 100);
    await greeter.deployed();

    const Bridge = await hre.ethers.getContractFactory("MainBridge");
    const bridge = await Bridge.deploy(greeter.address);
    await bridge.deployed();

    const owner = await greeter.getOwner();

    console.log("Owner: " + greeter.address);
    console.log("Bridge: " + bridge.address);

    console.log("Total: " + await greeter.totalSupply());
    console.log("Owner Balance: " + await greeter.balanceOf(owner));
    console.log("");

    await greeter.transfer("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9", 30000);
    console.log("Total: " + await greeter.totalSupply());
    console.log("Owner Balance: " + await greeter.balanceOf(owner));
    console.log("Customer Balance: " + await greeter.balanceOf("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9"));
    console.log("");

    await greeter.transfer(bridge.address, 50000);
    console.log("BridgeContract Balance: " + await greeter.balanceOf(bridge.address))
    console.log("BridgeContract Balance: " + await bridge.getLiquidityTotalAmount())
    console.log("");
    
    await greeter.approve(bridge.address, 1000);
    await bridge.lock("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9", 1000);
    console.log("Customer Balance: " + await greeter.balanceOf("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9"));
    console.log("Bridge Balance: " + await greeter.balanceOf(bridge.address));
    console.log("");

    // await greeter.approve(bridge.address, 10);
    // console.log(await greeter.allowance(owner, bridge.address))


    // await bridge.lock(owner, 50);
    // console.log(await greeter.USDTallowance(owner, bridge.address));
    // console.log(await greeter.USDTallowance(owner, "0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9"));
    // const owner = await greeter.getOwner();
    // expect(await greeter.USDTbalanceOf(owner)).to.equal(20);
    // expect(await greeter.USDTtotalSupply()).to.equal(20);

    // await greeter.USDTtransfer("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9", 4);
    // expect(await greeter.USDTbalanceOf(owner)).to.equal(16);
    // expect(await greeter.USDTtotalSupply()).to.equal(20);
    // expect(await greeter.USDTbalanceOf("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9")).to.equal(4);
    // console.log(await greeter.USDTbalanceOf("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9"));

    // await greeter.issue(3);
    // expect(await greeter.USDTtotalSupply()).to.equal(23);
    // expect(await greeter.USDTbalanceOf(owner)).to.equal(19);


    // // await greeter.addBlackList("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9");
    // // await greeter.destroyBlackFunds("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9");
    // // console.log(await greeter.USDTbalanceOf("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9"));
    // // console.log(await greeter.USDTtotalSupply());

    // await greeter.issue(15);
    // console.log(await greeter.USDTtotalSupply());
    // console.log(await greeter.USDTbalanceOf(owner));

    // await greeter.USDTtransfer("0xEE24263bcdb7658a70D0298e1924f5604b5920f6", 2);
    // await greeter.USDTtransferFrom("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9", "0xEE24263bcdb7658a70D0298e1924f5604b5920f6", 3);
    // console.log(await greeter.USDTbalanceOf(owner));
    // console.log(await greeter.USDTbalanceOf("0x8A6c2dD6cbEa9d48C9DB83b646066735F6C065f9"));
    // console.log(await greeter.USDTbalanceOf("0xEE24263bcdb7658a70D0298e1924f5604b5920f6"));
  });
});
