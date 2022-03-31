import ImgixClient from '@imgix/js-core'

export const imgixClient = new ImgixClient({
	domain: 'dopepanda.imgix.net',
	secureURLToken: 'mXupzy495x27gHkT'
})

export const attachImgixProxy = (url: string) => {
	return imgixClient.buildURL(url, {
		w: 1024
	})
}
