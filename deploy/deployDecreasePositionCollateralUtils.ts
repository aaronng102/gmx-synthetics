import { createDeployFunction } from "../utils/deploy";

const func = createDeployFunction({
  contractName: "DecreasePositionCollateralUtils",
  libraryNames: ["MarketEventUtils", "PositionUtils"],
});

export default func;
