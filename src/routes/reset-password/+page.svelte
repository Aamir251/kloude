<script lang="ts">
	import { enhance } from '$app/forms';
	import { Button, Input } from '$components/ui';
	import AuthCard from '$components/auth/auth-card.svelte';
	import type { ActionData, PageData } from './$types';

	let { data, form }: { data: PageData; form: ActionData } = $props();
	let loading = $state(false);
	let password = $state('');
	let confirm = $state('');

	const mismatch = $derived(confirm.length > 0 && password !== confirm);
</script>

{#if form?.success}
	<AuthCard title="Password updated" subtitle="You can now sign in with your new password.">
		<Button href="/login" variant="primary" size="xl" class="w-full">Sign in</Button>
	</AuthCard>
{:else if data.invalid}
	<AuthCard title="Link expired" subtitle="This reset link is invalid or has already been used.">
		<Button href="/forgot-password" variant="primary" size="xl" class="w-full">
			Request a new link
		</Button>
	</AuthCard>
{:else}
	<AuthCard title="Set a new password" subtitle="Choose a password of at least 8 characters.">
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
					await update({ reset: false });
				};
			}}
		>
			<input type="hidden" name="token" value={data.token} />

			<Input
				name="password"
				type="password"
				label="New password"
				placeholder="Create a strong password"
				autocomplete="new-password"
				required
				bind:value={password}
				size="lg"
			/>
			<Input
				name="confirm"
				type="password"
				label="Confirm password"
				placeholder="Repeat your password"
				autocomplete="new-password"
				required
				bind:value={confirm}
				error={mismatch ? "Passwords don't match" : ''}
				size="lg"
			/>

			<Button
				type="submit"
				variant="primary"
				size="xl"
				{loading}
				disabled={mismatch}
				class="w-full"
			>
				Reset password
			</Button>
		</form>
	</AuthCard>
{/if}
