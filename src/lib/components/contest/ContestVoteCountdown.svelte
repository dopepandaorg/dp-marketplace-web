<script lang="ts">
	import { onMount } from 'svelte'

	let countdownDays = '00'
	let countdownHours = '00'
	let countdownMinutes = '00'
	let countdownSeconds = '00'

	const seconds = 1000
	const minutes = seconds * 60
	const hours = minutes * 60
	const days = hours * 24

	export let end

	onMount(() => {
		const tick = () => {
			const now = new Date().getTime()
			const difference = end - now

			if (difference < 0) {
				clearInterval(interval)
				countdownDays = '00'
				countdownHours = '00'
				countdownMinutes = '00'
				countdownSeconds = '00'
				return
			}

			countdownDays = String(Math.floor(difference / days)).padStart(2, '0')
			countdownHours = String(Math.floor((difference % days) / hours)).padStart(2, '0')
			countdownMinutes = String(Math.floor((difference % hours) / minutes)).padStart(2, '0')
			countdownSeconds = String(Math.floor((difference % minutes) / seconds)).padStart(2, '0')
		}

		const interval = setInterval(tick, 1000)
		tick()
	})
</script>

<div class="countdown-wrap">
	<div class="countdown__label">Voting starts in</div>
	<div class="countdown">
		<div class="countdown-item">{countdownDays} <span>Days</span></div>
		<div class="countdown-item">{countdownHours} <span>Hours</span></div>
		<div class="countdown-item">{countdownMinutes} <span>Minutes</span></div>
		<div class="countdown-item">{countdownSeconds} <span>Seconds</span></div>
	</div>
</div>

<style lang="scss">
	.countdown-wrap {
		display: flex;
		flex-direction: column;

		background-color: #00000073;
		padding: 0.875rem 2rem;
		margin-top: 1.25rem;
		border-radius: 10px;
		width: 100%;
	}

	.countdown__label {
		margin-bottom: 1.25rem;
		text-align: center;
		opacity: 0.75;
	}

	.countdown {
		font-size: 1.125rem;
		letter-spacing: 1px;
		line-height: 1;

		color: #fff;
		float: left;

		display: flex;
		justify-content: space-between;
	}

	.countdown-item {
		flex: 1;
		text-align: center;
		padding: 0 0.5rem;

		span {
			font-size: 0.5rem;
			text-transform: uppercase;
			margin-top: 0.75rem;
			display: block;
			opacity: 0.65;
		}
	}
</style>
