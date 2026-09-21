<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button, Input } from '$components/ui';

	import type { ActionData } from './$types';
	import FormHeader from '$components/signup/form-header.svelte';
	import FormOrbs from '$components/signup/form-orbs.svelte';
	import ErrorMsg from '$components/signup/error-msg.svelte';

	let { form }: { form: ActionData } = $props();
	let showPassword = $state(false);
	let loading = $state(false);
	let password = $state('');
	let confirmPassword = $state('');

	let timeoutId: NodeJS.Timeout | undefined;

	$effect(() => {
		if (form?.success) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				goto('/dashboard');
			}, 2000);
		}

		if (form?.message) {
			console.log(form?.message);
		}
	});

	function calcStrength(pwd: string): number {
		if (!pwd) return 0;
		let s = 0;
		if (pwd.length >= 8) s++;
		if (/[A-Z]/.test(pwd)) s++;
		if (/\d/.test(pwd)) s++;
		if (/[^a-zA-Z0-9]/.test(pwd)) s++;
		return s;
	}

	const strength = $derived(calcStrength(password));
	const strengthLabel = $derived(['', 'Weak', 'Fair', 'Good', 'Strong'][strength]);
	const strengthColor = $derived(
		['', 'var(--nova-500)', 'var(--solar-500)', 'var(--orbit-400)', 'var(--aurora-400)'][strength]
	);
	const passwordMatch = $derived(confirmPassword.length > 0 && password === confirmPassword);
	const passwordMismatch = $derived(confirmPassword.length > 0 && password !== confirmPassword);
</script>

<div
	class="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-8"
	style="background:var(--grad-page)"
>
	<FormOrbs />

	<!-- card -->
	<main
		class="relative w-full max-w-110 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.09)] p-11"
		style="background:rgba(255,255,255,0.036);backdrop-filter:blur(56px) saturate(180%);-webkit-backdrop-filter:blur(56px) saturate(180%);box-shadow:0 28px 88px rgba(0,0,0,0.62),0 0 0 1px rgba(255,255,255,0.03) inset"
	>
		<FormHeader />

		<!-- error alert -->
		{#if form?.message}
			<ErrorMsg message={form.message} />
		{/if}

		<!-- form -->
		<form
			method="POST"
			class="flex flex-col gap-4"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<!-- name -->
			<Input
				name="name"
				type="text"
				label="Full name"
				placeholder="Jane Smith"
				autocomplete="name"
				required
				size="lg"
			>
				{#snippet iconLeft()}
					<svg viewBox="0 0 20 20" fill="none" class="h-[15px] w-[15px]">
						<circle cx="10" cy="7" r="3.5" stroke="currentColor" stroke-width="1.4" />
						<path
							d="M2.5 17c0-3.038 3.358-5.5 7.5-5.5s7.5 2.462 7.5 5.5"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
						/>
					</svg>
				{/snippet}
			</Input>

			<!-- email -->
			<Input
				name="email"
				type="email"
				label="Email address"
				placeholder="you@example.com"
				autocomplete="email"
				required
				size="lg"
			>
				{#snippet iconLeft()}
					<svg viewBox="0 0 20 20" fill="none" class="h-[15px] w-[15px]">
						<path
							d="M2.5 6.5l7.5 5 7.5-5M3 5h14a.5.5 0 01.5.5v9a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-9A.5.5 0 013 5z"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				{/snippet}
			</Input>

			<!-- password -->
			<div class="flex flex-col gap-[7px]">
				<Input
					name="password"
					type={showPassword ? 'text' : 'password'}
					label="Password"
					placeholder="Create a strong password"
					autocomplete="new-password"
					required
					bind:value={password}
					size="lg"
				>
					{#snippet iconLeft()}
						<svg viewBox="0 0 20 20" fill="none" class="h-[15px] w-[15px]">
							<rect
								x="3.5"
								y="9"
								width="13"
								height="9"
								rx="1.5"
								stroke="currentColor"
								stroke-width="1.4"
							/>
							<path
								d="M7 9V7a3 3 0 016 0v2"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
							/>
						</svg>
					{/snippet}
					{#snippet iconRight()}
						<button
							type="button"
							onclick={() => (showPassword = !showPassword)}
							aria-label={showPassword ? 'Hide password' : 'Show password'}
							class="pointer-events-auto flex h-12 w-[38px] cursor-pointer items-center justify-center border-none bg-transparent text-(--text-tertiary) transition-colors duration-[210ms] hover:text-(--text-secondary)"
						>
							{#if showPassword}
								<svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
									<path
										d="M17.5 10S15 15 10 15 2.5 10 2.5 10 5 5 10 5s7.5 5 7.5 5z"
										stroke="currentColor"
										stroke-width="1.4"
										stroke-linecap="round"
									/>
									<circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.4" />
									<path
										d="M3 3l14 14"
										stroke="currentColor"
										stroke-width="1.4"
										stroke-linecap="round"
									/>
								</svg>
							{:else}
								<svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
									<path
										d="M17.5 10S15 15 10 15 2.5 10 2.5 10 5 5 10 5s7.5 5 7.5 5z"
										stroke="currentColor"
										stroke-width="1.4"
										stroke-linecap="round"
									/>
									<circle cx="10" cy="10" r="2" stroke="currentColor" stroke-width="1.4" />
								</svg>
							{/if}
						</button>
					{/snippet}
				</Input>

				<!-- strength meter -->
				{#if password.length > 0}
					<div class="flex items-center gap-2.5">
						<div class="flex flex-1 gap-1">
							{#each [1, 2, 3, 4] as level}
								<div
									class="h-[3px] flex-1 rounded-full transition-[background] duration-[200ms]"
									style:background={strength >= level ? strengthColor : 'var(--glass-3)'}
								></div>
							{/each}
						</div>
						<span
							class="min-w-[36px] text-right text-[11px] font-semibold transition-colors duration-[200ms]"
							style:color={strengthColor}
						>
							{strengthLabel}
						</span>
					</div>
				{/if}
			</div>

			<!-- confirm password -->
			<div class="flex flex-col gap-0">
				<Input
					type="password"
					label="Confirm password"
					placeholder="Repeat your password"
					autocomplete="new-password"
					bind:value={confirmPassword}
					error={passwordMismatch ? "Passwords don't match" : ''}
					size="lg"
				>
					{#snippet iconLeft()}
						{#if passwordMatch}
							<svg viewBox="0 0 20 20" fill="none" class="h-[15px] w-[15px]">
								<circle cx="10" cy="10" r="7.5" stroke="var(--aurora-400)" stroke-width="1.4" />
								<path
									d="M7 10l2 2 4-4"
									stroke="var(--aurora-400)"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						{:else}
							<svg viewBox="0 0 20 20" fill="none" class="h-[15px] w-[15px] text-(--text-tertiary)">
								<rect
									x="3.5"
									y="9"
									width="13"
									height="9"
									rx="1.5"
									stroke="currentColor"
									stroke-width="1.4"
								/>
								<path
									d="M7 9V7a3 3 0 016 0v2"
									stroke="currentColor"
									stroke-width="1.4"
									stroke-linecap="round"
								/>
							</svg>
						{/if}
					{/snippet}
				</Input>
				{#if passwordMatch}
					<span class="mt-1.5 text-[12px]" style="color:var(--aurora-400)">Passwords match</span>
				{/if}
			</div>

			<!-- submit -->
			<div class="mt-1">
				<Button
					type="submit"
					variant="primary"
					size="xl"
					{loading}
					disabled={passwordMismatch}
					class="w-full"
				>
					{form?.success ? 'Logging In...' : 'Create account'}
				</Button>
			</div>

			<p class="m-0 text-center text-[12px] leading-relaxed text-[var(--text-muted)]">
				By signing up you agree to our
				<a
					href="/terms"
					class="text-[var(--text-tertiary)] no-underline transition-colors duration-[210ms] hover:text-[var(--iris-400)]"
					>Terms of Service</a
				>
				and
				<a
					href="/privacy"
					class="text-[var(--text-tertiary)] no-underline transition-colors duration-[210ms] hover:text-[var(--iris-400)]"
					>Privacy Policy</a
				>.
			</p>
		</form>

		<!-- divider -->
		<div class="my-7 flex items-center gap-3 text-[12px] text-[var(--text-muted)]">
			<div class="h-px flex-1 bg-[var(--border-subtle)]"></div>
			<span>Already have an account?</span>
			<div class="h-px flex-1 bg-[var(--border-subtle)]"></div>
		</div>

		<!-- CTA -->
		<a
			href="/login"
			class="flex items-center justify-center gap-1.5 rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--glass-1)] p-3 text-sm font-medium text-[var(--text-secondary)] no-underline transition-[color,background-color,border-color] duration-[210ms] hover:border-[rgba(99,102,241,0.25)] hover:bg-[rgba(99,102,241,0.06)] hover:text-[var(--iris-300)]"
		>
			Sign in instead
			<svg viewBox="0 0 16 16" fill="none" class="h-[14px] w-[14px]" aria-hidden="true">
				<path
					d="M3 8h10M9 4l4 4-4 4"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</a>
	</main>
</div>
