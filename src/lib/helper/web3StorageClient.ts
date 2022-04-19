import { Web3Storage } from 'web3.storage'
import { WEB3_STORAGE_TOKEN } from '$lib/variables'

/**
 * Helper function to upload an image to IPFS
 *
 * @param file File object to upload to IPFS
 * @returns IPFS CID
 */
export const upload = (file: File) => {
	return new Promise<string>((resolve, reject) => {
		const token = WEB3_STORAGE_TOKEN
		const storage = new Web3Storage({ token })

		try {
			storage
				.put([file], {
					wrapWithDirectory: false
				})
				.then((cid) => resolve(cid))
				.catch((error) => reject(error))
		} catch (error) {
			reject(error)
		}
	})
}
