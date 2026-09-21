<script lang="ts">
	import type { Snippet } from 'svelte';

	type Variant = 'default' | 'primary' | 'success' | 'warning' | 'danger' | 'orbit' | 'cosmos' | 'outline';
	type Size    = 'sm' | 'md' | 'lg';

	let {
		variant = 'default' as Variant,
		size    = 'md'      as Size,
		dot     = false,
		pulse   = false,
		class: cls = '',
		children
	}: {
		variant?: Variant;
		size?:    Size;
		dot?:     boolean;
		pulse?:   boolean;
		class?:   string;
		children: Snippet;
	} = $props();
</script>

<span class="badge badge-{variant} badge-{size} {cls}">
	{#if dot}
		<span class="bdot" class:pulse></span>
	{/if}
	{@render children()}
</span>

<style>
	.badge {
		display: inline-flex;
		align-items: center;
		gap: 5px;
		font-family: var(--font-sans);
		font-weight: 500;
		border: 1px solid transparent;
		border-radius: var(--r-full);
		white-space: nowrap;
		letter-spacing: 0.01em;
	}

	.badge-sm { padding: 2px 8px;  font-size: 11px; }
	.badge-md { padding: 3px 10px; font-size: 12px; }
	.badge-lg { padding: 4px 12px; font-size: 13px; }

	.badge-default {
		background: var(--glass-3);
		color: var(--text-secondary);
		border-color: var(--border-default);
	}
	.badge-primary {
		background: rgba(99, 102, 241, 0.16);
		color: var(--iris-300);
		border-color: rgba(99, 102, 241, 0.28);
	}
	.badge-success {
		background: rgba(16, 185, 129, 0.14);
		color: var(--aurora-300);
		border-color: rgba(16, 185, 129, 0.26);
	}
	.badge-warning {
		background: rgba(245, 158, 11, 0.14);
		color: var(--solar-300);
		border-color: rgba(245, 158, 11, 0.26);
	}
	.badge-danger {
		background: rgba(239, 68, 68, 0.14);
		color: var(--nova-300);
		border-color: rgba(239, 68, 68, 0.26);
	}
	.badge-orbit {
		background: rgba(14, 165, 233, 0.14);
		color: var(--orbit-300);
		border-color: rgba(14, 165, 233, 0.26);
	}
	.badge-cosmos {
		background: rgba(168, 85, 247, 0.14);
		color: var(--violet-300);
		border-color: rgba(168, 85, 247, 0.26);
	}
	.badge-outline {
		background: transparent;
		color: var(--text-secondary);
		border-color: var(--border-strong);
	}

	.bdot {
		width: 6px;
		height: 6px;
		border-radius: 50%;
		background: currentColor;
		flex-shrink: 0;
	}
	.bdot.pulse {
		animation: pulse 2s ease-in-out infinite;
	}

	@keyframes pulse {
		0%, 100% { opacity: 1; transform: scale(1); }
		50%       { opacity: 0.5; transform: scale(0.75); }
	}
</style>
