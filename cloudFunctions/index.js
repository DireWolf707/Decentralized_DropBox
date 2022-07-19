//import Moralis from "moralis/types"

const validationRules = (req) => {
  if (!req.user || req.user.attributes.storageAPI) throw "Unauthorized"
  if (!req.params.storageAPI || !req.params.username) throw "Params incomplete"
}

Moralis.Cloud.define(
  "createNewUser",
  async (req) => {
    const logger = Moralis.Cloud.getLogger()

    logger.info("Updating new user!")
    const user = req.user
    const { username, storageAPI } = req.params
    user.setUsername(username)
    user.set("storageAPI", storageAPI)
    await user.save(null, { useMasterKey: true })
    logger.info("New user updated!")

    logger.info("Creating Root Folder!")
    const Folder = Moralis.Object.extend("Folder")
    const rootFolder = new Folder()
    rootFolder.set("name", "root")
    rootFolder.set("ancestors", [])
    rootFolder.set("parent", null)
    rootFolder.set("user", req.user)
    await rootFolder.save()
    logger.info("Root folder created!")
  },
  validationRules
)
