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
