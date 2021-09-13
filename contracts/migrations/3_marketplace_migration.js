const RarissimoMarketContract = artifacts.require("RarissimoMarketContract");

module.exports = function (deployer) {
  deployer.deploy(RarissimoMarketContract);
};
