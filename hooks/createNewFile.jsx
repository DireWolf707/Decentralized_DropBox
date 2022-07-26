import { useMoralis } from "react-moralis"
import { Web3Storage } from "web3.storage"
import { useMoralisCloudFunction } from "react-moralis"
import { useNotification } from "web3uikit"

export const createNewFile = () => {
  const dispatch = useNotification()
  const { user } = useMoralis()
  const { fetch, isLoading, isFetching } = useMoralisCloudFunction("createNewFile", {}, { autoFetch: false })

  const uploadToWeb3Storage = async (file) => {
    const storageAPI = user.attributes.storageAPI
    const storageClient = new Web3Storage({ token: storageAPI })

    const onRootCidReady = (cid) =>
      dispatch({
        type: "info",
        message: `Upload started: ${file.name}`,
        title: "Info !",
        position: "topR",
      })

    const totalSize = file.size
    let uploaded = 0
    const onStoredChunk = (size) => {
      uploaded += size
      const pct = parseInt(100 * (uploaded / totalSize))
      dispatch({
        type: "info",
        message: `Uploading ${file.name}: ${pct}% complete`,
        title: "Info !",
        position: "topR",
      })
    }

    const cid = await storageClient.put([file], { wrapWithDirectory: false, onRootCidReady, onStoredChunk })
    return cid
  }

  const addFile = async (file, parentId) => {
    // check if file exists
    if (!file)
      return dispatch({
        type: "warning",
        message: "No file selected",
        title: "Warning !",
        position: "topR",
      })
    try {
      // uploading file to ipfs/filecoin and getting back cid
      const cid = await uploadToWeb3Storage(file)
      // constructing file metadata
      const fileMetaData = {
        cid,
        name: file.name,
        size: file.size,
        type: file.type,
      }
      // saving metadata on db
      await fetch({
        onSuccess: () =>
          dispatch({
            type: "success",
            message: "File uploaded successfully",
            title: "Success !",
            position: "topR",
          }),
        onError: (err) =>
          dispatch({
            type: "error",
            message: "Something went wrong",
            title: "Error !",
            position: "topR",
          }),
        params: { fileMetaData, parentId },
      })
    } catch (err) {
      dispatch({
        type: "error",
        message: "Something went wrong",
        title: "Error !",
        position: "topR",
      })
    }
  }

  return { addFile, loading: isLoading || isFetching }
}
