export interface ToastRecord {
	id?: number
	kind: 'error' | 'info' | 'info-square' | 'success' | 'warning' | 'warning-alt'
	title: string
	subtitle?: string
	caption?: string
	dismissible?: boolean
	timeout?: number
}
