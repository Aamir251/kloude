<script lang="ts">
	import { enhance } from '$app/forms';
	import { goto } from '$app/navigation';
	import { Button } from '$components/ui';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let showPassword = $state(false);
	let loading = $state(false);

	let timeoutId: NodeJS.Timeout | undefined;

	$effect(() => {
		if (form?.success) {
			clearTimeout(timeoutId);
			timeoutId = setTimeout(() => {
				goto('/dashboard');
			}, 2000);
		}
	});
</script>

<div
	class="relative flex min-h-dvh items-center justify-center overflow-hidden p-6"
	style="background:var(--grad-page)"
>
	<!-- ambient orbs -->
	<div
		class="pointer-events-none absolute rounded-full"
		style="width:640px;height:640px;top:-220px;left:-180px;filter:blur(110px);background:radial-gradient(circle,rgba(99,102,241,0.22) 0%,transparent 70%)"
	></div>
	<div
		class="pointer-events-none absolute rounded-full"
		style="width:520px;height:520px;bottom:-160px;right:-160px;filter:blur(110px);background:radial-gradient(circle,rgba(139,92,246,0.18) 0%,transparent 70%)"
	></div>
	<div
		class="pointer-events-none absolute rounded-full"
		style="width:380px;height:380px;top:55%;left:58%;transform:translate(-50%,-50%);filter:blur(110px);background:radial-gradient(circle,rgba(6,182,212,0.09) 0%,transparent 70%)"
	></div>

	<!-- card -->
	<main
		class="relative w-full max-w-110 overflow-hidden rounded-(--r-2xl) border border-[rgba(255,255,255,0.09)] p-11"
		style="background:rgba(255,255,255,0.036);backdrop-filter:blur(56px) saturate(180%);-webkit-backdrop-filter:blur(56px) saturate(180%);box-shadow:0 28px 88px rgba(0,0,0,0.62),0 0 0 1px rgba(255,255,255,0.03) inset"
	>
		<!-- top shine -->
		<div
			class="pointer-events-none absolute top-0 right-[12%] left-[12%] h-px"
			style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.20),transparent)"
		></div>

		<!-- logo -->
		<a href="/" class="mb-9 inline-flex items-center gap-2.5 no-underline">
			<div
				class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-(--r-lg) border border-(--border-default) bg-(--glass-2)"
				style="box-shadow:0 0 22px rgba(99,102,241,0.38),inset 0 1px 0 rgba(255,255,255,0.1)"
			>
				<svg viewBox="0 0 36 32" fill="none" class="h-6.5 w-6.5">
					<path
						d="M10 27C6.134 27 3 23.866 3 20c0-3.074 1.966-5.69 4.716-6.65A11 11 0 0 1 29 14.5l.1.003A7.5 7.5 0 0 1 29 29H10z"
						fill="url(#lg-cg)"
					/>
					<path
						d="M15 23l3-4 3 4M18 19v8"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<defs>
						<linearGradient id="lg-cg" x1="3" y1="8" x2="30" y2="30" gradientUnits="userSpaceOnUse">
							<stop stop-color="#6366f1" /><stop offset="1" stop-color="#8b5cf6" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			<span
				class="text-[22px] font-extrabold tracking-[-0.055em]"
				style="background:linear-gradient(135deg,#a5b4fc 0%,#8b5cf6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text"
				>Kloude</span
			>
		</a>

		<!-- header -->
		<div class="mb-7">
			<h1
				class="m-0 mb-1.5 text-[26px] leading-tight font-bold tracking-[-0.04em] text-(--text-primary)"
			>
				Welcome back
			</h1>
			<p class="m-0 text-sm leading-relaxed text-(--text-secondary)">
				Sign in to continue to your workspace
			</p>
		</div>

		<!-- error alert -->
		{#if form?.message}
			<div
				class="mb-5 flex items-start gap-2 rounded-(--r-md) px-3.5 py-1.75 text-[13px] leading-snug text-[#fca5a5]"
				style="background:rgba(239,68,68,0.09);border:1px solid rgba(239,68,68,0.22)"
				role="alert"
			>
				<svg
					viewBox="0 0 20 20"
					fill="none"
					class="mt-px h-3.75 w-3.75 shrink-0"
					aria-hidden="true"
				>
					<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
					<path
						d="M10 6.5v4M10 13v.5"
						stroke="currentColor"
						stroke-width="1.75"
						stroke-linecap="round"
					/>
				</svg>
				{form.message}
			</div>
		{/if}

		<!-- form -->
		<form
			method="POST"
			class="flex flex-col gap-[1.1rem]"
			use:enhance={() => {
				loading = true;
				return async ({ update }) => {
					loading = false;
					await update();
				};
			}}
		>
			<!-- email -->
			<div class="flex flex-col gap-1.75">
				<label
					for="lg-email"
					class="text-[13px] font-medium tracking-[-0.01em] text-(--text-secondary)"
				>
					Email address
				</label>
				<div class="relative flex items-center">
					<span
						class="pointer-events-none absolute left-0 z-1 flex w-10.5 items-center justify-center text-(--text-tertiary)"
						aria-hidden="true"
					>
						<svg viewBox="0 0 20 20" fill="none" class="h-3.75 w-3.75">
							<path
								d="M2.5 6.5l7.5 5 7.5-5M3 5h14a.5.5 0 01.5.5v9a.5.5 0 01-.5.5H3a.5.5 0 01-.5-.5v-9A.5.5 0 013 5z"
								stroke="currentColor"
								stroke-width="1.4"
								stroke-linecap="round"
								stroke-linejoin="round"
							/>
						</svg>
					</span>
					<input
						id="lg-email"
						name="email"
						type="email"
						placeholder="you@example.com"
						autocomplete="email"
						required
						class="h-11.5 w-full rounded-(--r-md) border border-(--border-default) bg-(--glass-2) pr-3.5 pl-10.5 text-sm tracking-tight text-(--text-primary) backdrop-blur-lg transition-[background,border-color,box-shadow] duration-210 outline-none placeholder:text-(--text-muted) focus:border-[rgba(99,102,241,0.60)] focus:bg-(--glass-3) focus:shadow-[0_0_0_3px_rgba(99,102,241,0.13)]"
					/>
				</div>
			</div>

			<!-- password -->
			<div class="flex flex-col gap-1.75">
				<div class="flex items-center justify-between">
					<label
						for="lg-password"
						class="text-[13px] font-medium tracking-[-0.01em] text-(--text-secondary)"
					>
						Password
					</label>
					<a
						href="/forgot-password"
						class="text-[12px] text-(--iris-400) no-underline transition-colors duration-210 hover:text-(--iris-300)"
					>
						Forgot password?
					</a>
				</div>
				<div class="relative flex items-center">
					<span
						class="pointer-events-none absolute left-0 z-1 flex w-10.5 items-center justify-center text-(--text-tertiary)"
						aria-hidden="true"
					>
						<svg viewBox="0 0 20 20" fill="none" class="h-3.75 w-3.75">
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
					</span>
					<input
						id="lg-password"
						name="password"
						type={showPassword ? 'text' : 'password'}
						placeholder="••••••••"
						autocomplete="current-password"
						required
						class="duration-210ms h-11.5 w-full rounded-(--r-md) border border-(--border-default) bg-(--glass-2) pr-11.5 pl-10.5 text-sm tracking-tight text-(--text-primary) backdrop-blur-lg transition-[background,border-color,box-shadow] outline-none placeholder:text-(--text-muted) focus:border-[rgba(99,102,241,0.60)] focus:bg-(--glass-3) focus:shadow-[0_0_0_3px_rgba(99,102,241,0.13)]"
					/>
					<button
						type="button"
						onclick={() => (showPassword = !showPassword)}
						aria-label={showPassword ? 'Hide password' : 'Show password'}
						class="duration-210ms absolute right-0 flex h-11.5 w-11.5 cursor-pointer items-center justify-center rounded-r-(--r-md) border-none bg-transparent text-(--text-tertiary) transition-colors hover:text-(--text-secondary)"
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
				</div>
			</div>

			<!-- submit -->
			<div class="mt-1">
				<Button type="submit" variant="primary" size="xl" {loading} class="w-full">
					Sign in to Kloude
				</Button>
			</div>
		</form>

		<!-- divider -->
		<div class="my-7 flex items-center gap-3 text-[12px] text-[var(--text-muted)]">
			<div class="h-px flex-1 bg-[var(--border-subtle)]"></div>
			<span>New to Kloude?</span>
			<div class="h-px flex-1 bg-[var(--border-subtle)]"></div>
		</div>

		<!-- CTA -->
		<a
			href="/signup"
			class="flex items-center justify-center gap-1.5 rounded-[var(--r-md)] border border-[var(--border-subtle)] bg-[var(--glass-1)] p-3 text-sm font-medium text-[var(--text-secondary)] no-underline transition-[color,background-color,border-color] duration-[210ms] hover:border-[rgba(99,102,241,0.25)] hover:bg-[rgba(99,102,241,0.06)] hover:text-[var(--iris-300)]"
		>
			Create a free account
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
