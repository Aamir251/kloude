<script lang="ts">
	type Variant = 'primary' | 'success' | 'warning' | 'danger' | 'orbit' | 'cosmos';
	type Size = 'xs' | 'sm' | 'md' | 'lg';

	let {
		value = 0,
		max = 100,
		variant = 'primary' as Variant,
		size = 'md' as Size,
		label = '',
		showValue = false,
		animated = true,
		class: cls = ''
	}: {
		value?: number;
		max?: number;
		variant?: Variant;
		size?: Size;
		label?: string;
		showValue?: boolean;
		animated?: boolean;
		class?: string;
	} = $props();

	const pct = $derived(Math.min(100, Math.max(0, (value / max) * 100)));

	const fills: Record<Variant, string> = {
		primary: 'var(--grad-nebula)',
		success: 'var(--grad-forest)',
		warning: 'linear-gradient(90deg, #f59e0b 0%, #fcd34d 100%)',
		danger: 'linear-gradient(90deg, #ef4444 0%, #f97316 100%)',
		orbit: 'var(--grad-aurora)',
		cosmos: 'var(--grad-cosmos)'
	};
</script>

<div class="pb-wrap {cls}">
	{#if label || showValue}
		<div class="pb-header">
			{#if label}<span class="pb-label">{label}</span>{/if}
			{#if showValue}<span class="pb-val">{Math.round(pct)}%</span>{/if}
		</div>
	{/if}

	<div
		class="pb-track pb-{size}"
		role="progressbar"
		aria-valuenow={value}
		aria-valuemin={0}
		aria-valuemax={max}
	>
		<div
			class="pb-fill"
			class:anim={animated}
			style="width:{pct}%; background:{fills[variant]};"
		></div>
	</div>
</div>

<style>
	.pb-wrap {
		display: flex;
		flex-direction: column;
		gap: 8px;
		width: 100%;
	}

	.pb-header {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.pb-label {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		color: var(--text-secondary);
	}
	.pb-val {
		font-family: var(--font-sans);
		font-size: 12px;
		font-weight: 600;
		color: var(--text-tertiary);
		letter-spacing: 0.02em;
		font-variant-numeric: tabular-nums;
	}

	.pb-track {
		width: 100%;
		background: var(--glass-2);
		border: 1px solid var(--border-subtle);
		border-radius: var(--r-full);
		overflow: hidden;
	}
	.pb-xs {
		height: 3px;
	}
	.pb-sm {
		height: 5px;
	}
	.pb-md {
		height: 8px;
	}
	.pb-lg {
		height: 12px;
	}

	.pb-fill {
		height: 100%;
		border-radius: var(--r-full);
		transition: width 0.7s var(--ease-out);
		position: relative;
		overflow: hidden;
	}

	.pb-fill.anim::after {
		content: '';
		position: absolute;
		inset: 0;
		background: linear-gradient(
			90deg,
			transparent 0%,
			rgba(255, 255, 255, 0.3) 50%,
			transparent 100%
		);
		animation: shimmer 2.2s ease-in-out infinite;
	}

	@keyframes shimmer {
		0% {
			transform: translateX(-150%);
		}
		100% {
			transform: translateX(250%);
		}
	}
</style>
