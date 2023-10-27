import { HardhatRuntimeEnvironment } from "hardhat/types";

export type RolesConfig = {
  account: string;
  label?: string;
  roles?: string[];
  rolesToRemove?: string[];
}[];

export default async function (hre: HardhatRuntimeEnvironment): Promise<RolesConfig> {
  const { deployer } = await hre.getNamedAccounts();

  const getMainnetRoles = ({ multisigAccount }) => {
    return [
      {
        account: "0xe7bfff2ab721264887230037940490351700a068",
        roles: ["CONTROLLER", "MARKET_KEEPER"],
      },
      {
        account: "0x43ce1d475e06c65dd879f4ec644b8e0e10ff2b6d",
        roles: ["FEE_KEEPER"],
      },
      {
        account: "0xF09d66CF7dEBcdEbf965F1Ac6527E1Aa5D47A745",
        roles: ["CONFIG_KEEPER"],
      },
      {
        account: "0x0765678B4f2B45fa9604264a63762E2fE460df64",
        roles: ["CONFIG_KEEPER", "MARKET_KEEPER"],
      },
      {
        account: "0x35ea3066F90Db13e737BBd41f1ED7B4bfF8323b3",
        roles: ["TIMELOCK_ADMIN"],
      },
      {
        account: multisigAccount,
        roles: ["CONFIG_KEEPER", "TIMELOCK_ADMIN", "TIMELOCK_MULTISIG"],
      },
      {
        account: "0xE47b36382DC50b90bCF6176Ddb159C4b9333A7AB",
        roles: ["ORDER_KEEPER", "ADL_KEEPER", "LIQUIDATION_KEEPER", "FROZEN_ORDER_KEEPER"],
      },
      {
        account: "0xC539cB358a58aC67185BaAD4d5E3f7fCfc903700",
        roles: ["ORDER_KEEPER", "ADL_KEEPER", "LIQUIDATION_KEEPER", "FROZEN_ORDER_KEEPER"],
      },
      {
        account: "0xf1e1B2F4796d984CCb8485d43db0c64B83C1FA6d",
        roles: ["ORDER_KEEPER", "ADL_KEEPER", "LIQUIDATION_KEEPER", "FROZEN_ORDER_KEEPER"],
      },
    ];
  };

  const config: {
    [network: string]: RolesConfig;
  } = {
    hardhat: [
      {
        account: deployer,
        roles: [
          "CONTROLLER",
          "ORDER_KEEPER",
          "ADL_KEEPER",
          "LIQUIDATION_KEEPER",
          "MARKET_KEEPER",
          "FROZEN_ORDER_KEEPER",
        ],
      },
    ],
    arbitrum: [
      ...getMainnetRoles({ multisigAccount: "0x4b6ACC5b2db1757bD49408FeE92e32D39608B5d9" }),

      {
        rolesToRemove: ["CONTROLLER"],
        account: "0xE7BfFf2aB721264887230037940490351700a068",
      },
      {
        rolesToRemove: ["MARKET_KEEPER"],
        account: "0xE7BfFf2aB721264887230037940490351700a068",
      },

      {
        roles: ["ORDER_KEEPER"],
        account: "0x5051fd154320584c9cc2071aed772656e8fcd855",
        label: "Chainlink market order keeper",
      },
      {
        roles: ["ORDER_KEEPER"],
        account: "0xe0886d9baaad385f37d460a4ec7b32b79a3731e0",
        label: "Chainlink deposit keeper",
      },
      {
        roles: ["ORDER_KEEPER"],
        account: "0x49d30b3035c647bf57f3845da287bd84d80bda2c",
        label: "Chainlink withdrawal keeper",
      },
    ],
    avalanche: [
      ...getMainnetRoles({ multisigAccount: "0x15F9eBC71c539926B8f652a534d29B4Af57CaD55" }),
      {
        rolesToRemove: ["CONTROLLER"],
        account: "0xE7BfFf2aB721264887230037940490351700a068",
      },
      {
        rolesToRemove: ["MARKET_KEEPER"],
        account: "0xE7BfFf2aB721264887230037940490351700a068",
      },
    ],
    arbitrumGoerli: [
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        roles: [
          "CONTROLLER",
          "ORDER_KEEPER",
          "ADL_KEEPER",
          "LIQUIDATION_KEEPER",
          "MARKET_KEEPER",
          "FROZEN_ORDER_KEEPER",
        ],
      },
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        roles: [
          "CONTROLLER",
          "ORDER_KEEPER",
          "ADL_KEEPER",
          "LIQUIDATION_KEEPER",
          "MARKET_KEEPER",
          "FROZEN_ORDER_KEEPER",
        ],
      },
      {
        // Chainlink order executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        rolesToRemove: ["ORDER_KEEPER"],
      },
      {
        // Chainlink deposit executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        rolesToRemove: ["ORDER_KEEPER"],
      },
      {
        // Chainlink withdrawal executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        rolesToRemove: ["ORDER_KEEPER"],
      },

      // new
      {
        // Chainlink order executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink market orders keeper",
        rolesToRemove: ["ORDER_KEEPER"],
      },
      {
        // Chainlink deposit executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink deposits keeper",
        rolesToRemove: ["ORDER_KEEPER"],
      },
      {
        // Chainlink withdrawal executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink withdrawals keeper",
        rolesToRemove: ["ORDER_KEEPER"],
      },

      // delist old handlers
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "deposit handler A",
        roles: ["CONTROLLER"],
      },
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "order handler A",
        roles: ["CONTROLLER"],
      },
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "withdrawal handler A",
        roles: ["CONTROLLER"],
      },

      {
        // Chainlink order executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink market orders keeper B",
        roles: ["ORDER_KEEPER"],
      },
      {
        // Chainlink deposit executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink deposits keeper B",
        roles: ["ORDER_KEEPER"],
      },
      {
        // Chainlink withdrawal executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink withdrawals keeper B",
        roles: ["ORDER_KEEPER"],
      },

      {
        // Chainlink order executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink market orders keeper C",
        roles: ["ORDER_KEEPER"],
      },
      {
        // Chainlink deposit executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink deposits keeper C",
        roles: ["ORDER_KEEPER"],
      },
      {
        // Chainlink withdrawal executor
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink withdrawals keeper C",
        roles: ["ORDER_KEEPER"],
      },

      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink keeper D",
        roles: ["ORDER_KEEPER"],
      },

      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink deposits keeper E",
        roles: ["ORDER_KEEPER"],
      },

      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        label: "chainlink withdrawals keeper E",
        roles: ["ORDER_KEEPER"],
      },
    ],
    avalancheFuji: [
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        roles: [
          "CONTROLLER",
          "ORDER_KEEPER",
          "ADL_KEEPER",
          "LIQUIDATION_KEEPER",
          "MARKET_KEEPER",
          "FROZEN_ORDER_KEEPER",
        ],
      },
      {
        account: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199",
        roles: [
          "CONTROLLER",
          "ORDER_KEEPER",
          "ADL_KEEPER",
          "LIQUIDATION_KEEPER",
          "MARKET_KEEPER",
          "FROZEN_ORDER_KEEPER",
        ],
      },
    ],
  };

  return config[hre.network.name];
}
