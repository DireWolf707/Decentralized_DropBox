import { useMoralis } from "react-moralis"
import { Web3Storage } from "web3.storage"
import { useMoralisCloudFunction } from "react-moralis"

export const createNewFile = () => {
  const { user } = useMoralis()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("createNewFile", {}, { autoFetch: false })

  const uploadToWeb3Storage = async (file) => {
    const storageAPI = user.attributes.storageAPI
    const storageClient = new Web3Storage({ token: storageAPI })

    const onRootCidReady = (cid) => {
      console.log("uploading files with cid:", cid)
    }

    const totalSize = file.size
    let uploaded = 0
    const onStoredChunk = (size) => {
      uploaded += size
      const pct = parseInt(100 * (uploaded / totalSize))
      console.log(`Uploading... ${pct}% complete`)
    }

    const cid = await storageClient.put([file], { wrapWithDirectory: false, onRootCidReady, onStoredChunk })
    return cid
  }

  const addFile = async (file, parentId) => {
    const cid = await uploadToWeb3Storage(file)
    const fileMetaData = {
      cid,
      name: file.name,
      size: file.size,
      type: file.type,
    }
    await fetch({
      onSuccess: () => console.log("file added"),
      onError: (err) => console.log(err),
      params: { fileMetaData, parentId },
    })
  }

  return { addFile, loading: isLoading || isFetching }
}
