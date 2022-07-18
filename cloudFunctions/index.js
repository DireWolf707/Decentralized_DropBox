//import Moralis from "moralis/types"

Moralis.Cloud.define("createNewUser", async (req) => {
  const logger = Moralis.Cloud.getLogger();
  logger.info("Creating New User!");
  logger.info(req.params);
  logger.info(req.user);
})
