export const getGetOrdinal = (n: number): string => {
	const s = ['th', 'st', 'nd', 'rd'],
		v = n % 100
	return n + (s[(v - 20) % 10] || s[v] || s[0])
}

export const nWeightFormat = (n: number, digits?: number) => {
	const lookup = [
		{ value: 1, symbol: '' },
		{ value: 1e3, symbol: 'k' },
		{ value: 1e6, symbol: 'M' },
		{ value: 1e9, symbol: 'G' },
		{ value: 1e12, symbol: 'T' },
		{ value: 1e15, symbol: 'P' },
		{ value: 1e18, symbol: 'E' }
	]
	const rx = /\.0+$|(\.[0-9]*[1-9])0+$/
	const item = lookup
		.slice()
		.reverse()
		.find(function (item) {
			return n >= item.value
		})
	return item ? (n / item.value).toFixed(digits).replace(rx, '$1') + item.symbol : '0'
}

export const formatPercentage = (n: number) => {
	return !!n ? Number(n * 100).toFixed(2) + '%' : `0%`
}

export const slugify = (text: string) => {
	return text.replace(/ /g, '_').replace(/[^\w-]+/g, '')
}

export const unSlugify = (text: string) => {
	return text.replace(/_/g, ' ')
}

export const checkValidUUID = (s: string) => {
	const regexExp =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi
	return regexExp.test(s)
}
