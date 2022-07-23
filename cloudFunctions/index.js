//import Moralis from "moralis/types"

const validationRules = (req) => {
  if (!req.user || req.user.attributes.rootFolder) throw "Unauthorized"
  if (!req.params.storageAPI || !req.params.username) throw "Params incomplete"
}

Moralis.Cloud.define(
  "createNewUser",
  async (req) => {
    const logger = Moralis.Cloud.getLogger()

    logger.info("Creating Root Folder!")
    const Folder = Moralis.Object.extend("Folder")
    const rootFolder = new Folder()
    rootFolder.set("name", "root")
    rootFolder.set("ancestors", [])
    rootFolder.set("parent", null)
    rootFolder.set("user", req.user.id)
    await rootFolder.save()
    logger.info("Root folder created!")

    logger.info("Updating new user!")
    const user = req.user
    const { username, storageAPI } = req.params
    user.setUsername(username)
    user.set("storageAPI", storageAPI)
    user.set("rootFolderId", rootFolder.id)
    await user.save(null, { useMasterKey: true })
    logger.info("New user updated!")
  },
  validationRules
)

Moralis.Cloud.define(
  "createNewFolder",
  async (req) => {
    const logger = Moralis.Cloud.getLogger()
    const { name, parentId } = req.params

    logger.info("Creating new Folder!")
    const Folder = Moralis.Object.extend("Folder")
    // getting parent folder from id (to check if user really owner of the folder)
    const parentQuery = new Moralis.Query(Folder)
    parentQuery.equalTo("objectId", parentId)
    parentQuery.equalTo("user", req.user.id)
    parentQuery.select("ancestors")
    const parentFolder = (await parentQuery.find())[0]
    // creating folder
    const folder = new Folder()
    folder.set("name", name)
    folder.set("parent", parentFolder.id) // same as parentId
    folder.set("ancestors", [...parentFolder.attributes.ancestors, parentFolder.id])
    folder.set("user", req.user.id)
    await folder.save()
    logger.info("New folder created!")
  },
  {
    fields: ["name", "parentId"],
    requireUser: true,
  }
)

Moralis.Cloud.define(
  "createNewFile",
  async (req) => {
    const logger = Moralis.Cloud.getLogger()
    const { fileMetaData, parentId } = req.params

    logger.info("Creating new File!")
    // getting parent folder from id (to check if user really owner of the folder)
    const parentQuery = new Moralis.Query("Folder")
    parentQuery.equalTo("objectId", parentId)
    parentQuery.equalTo("user", req.user.id)
    parentQuery.select("name")
    const parentFolder = (await parentQuery.find())[0]
    // creating file
    const File = Moralis.Object.extend("File")
    const file = new File()
    file.set("name", fileMetaData.name)
    file.set("type", fileMetaData.type)
    file.set("size", fileMetaData.size)
    file.set("cid", fileMetaData.cid)
    file.set("favourite", false)
    file.set("parent", parentFolder.id) // same as parentId
    file.set("user", req.user.id)
    await file.save()
    logger.info("New file created!")
  },
  {
    fields: ["fileMetaData", "parentId"],
    requireUser: true,
  }
)

Moralis.Cloud.define(
  "getContent",
  async (req) => {
    const logger = Moralis.Cloud.getLogger()
    let { folderId } = req.params

    logger.info("Fetching content!")
    const query = new Moralis.Query("Folder")
    const res = await query.aggregate([
      // get current folder from folder id
      { match: { _id: folderId, user: req.user.id } },
      // unwind ancestors before fetching
      {
        unwind: {
          path: "$ancestors",
          preserveNullAndEmptyArrays: true, // for root folder array will be empty
        },
      },
      // get each ancestors (returned as array)
      {
        lookup: {
          from: "Folder",
          localField: "ancestors",
          foreignField: "_id",
          as: "ancestors",
        },
      },
      // select required fields in ancestors
      {
        project: {
          "ancestors._id": 1,
          "ancestors.name": 1,
          user: 1,
          parent: 1,
          name: 1,
          createdAt: 1,
          updatedAt: 1,
        },
      },
      // unwind ancestors again
      {
        unwind: {
          path: "$ancestors",
          preserveNullAndEmptyArrays: true, // for root folder array will be empty
        },
      },
      // group on objectId (merge all ancestors)
      {
        group: {
          objectId: "$_id",
          ancestors: { $push: "$ancestors" },
          user: { $first: "$user" },
          parent: { $first: "$parent" },
          createdAt: { $first: "$createdAt" },
          updatedAt: { $first: "$updatedAt" },
          name: { $first: "$name" },
        },
      },
      // get folders inside current folder
      {
        lookup: {
          from: "Folder",
          localField: "_id",
          foreignField: "parent",
          as: "folders",
        },
      },
    ])
    logger.info("Fetching done!")
    return res[0]
  },
  {
    fields: ["folderId"],
    requireUser: true,
  }
)
