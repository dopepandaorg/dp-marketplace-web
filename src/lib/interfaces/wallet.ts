export enum WalletType {
	PERA = 'pera',
	MYALGO = 'myalgo'
}

export enum WalletStatus {
	NONE = 'none',
	CONNECTING = 'connecting',
	CONNECTED = 'connected'
}

export interface SignedTxn {
	txID: string
	blob: Uint8Array
}
