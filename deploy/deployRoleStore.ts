import { grantRoleIfNotGranted } from "../utils/role";
import { createDeployFunction } from "../utils/deploy";

const func = createDeployFunction({
  contractName: "RoleStore",
  id: "RoleStore_3",
  afterDeploy: async ({ gmx }) => {
    const rolesConfig = await gmx.getRoles();
    // console.log(" --------> role store: " + JSON.stringify(rolesConfig));
    for (const { account, roles } of rolesConfig) {
      // console.log(" --------> account %s,  roles: %s", account, JSON.stringify(roles));
      if (roles !== undefined) {
        for (const role of roles) {
          await grantRoleIfNotGranted(account, role);
        }
      }
    }
  },
});

func.dependencies = func.dependencies.concat(["FundAccounts"]);

export default func;
