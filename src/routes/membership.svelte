<script>
	import MembershipBanner from '$lib/components/membership/MembershipBanner.svelte'

	import MembershipFeatures from '$lib/components/membership/MembershipFeatures.svelte'
	import MembershipRewards from '$lib/components/membership/MembershipRewards.svelte'
	import MembershipTracker from '$lib/components/membership/MembershipTracker.svelte'
</script>

<svelte:head>
	<title>Membership | DopePanda</title>
</svelte:head>

<MembershipBanner
	title="DopePanda Membership"
	subtitle="Subscribe and avail exclusive benefits throughout the DopePanda ecosystem!"
	size="lg"
/>

<MembershipTracker />
<MembershipFeatures />
<MembershipRewards />
