<script lang="ts">
	let {
		checked  = $bindable(false),
		disabled = false,
		label    = '',
		size     = 'md' as 'sm' | 'md' | 'lg',
		class: cls = '',
		onchange
	}: {
		checked?:  boolean;
		disabled?: boolean;
		label?:    string;
		size?:     'sm' | 'md' | 'lg';
		class?:    string;
		onchange?: (v: boolean) => void;
	} = $props();

	function handle(e: Event) {
		checked = (e.target as HTMLInputElement).checked;
		onchange?.(checked);
	}
</script>

<label class="tg tg-{size} {cls}" class:dis={disabled}>
	<input type="checkbox" bind:checked {disabled} onchange={handle} class="tg-inp" />
	<span class="tg-track">
		<span class="tg-thumb"></span>
	</span>
	{#if label}
		<span class="tg-lbl">{label}</span>
	{/if}
</label>

<style>
	.tg {
		display: inline-flex;
		align-items: center;
		gap: 10px;
		cursor: pointer;
		user-select: none;
	}
	.tg.dis { opacity: 0.38; cursor: not-allowed; pointer-events: none; }

	.tg-inp {
		position: absolute;
		opacity: 0;
		width: 0;
		height: 0;
		pointer-events: none;
	}

	.tg-track {
		position: relative;
		background: var(--glass-3);
		border: 1px solid var(--border-default);
		border-radius: var(--r-full);
		flex-shrink: 0;
		transition:
			background var(--dur-normal) var(--ease-out),
			border-color var(--dur-normal) var(--ease-out),
			box-shadow var(--dur-normal) var(--ease-out);
	}
	.tg-thumb {
		position: absolute;
		background: var(--text-secondary);
		border-radius: 50%;
		top: 50%;
		transform: translateY(-50%);
		transition:
			left var(--dur-normal) var(--ease-spring),
			background var(--dur-normal) var(--ease-out);
		box-shadow: 0 1px 4px rgba(0,0,0,0.35);
	}

	/* Sizes */
	.tg-sm .tg-track  { width: 32px; height: 18px; }
	.tg-sm .tg-thumb  { width: 12px; height: 12px; left: 2px; }

	.tg-md .tg-track  { width: 42px; height: 24px; }
	.tg-md .tg-thumb  { width: 16px; height: 16px; left: 3px; }

	.tg-lg .tg-track  { width: 52px; height: 30px; }
	.tg-lg .tg-thumb  { width: 22px; height: 22px; left: 3px; }

	/* Checked */
	.tg-inp:checked + .tg-track {
		background: var(--grad-nebula);
		border-color: transparent;
		box-shadow: 0 0 14px rgba(99, 102, 241, 0.40);
	}
	.tg-inp:checked + .tg-track .tg-thumb {
		background: #fff;
		box-shadow: 0 1px 4px rgba(0,0,0,0.25);
	}

	.tg-sm .tg-inp:checked + .tg-track .tg-thumb  { left: calc(100% - 14px); }
	.tg-md .tg-inp:checked + .tg-track .tg-thumb  { left: calc(100% - 19px); }
	.tg-lg .tg-inp:checked + .tg-track .tg-thumb  { left: calc(100% - 25px); }

	/* Focus ring */
	.tg-inp:focus-visible + .tg-track {
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.22);
	}

	.tg-lbl {
		font-family: var(--font-sans);
		font-size: 14px;
		font-weight: 500;
		color: var(--text-secondary);
		transition: color var(--dur-fast) var(--ease-out);
	}
	.tg:hover:not(.dis) .tg-lbl { color: var(--text-primary); }
</style>
