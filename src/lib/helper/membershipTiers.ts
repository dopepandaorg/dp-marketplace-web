import { DPANDAMembershipTier } from '$lib/constants/enums'
import CheckmarkOutline from 'carbon-icons-svelte/lib/CheckmarkOutline.svelte'
import CloseOutline from 'carbon-icons-svelte/lib/CloseOutline.svelte'
import PiggyBank from 'carbon-icons-svelte/lib/PiggyBank.svelte'

const tiers = [
	{ tier: DPANDAMembershipTier.T1, title: 'Plum', minAmount: 1 },
	{ tier: DPANDAMembershipTier.T2, title: 'Bamboo', minAmount: 125000 },
	{ tier: DPANDAMembershipTier.T3, title: 'Pine', minAmount: 500000 }
]

export const tiersFeatures = {}
tiersFeatures[DPANDAMembershipTier.T1] = [
	{ type: 'label', text: 'Access' },
	{ type: 'item', text: 'Minter', icon: CheckmarkOutline },
	{ type: 'item', text: 'Contest', icon: CheckmarkOutline },
	{ type: 'item', text: 'Platform', icon: CloseOutline, isDisabled: true },
	{ type: 'item', text: 'Priority Launchpad Accesss', icon: CloseOutline, isDisabled: true },
	{ type: 'label', text: 'Marketplace Fees' },
	{
		type: 'item',
		text: '3.5% sales fee',
		icon: PiggyBank,
		tooltip:
			'A platform fee for 3.5% of the sale amount will be charged for Escrow, Auction and Shuffle listings.'
	},
	{
		type: 'item',
		text: '0.5 ALGO listing fee',
		icon: PiggyBank,
		tooltip:
			'A flat listing fee of 0.5 ALGO will be charged for Escrow, Auction and Shuffle listings.'
	},
	{ type: 'label', text: 'Launchpad Fees' },
	{ type: 'item', text: '5% funding fee', icon: PiggyBank, tooltip: '' }
]
tiersFeatures[DPANDAMembershipTier.T2] = [
	{ type: 'label', text: 'Access' },
	{ type: 'item', text: 'Minter', icon: CheckmarkOutline },
	{ type: 'item', text: 'Contest', icon: CheckmarkOutline },
	{ type: 'item', text: 'Platform', icon: CheckmarkOutline },
	{ type: 'item', text: 'Priority Launchpad Accesss', icon: CloseOutline, isDisabled: true },
	{ type: 'label', text: 'Marketplace Fees' },
	{
		type: 'item',
		text: '2.5% sales fee',
		icon: PiggyBank,
		tooltip:
			'A platform fee for 2.5% of the sale amount will be charged for Escrow, Auction and Shuffle listings.'
	},
	{
		type: 'item',
		text: '0.25 ALGO listing fee',
		icon: PiggyBank,
		tooltip:
			'A flat listing fee of 0.25 ALGO will be charged for Escrow, Auction and Shuffle listings.'
	},
	{ type: 'label', text: 'Launchpad Fees' },
	{ type: 'item', text: '2.5% funding fee', icon: PiggyBank, tooltip: '' }
]
tiersFeatures[DPANDAMembershipTier.T3] = [
	{ type: 'label', text: 'Access' },
	{ type: 'item', text: 'Minter', icon: CheckmarkOutline },
	{ type: 'item', text: 'Contest', icon: CheckmarkOutline },
	{ type: 'item', text: 'Platform', icon: CheckmarkOutline },
	{ type: 'item', text: 'Priority Launchpad Accesss', icon: CheckmarkOutline },
	{ type: 'label', text: 'Marketplace Fees' },
	{
		type: 'item',
		text: '1.5% sales fee',
		icon: PiggyBank,
		tooltip:
			'A platform fee for 1.5% of the sale amount will be charged for Escrow, Auction and Shuffle listings.'
	},
	{
		type: 'item',
		text: 'No listing fee',
		icon: PiggyBank
	},
	{ type: 'label', text: 'Launchpad Fees' },
	{ type: 'item', text: '1.5% funding fee', icon: PiggyBank, tooltip: '' }
]

export const getMembershipTiers = () => {
	return tiers
}

export const getMembershipTierTitle = (tier: DPANDAMembershipTier) => {
	let title = `Tier #${tier.toString()}`

	const foundTier = tiers.find((t) => t.tier === tier)
	if (foundTier) {
		title = foundTier.title
	}

	return title
}

export const getMembershipTierMinAmount = (tier: DPANDAMembershipTier) => {
	let text = ``

	const foundTier = tiers.find((t) => t.tier === tier)
	if (foundTier) {
		text = `Hold ${Number(foundTier.minAmount).toLocaleString()}+ DPANDA`
	}

	return text
}
