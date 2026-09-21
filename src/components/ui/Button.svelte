<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'success' | 'outline' | 'glass';
	type Size = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

	let {
		variant = 'primary',
		size = 'md',
		disabled = false,
		loading = false,
		type = 'button' as 'button' | 'submit' | 'reset',
		href,
		class: cls = '',
		children,
		onclick
	}: {
		variant?: Variant;
		size?: Size;
		disabled?: boolean;
		loading?: boolean;
		type?: 'button' | 'submit' | 'reset';
		href?: string;
		class?: string;
		children: Snippet;
		onclick?: (e: MouseEvent) => void;
	} = $props();
</script>

{#if href}
	<a {href} class="btn btn-{variant} btn-{size} {cls}" class:btn-dis={disabled}>
		{#if loading}<span class="spin"></span>{/if}
		{@render children()}
	</a>
{:else}
	<button {type} {disabled} {onclick} class="btn btn-{variant} btn-{size} {cls}" class:btn-loading={loading}>
		{#if loading}<span class="spin"></span>{/if}
		{@render children()}
	</button>
{/if}

<style>
	.btn {
		display: inline-flex;
		align-items: center;
		justify-content: center;
		gap: 7px;
		font-family: var(--font-sans);
		font-weight: 500;
		letter-spacing: -0.015em;
		white-space: nowrap;
		cursor: pointer;
		border: 1px solid transparent;
		text-decoration: none;
		position: relative;
		overflow: hidden;
		transition:
			background var(--dur-normal) var(--ease-out),
			border-color var(--dur-normal) var(--ease-out),
			box-shadow var(--dur-normal) var(--ease-out),
			transform var(--dur-fast) var(--ease-out),
			opacity var(--dur-normal) var(--ease-out);
	}

	/* Top-gloss shimmer */
	.btn::after {
		content: '';
		position: absolute;
		inset: 0;
		background: var(--grad-shine);
		pointer-events: none;
	}

	.btn:active:not(:disabled) { transform: scale(0.965); }

	.btn:disabled,
	.btn-dis {
		opacity: 0.36;
		cursor: not-allowed;
		pointer-events: none;
	}

	/* ── Sizes ─────────────────────────── */
	.btn-xs { padding: 4px 10px;  font-size: 11px; border-radius: var(--r-sm); height: 26px; }
	.btn-sm { padding: 6px 14px;  font-size: 13px; border-radius: var(--r-md); height: 32px; }
	.btn-md { padding: 8px 18px;  font-size: 14px; border-radius: var(--r-md); height: 38px; }
	.btn-lg { padding: 10px 22px; font-size: 15px; border-radius: var(--r-lg); height: 44px; }
	.btn-xl { padding: 14px 28px; font-size: 16px; border-radius: var(--r-lg); height: 52px; }

	/* ── Variants ──────────────────────── */
	.btn-primary {
		background: var(--grad-nebula);
		color: #fff;
		border-color: rgba(99, 102, 241, 0.35);
		box-shadow: 0 0 22px rgba(99, 102, 241, 0.28), inset 0 1px 0 rgba(255,255,255,0.14);
	}
	.btn-primary:hover:not(:disabled) {
		box-shadow: 0 0 38px rgba(99, 102, 241, 0.50), inset 0 1px 0 rgba(255,255,255,0.20);
		transform: translateY(-1px);
	}

	.btn-secondary {
		background: var(--glass-2);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		color: var(--text-primary);
		border-color: var(--border-default);
	}
	.btn-secondary:hover:not(:disabled) {
		background: var(--glass-3);
		border-color: var(--border-strong);
		transform: translateY(-1px);
		box-shadow: var(--shadow-sm);
	}

	.btn-ghost {
		background: transparent;
		color: var(--text-secondary);
		border-color: transparent;
	}
	.btn-ghost:hover:not(:disabled) {
		background: var(--glass-2);
		color: var(--text-primary);
		border-color: var(--border-subtle);
	}

	.btn-outline {
		background: transparent;
		color: var(--iris-400);
		border-color: rgba(99, 102, 241, 0.42);
	}
	.btn-outline:hover:not(:disabled) {
		background: rgba(99, 102, 241, 0.10);
		border-color: rgba(99, 102, 241, 0.65);
		box-shadow: 0 0 18px rgba(99, 102, 241, 0.18);
		transform: translateY(-1px);
	}

	.btn-glass {
		background: var(--glass-2);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
		color: var(--text-primary);
		border-color: var(--border-default);
		box-shadow: var(--shadow-sm);
	}
	.btn-glass:hover:not(:disabled) {
		background: var(--glass-3);
		border-color: var(--border-strong);
		box-shadow: var(--shadow-md);
		transform: translateY(-1px);
	}

	.btn-success {
		background: var(--grad-forest);
		color: #fff;
		border-color: rgba(16, 185, 129, 0.32);
		box-shadow: 0 0 22px rgba(16, 185, 129, 0.22);
	}
	.btn-success:hover:not(:disabled) {
		box-shadow: 0 0 38px rgba(16, 185, 129, 0.42);
		transform: translateY(-1px);
	}

	.btn-danger {
		background: linear-gradient(135deg, #ef4444, #dc2626);
		color: #fff;
		border-color: rgba(239, 68, 68, 0.32);
		box-shadow: 0 0 22px rgba(239, 68, 68, 0.22);
	}
	.btn-danger:hover:not(:disabled) {
		box-shadow: 0 0 38px rgba(239, 68, 68, 0.42);
		transform: translateY(-1px);
	}

	/* ── Spinner ───────────────────────── */
	.spin {
		width: 13px;
		height: 13px;
		border: 2px solid rgba(255,255,255,0.25);
		border-top-color: rgba(255,255,255,0.88);
		border-radius: 50%;
		animation: spin 0.55s linear infinite;
		flex-shrink: 0;
	}
	@keyframes spin { to { transform: rotate(360deg); } }
</style>
