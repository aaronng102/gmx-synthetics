import dotenv from "dotenv";
dotenv.config();

import path from "path";
import fs from "fs";
import { ethers } from "ethers";

import { HardhatUserConfig } from "hardhat/config";
import "@nomicfoundation/hardhat-toolbox";
import "hardhat-contract-sizer";
import "solidity-coverage";
import "hardhat-gas-reporter";
import "hardhat-deploy";

import "@typechain/hardhat";
import "@nomiclabs/hardhat-ethers";

// extends hre with gmx domain data
import "./config";

// add test helper methods
import "./utils/test";

const getRpcUrl = (network) => {
  const defaultRpcs = {
    arbitrum: "https://arb1.arbitrum.io/rpc",
    avalanche: "https://api.avax.network/ext/bc/C/rpc",
    arbitrumGoerli: "https://goerli-rollup.arbitrum.io/rpc",
    avalancheFuji: "https://api.avax-test.network/ext/bc/C/rpc",
    baseGoerli: "http://beanex-devnet:8080",
  };

  let rpc = defaultRpcs[network];

  const filepath = path.join("./.rpcs.json");
  if (fs.existsSync(filepath)) {
    const data = JSON.parse(fs.readFileSync(filepath).toString());
    if (data[network]) {
      rpc = data[network];
    }
  }

  return rpc;
};

const getEnvAccounts = () => {
  const { ACCOUNT_KEY, ACCOUNT_KEY_FILE } = process.env;

  if (ACCOUNT_KEY) {
    return [ACCOUNT_KEY];
  }

  if (ACCOUNT_KEY_FILE) {
    const filepath = path.join("./keys/", ACCOUNT_KEY_FILE);
    const data = JSON.parse(fs.readFileSync(filepath));
    if (!data) {
      throw new Error("Invalid key file");
    }

    if (data.key) {
      return [data.key];
    }

    if (!data.mnemonic) {
      throw new Error("Invalid mnemonic");
    }

    const wallet = ethers.Wallet.fromMnemonic(data.mnemonic);
    return [wallet.privateKey];
  }

  return [];
};

const config: HardhatUserConfig = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 10,
        details: {
          constantOptimizer: true,
        },
      },
    },
  },
  networks: {
    // hardhat: {
    //   saveDeployments: true,
    //   // forking: {
    //   //   url: `https://rpc.ankr.com/avalanche`,
    //   //   blockNumber: 33963320,
    //   // },
    // },

    //@todo custom hardhat network for baseGoerli
    hardhat: {
      saveDeployments: true,
      chainId: 421613,
      blockGasLimit: 10000000,
      gasPrice: 10000,
      accounts: [
        {
          privateKey: "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0xea6c44ac03bff858b476bba40716402b03e41b8e97e276d1baec7c37d42484a0",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x8166f546bab6da521a8369cab06c5d2b9e46670292d85c875ee9ec20e84ffb61",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0xc526ee95bf44d8fc405a158bb884d9d1238d99f0612e9f33d006bb0789009aaa",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x47c99abed3324a2707c28affff1267e45918ec8c3f20b8aa892e8b065d2942dd",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0xa267530f49f8280200edf313ee7af6b827f2a8bce2897751d06a843f644967b1",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x701b615bbdfb9de65240bc28bd21bbc0d996645a3dd57e7b12bc2bdf6f192c82",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0xf214f2b2cd398c806f84e317254e0f0b801d0643303237d97a22a48e01628897",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x2a871d0798f97d79848a013d4936a73bf4cc922c825d33c1cf7073dff6d409c6",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0xdbda1821b80551c9d65939329250298aa3472ba22feea921c0cf5d620ea67b97",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x4bbbf85ce3377467afe5d46f804f221813b2bb87f24d81f60f1fcdbf7cbf4356",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x92db14e403b83dfe3df233f83dfa3a0d7096f21ca9b0d6d6b8d88b2b4ec1564e",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x8b3a350cf5c34c9194ca85829a2df0ec3153be0318b5e2d3348e872092edffba",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x47e179ec197488593b187f80a00eb0da91f1b9d0b13f8733639f19c30a34926a",
          balance: "1000000000000000000000",
        },

        {
          privateKey: "0x7c852118294e51e653712a81e05800f419141751be58f605c371e15141b007a6",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x5de4111afa1a4b94908f83103eb1f1706367c2e68ca870fc3fb9a804cdab365a",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d",
          balance: "1000000000000000000000",
        },
        {
          privateKey: "e661efacd1b706d132f90ce61c72ed45f8aca12389086492be753e6dab3d8acc",
          balance: "1000000000000000000000",
        },
      ],
    },
    localhost: {
      saveDeployments: true,
    },
    arbitrum: {
      url: getRpcUrl("arbitrum"),
      chainId: 42161,
      accounts: getEnvAccounts(),
      verify: {
        etherscan: {
          apiUrl: "https://api.arbiscan.io/",
          apiKey: process.env.ARBISCAN_API_KEY,
        },
      },
      blockGasLimit: 20_000_000,
    },
    avalanche: {
      url: getRpcUrl("avalanche"),
      chainId: 43114,
      accounts: getEnvAccounts(),
      verify: {
        etherscan: {
          apiUrl: "https://api.snowtrace.io/",
          apiKey: process.env.SNOWTRACE_API_KEY,
        },
      },
      blockGasLimit: 15_000_000,
    },
    // arbitrumGoerli: {
    //   url: getRpcUrl("arbitrumGoerli"),
    //   chainId: 421613,
    //   accounts: getEnvAccounts(),
    //   verify: {
    //     etherscan: {
    //       apiUrl: "https://api-goerli.arbiscan.io/",
    //       apiKey: process.env.ARBISCAN_API_KEY,
    //     },
    //   },
    //   blockGasLimit: 10000000,
    // },

    arbitrumGoerli: {
      // url: getRpcUrl("arbitrumGoerli"),
      // chainId: 421613,
      // accounts: getEnvAccounts(),
      // verify: {
      //   etherscan: {
      //     apiUrl: "https://api-goerli.arbiscan.io/",
      //     apiKey: process.env.ARBISCAN_API_KEY,
      //   },
      // },
      // blockGasLimit: 10000000,

      url: "http://beanex-devnet:8080",
      chainId: 421613,
      accounts: [
        //0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199
        "0xdf57089febbacf7ba0bc227dafbffa9fc08a93fdc68e1e42411a14efcf23656e",
        //0xdD2FD4581271e230360230F9337D5c0430Bf44C0
        "0xde9be858da4a475276426320d5e9262ecfc3ba460bfac56360bfa6c4c28b4ee0",
        //0xbDA5747bFD65F08deb54cb465eB87D40e51B197E
        "0x689af8efa8c651a91ad287602527f3af2fe9f6501a7ac4b061667b5a93e037fd",
      ],
      verify: {
        //@todo not used now
        etherscan: {
          apiUrl: "https://beanex-devnet:8081/#",
          apiKey: process.env.ARBISCAN_API_KEY,
        },
      },
      blockGasLimit: 10_000_000,
      gasPrice: 900_000_000,
    },
    avalancheFuji: {
      url: getRpcUrl("avalancheFuji"),
      chainId: 43113,
      accounts: getEnvAccounts(),
      verify: {
        etherscan: {
          apiUrl: "https://api-testnet.snowtrace.io/",
          apiKey: process.env.SNOWTRACE_API_KEY,
        },
      },
      blockGasLimit: 2500000,
      // gasPrice: 50000000000,
    },
  },
  // hardhat-deploy has issues with some contracts
  // https://github.com/wighawag/hardhat-deploy/issues/264
  etherscan: {
    apiKey: {
      // hardhat-etherscan plugin uses "avalancheFujiTestnet" name
      arbitrumOne: process.env.ARBISCAN_API_KEY,
      avalanche: process.env.SNOWTRACE_API_KEY,
      arbitrumGoerli: process.env.ARBISCAN_API_KEY,
      avalancheFujiTestnet: process.env.SNOWTRACE_API_KEY,
    },
  },
  gasReporter: {
    enabled: process.env.REPORT_GAS ? true : false,
  },
  namedAccounts: {
    deployer: 0,
  },
  mocha: {
    timeout: 100000000,
  },
};

export default config;
