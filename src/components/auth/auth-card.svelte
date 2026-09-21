<script lang="ts">
	import type { Snippet } from 'svelte';
	import FormOrbs from '$components/signup/form-orbs.svelte';

	let { title, subtitle, children }: { title: string; subtitle: string; children: Snippet } =
		$props();
</script>

<div
	class="relative flex min-h-dvh items-center justify-center overflow-hidden px-6 py-8"
	style="background:var(--grad-page)"
>
	<FormOrbs />

	<main
		class="relative w-full max-w-110 overflow-hidden rounded-2xl border border-[rgba(255,255,255,0.09)] p-11"
		style="background:rgba(255,255,255,0.036);backdrop-filter:blur(56px) saturate(180%);-webkit-backdrop-filter:blur(56px) saturate(180%);box-shadow:0 28px 88px rgba(0,0,0,0.62),0 0 0 1px rgba(255,255,255,0.03) inset"
	>
		<div
			class="pointer-events-none absolute top-0 right-[12%] left-[12%] h-px"
			style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.20),transparent)"
		></div>

		<a href="/" class="mb-9 inline-flex items-center gap-2.5 no-underline">
			<div
				class="flex h-10.5 w-10.5 shrink-0 items-center justify-center rounded-xl border border-(--border-default) bg-(--glass-2)"
				style="box-shadow:0 0 22px rgba(99,102,241,0.38),inset 0 1px 0 rgba(255,255,255,0.1)"
			>
				<svg viewBox="0 0 36 32" fill="none" class="h-6.5 w-6.5">
					<path
						d="M10 27C6.134 27 3 23.866 3 20c0-3.074 1.966-5.69 4.716-6.65A11 11 0 0 1 29 14.5l.1.003A7.5 7.5 0 0 1 29 29H10z"
						fill="url(#ac-cg)"
					/>
					<path
						d="M15 23l3-4 3 4M18 19v8"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<defs>
						<linearGradient id="ac-cg" x1="3" y1="8" x2="30" y2="30" gradientUnits="userSpaceOnUse">
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

		<div class="mb-7">
			<h1
				class="m-0 mb-1.5 text-[26px] leading-tight font-bold tracking-[-0.04em] text-(--text-primary)"
			>
				{title}
			</h1>
			<p class="m-0 text-sm leading-relaxed text-(--text-secondary)">{subtitle}</p>
		</div>

		{@render children()}

		<a
			href="/login"
			class="mt-7 flex items-center justify-center gap-1.5 rounded-(--r-md) border border-(--border-subtle) bg-(--glass-1) p-3 text-sm font-medium text-(--text-secondary) no-underline transition-[color,background-color,border-color] duration-210 hover:border-[rgba(99,102,241,0.25)] hover:bg-[rgba(99,102,241,0.06)] hover:text-(--iris-300)"
		>
			Back to sign in
		</a>
	</main>
</div>
