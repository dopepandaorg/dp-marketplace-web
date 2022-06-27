<script>
	import { ImageLoader } from 'carbon-components-svelte'
	import LogoTwitter from 'carbon-icons-svelte/lib/LogoTwitter.svelte'
	import LogoDiscord from 'carbon-icons-svelte/lib/LogoDiscord.svelte'
	import MailAll from 'carbon-icons-svelte/lib/MailAll.svelte'
	import ToastNotifications from './common/ToastNotifications.svelte'
</script>

<footer>
	<div class="footer__top">
		<div class="container">
			<div class="footer__inner">
				<div class="footer__explore">
					<h4>Explore more from Dopeverse</h4>
					<div class="footer__explore__hotlinks">
						<div id="hotlink-staking" class="footer__explore__hotlink">
							<a
								href="https://dopepanda.medium.com/moving-away-from-lp-competition-stake-your-algo-dpanda-lp-tokens-with-algostake-801557fb7caa"
								target="_blank"
							>
								<div class="footer__explore__hotlink__image">
									<ImageLoader src="/images/staking-hotlink-graphic.png" />
								</div>
							</a>
							<label for="hotlink-staking">Liquidity Staking</label>
						</div>
						<div id="hotlink-games" class="footer__explore__hotlink">
							<a href="https://dopepanda.org/#nft" target="_blank">
								<div class="footer__explore__hotlink__image">
									<ImageLoader src="/images/nft-hotlink-graphic.png" />
								</div>
							</a>
							<label for="hotlink-games">Panda NFTs</label>
						</div>
					</div>
				</div>
				<div class="footer__connect">
					<div class="footer__social">
						<h4>Join our <span class="gradient-highlight">AWESOME!</span> community</h4>
						<ul>
							<li>
								<a href="https://twitter.com/DopePandaOrg" target="_blank" rel="nofollow"
									><LogoTwitter /></a
								>
							</li>
							<li>
								<a href="https://discord.gg/KMsyYaQC" target="_blank" rel="nofollow"
									><LogoDiscord /></a
								>
							</li>
							<li>
								<a href="mailto:team@dopepanda.org" target="_blank" rel="nofollow"><MailAll /></a>
							</li>
						</ul>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="footer__bottom">
		<div class="container">
			<div class="footer__inner">
				<div class="footer__copyright">
					© DopePanda {new Date().getFullYear()}, All Rights Reserved
				</div>
			</div>
		</div>
	</div>

	<ToastNotifications />
</footer>

<style lang="scss">
	footer {
		.footer__inner {
			display: flex;
			flex-direction: column;
			padding: 0 1rem;

			@media screen and (min-width: 768px) {
				flex-direction: row;
			}

			h4 {
				margin-bottom: 1rem;
			}
		}

		.footer__top {
			background-color: var(--dp--black-01);
			padding: 6.25rem 0 4.5rem;

			.footer__inner {
				display: grid;
				grid-template-columns: 1fr;
				gap: 2rem;

				@media screen and (min-width: 768px) {
					grid-template-columns: 1fr 1fr;
					gap: 200px;
				}
			}
		}

		.footer__bottom {
			padding: 2rem 0;
			background-color: var(--dp--black-02);

			.footer__inner {
				display: flex;
				justify-content: space-between;
			}
		}

		// .footer__privacy_menu,
		// .footer__copyright {
		// 	font-size: 0.875rem;

		// 	@media screen and (max-width: 767px) {
		// 		margin-bottom: 1rem;
		// 		text-align: center;
		// 	}

		// 	&,
		// 	a {
		// 		color: rgba($color: white, $alpha: 0.75);
		// 	}
		// }

		// .footer__privacy_menu {
		// 	ul {
		// 		display: flex;
		// 		list-style: none;

		// 		@media screen and (max-width: 767px) {
		// 			flex-direction: column;
		// 			align-items: center;
		// 		}

		// 		li {
		// 			margin-top: 1rem;

		// 			@media screen and (min-width: 768px) {
		// 				margin-left: 1.5rem;
		// 				margin-top: 0;
		// 			}

		// 			&:first-child {
		// 				margin-left: 0;
		// 			}
		// 		}
		// 	}
		// }

		.footer__explore__hotlinks {
			display: grid;
			grid-template-columns: 1fr;
			gap: 1rem;

			@media screen and (min-width: 768px) {
				grid-template-columns: 1fr 1fr;
				gap: 1rem;
			}
		}

		.footer__explore__hotlink {
			&__image {
				width: 100%;
				height: 120px;
				background: linear-gradient(109.08deg, #fd9d5d 0%, #fd2ca0 49.53%, #3397ff 104.51%);
				margin-bottom: 1rem;
				border-radius: 8px;
				overflow: hidden;
				padding: 2px;

				:global(img) {
					max-width: 100%;
					height: 100%;
					object-fit: cover;
					border-radius: 8px;
					transition: transform 0.125s;
				}

				&:hover {
					:global(img) {
						transform: scale(1.05);
					}
				}
			}
		}

		.footer__social {
			ul {
				display: flex;

				li {
					margin-right: 1rem;

					&:last-child {
						margin-right: 0;
					}

					a {
						display: flex;
						align-items: center;
						justify-content: center;
						width: 2.75rem;
						height: 2.75rem;
						border-radius: 50%;
						background-color: var(--dp--black-03);
						transition: background-color 0.3s;

						@media screen and (min-width: 768px) {
							width: 3.75rem;
							height: 3.75rem;
						}

						&:hover {
							background-color: var(--dp--black-06);
						}
					}

					:global(svg) {
						width: 24px;
						height: 24px;
						float: left;

						@media screen and (min-width: 768px) {
							width: 32px;
							height: 32px;
						}
					}
				}
			}
		}
	}
</style>
