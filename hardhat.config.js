require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-etherscan");
// This is a sample Hardhat task. To learn how to create your own go to
// https://hardhat.org/guides/create-task.html
task("accounts", "Prints the list of accounts", async (taskArgs, hre) => {
  const accounts = await hre.ethers.getSigners();

  for (const account of accounts) {
    console.log(account.address);
  }
});

// You need to export an object to set up your config
// Go to https://hardhat.org/config/ to learn more

/**
 * @type import('hardhat/config').HardhatUserConfig
 */
module.exports = {
  solidity: "0.8.0",
  networks: {
    testnet: {
      url: "https://testnet-rpc.exlscan.com",
      chainId: 27082017,      // Rinkeby's id
      gas: 5000000,        // Rinkeby has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 500,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true,     // Skip dry run before migrations? (default: false for public nets )
      accounts: ['ee31531f1b55b97956bf17011dcae5d0df5d5b5881cb5d5ba8c830ddaa837c4a']
    },
    rinkeby: {
      url: 'https://rinkeby.infura.io/v3/6b441de391c142c3b5742f8467752df7',
      accounts: ['ee31531f1b55b97956bf17011dcae5d0df5d5b5881cb5d5ba8c830ddaa837c4a'],
      chainId: 4
    },
    ropsten: {
      url: 'https://ropsten.infura.io/v3/6b441de391c142c3b5742f8467752df7',
      accounts: ['ee31531f1b55b97956bf17011dcae5d0df5d5b5881cb5d5ba8c830ddaa837c4a'],
      chainId: 3
    },
    kovan: {
      url: 'https://kovan.infura.io/v3/6b441de391c142c3b5742f8467752df7',
      accounts: ['c66ca43cac13ca78b5243b0d07c4362d6177be456feb24dd01d5ec64afde7ddd'],
      chainId: 42
    },

    
    excoincial: {
      url: 'https://testnet-rpc.exlscan.com',
      accounts: ['ee31531f1b55b97956bf17011dcae5d0df5d5b5881cb5d5ba8c830ddaa837c4a'],
      chainId: 27082017
    },
    goerli: {
      url: 'https://goerli.infura.io/v3/6b441de391c142c3b5742f8467752df7',
      accounts: ['c66ca43cac13ca78b5243b0d07c4362d6177be456feb24dd01d5ec64afde7ddd'],
      chainId: 5
    }
  },
  etherscan: {
    apikey: {
      excoincial: '6b441de391c142c3b5742f8467752df7',
    },
    customChains: [
      {
        network: "excoincial",
        chainId: 27082017,
        urls: {
          apiURL: 'https://testnet-rpc.exlscan.com',
          browserURL: 'https://testnet-explorer.exlscan.com'
        }
      }
    ]
  }
};
