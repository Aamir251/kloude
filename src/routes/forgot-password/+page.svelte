<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input } from '$components/ui';
	import AuthCard from '$components/auth/auth-card.svelte';
	import type { ActionData } from './$types';

	let { form }: { form: ActionData } = $props();
	let loading = $state(false);
</script>

<AuthCard
	title="Forgot your password?"
	subtitle="Enter your email and we'll send you a link to reset it."
>
	{#if form?.success}
		<div
			class="rounded-(--r-md) px-3.5 py-2.75 text-[13px] leading-snug text-(--aurora-400)"
			style="background:rgba(16,185,129,0.09);border:1px solid rgba(16,185,129,0.22)"
			role="status"
		>
			If an account exists for <strong>{form.email}</strong>, a reset link is on its way. It expires
			in 1 hour.
		</div>
	{:else}
		{#if form?.message}
			<div
				class="mb-5 rounded-(--r-md) px-3.5 py-2.75 text-[13px] leading-snug text-[#fca5a5]"
				style="background:rgba(239,68,68,0.09);border:1px solid rgba(239,68,68,0.22)"
				role="alert"
			>
				{form.message}
			</div>
		{/if}

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
			<Input
				name="email"
				type="email"
				label="Email address"
				placeholder="you@example.com"
				autocomplete="email"
				required
				size="lg"
			/>

			<Button type="submit" variant="primary" size="xl" {loading} class="w-full">
				Send reset link
			</Button>
		</form>
	{/if}
</AuthCard>
