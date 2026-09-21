<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'elevated' | 'outlined' | 'solid';
	type Pad     = 'none' | 'sm' | 'md' | 'lg' | 'xl';

	let {
		variant = 'default' as Variant,
		padding = 'md'      as Pad,
		hoverable = false,
		glow      = false,
		class: cls = '',
		children,
		header,
		footer
	}: {
		variant?:  Variant;
		padding?:  Pad;
		hoverable?: boolean;
		glow?:      boolean;
		class?:     string;
		children:   Snippet;
		header?:    Snippet;
		footer?:    Snippet;
	} = $props();
</script>

<div class="card card-{variant} card-p{padding} {cls}" class:hoverable class:glow>
	{#if header}
		<div class="card-hd">{@render header()}</div>
	{/if}

	<div class="card-body">{@render children()}</div>

	{#if footer}
		<div class="card-ft">{@render footer()}</div>
	{/if}
</div>

<style>
	.card {
		border-radius: var(--r-xl);
		border: 1px solid var(--border-default);
		display: flex;
		flex-direction: column;
		overflow: hidden;
		transition:
			background var(--dur-normal) var(--ease-out),
			border-color var(--dur-normal) var(--ease-out),
			box-shadow var(--dur-normal) var(--ease-out),
			transform var(--dur-normal) var(--ease-out);
	}

	/* Variants */
	.card-default {
		background: var(--glass-2);
		backdrop-filter: blur(24px);
		-webkit-backdrop-filter: blur(24px);
	}
	.card-elevated {
		background: var(--glass-3);
		backdrop-filter: blur(32px);
		-webkit-backdrop-filter: blur(32px);
		box-shadow: var(--shadow-lg);
	}
	.card-outlined {
		background: transparent;
	}
	.card-solid {
		background: var(--bg-raised);
		border-color: var(--border-subtle);
	}

	/* Hover */
	.card.hoverable { cursor: pointer; }
	.card.hoverable:hover {
		background: var(--glass-3);
		border-color: var(--border-strong);
		box-shadow: var(--shadow-lg);
		transform: translateY(-2px);
	}

	/* Glow */
	.card.glow {
		box-shadow: 0 0 0 1px rgba(99,102,241,0.18), 0 0 48px rgba(99,102,241,0.09);
	}
	.card.glow:hover {
		box-shadow: 0 0 0 1px rgba(99,102,241,0.30), 0 0 72px rgba(99,102,241,0.18);
	}

	/* Padding */
	.card-pnone .card-body, .card-pnone .card-hd, .card-pnone .card-ft { padding: 0; }
	.card-psm   .card-body { padding: 12px; }
	.card-psm   .card-hd, .card-psm   .card-ft { padding: 10px 12px; }
	.card-pmd   .card-body { padding: 20px; }
	.card-pmd   .card-hd,  .card-pmd   .card-ft  { padding: 16px 20px; }
	.card-plg   .card-body { padding: 28px; }
	.card-plg   .card-hd,  .card-plg   .card-ft  { padding: 20px 28px; }
	.card-pxl   .card-body { padding: 36px; }
	.card-pxl   .card-hd,  .card-pxl   .card-ft  { padding: 24px 36px; }

	.card-hd { border-bottom: 1px solid var(--border-subtle); }
	.card-ft { border-top: 1px solid var(--border-subtle); margin-top: auto; }
</style>
