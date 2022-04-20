export enum WalletType {
	PERA = 'pera',
	MYALGO = 'myalgo'
}

export interface SignedTxn {
	txID: string
	blob: Uint8Array
}
