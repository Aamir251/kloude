<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		type = 'text',
		label = '',
		placeholder = '',
		value = $bindable(''),
		error = '',
		hint = '',
		disabled = false,
		readonly = false,
		required = false,
		size = 'md' as 'sm' | 'md' | 'lg',
		id = `field-${Math.random().toString(36).slice(2, 7)}`,
		name,
		autocomplete,
		iconLeft,
		iconRight,
		class: cls = ''
	}: {
		type?: string;
		label?: string;
		placeholder?: string;
		value?: string;
		error?: string;
		hint?: string;
		disabled?: boolean;
		readonly?: boolean;
		required?: boolean;
		size?: 'sm' | 'md' | 'lg';
		id?: string;
		name?: string;
		autocomplete?: string;
		iconLeft?: Snippet;
		iconRight?: Snippet;
		class?: string;
	} = $props();
</script>

<div class="field {cls}">
	{#if label}
		<label for={id} class="lbl" class:req={required}>{label}</label>
	{/if}

	<div class="wrap" class:err={!!error} class:dis={disabled}>
		{#if iconLeft}
			<span class="icon icon-l">{@render iconLeft()}</span>
		{/if}

		<input
			{id} {type} {name} {placeholder} {disabled} {readonly} {required}
			autocomplete={autocomplete as never}
			bind:value
			class="inp inp-{size}"
			class:il={!!iconLeft}
			class:ir={!!iconRight}
		/>

		{#if iconRight}
			<span class="icon icon-r">{@render iconRight()}</span>
		{/if}
	</div>

	{#if error}
		<span class="msg emsg">{error}</span>
	{:else if hint}
		<span class="msg hmsg">{hint}</span>
	{/if}
</div>

<style>
	.field { display: flex; flex-direction: column; gap: 6px; }

	.lbl {
		font-family: var(--font-sans);
		font-size: 13px;
		font-weight: 500;
		color: var(--text-secondary);
		letter-spacing: -0.01em;
	}
	.lbl.req::after { content: ' *'; color: var(--nova-500); }

	.wrap { position: relative; display: flex; align-items: center; }

	.inp {
		width: 100%;
		font-family: var(--font-sans);
		background: var(--glass-2);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--border-default);
		border-radius: var(--r-md);
		color: var(--text-primary);
		letter-spacing: -0.01em;
		outline: none;
		transition:
			background var(--dur-normal) var(--ease-out),
			border-color var(--dur-normal) var(--ease-out),
			box-shadow var(--dur-normal) var(--ease-out);
	}
	.inp::placeholder { color: var(--text-muted); }
	.inp:focus {
		background: var(--glass-3);
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.14), 0 0 20px rgba(99, 102, 241, 0.07);
	}
	.inp:disabled { opacity: 0.38; cursor: not-allowed; }

	.wrap.err .inp              { border-color: rgba(239, 68, 68, 0.55); }
	.wrap.err .inp:focus        { border-color: rgba(239, 68, 68, 0.75); box-shadow: 0 0 0 3px rgba(239,68,68,0.13); }

	.inp-sm { padding: 6px 12px;  font-size: 13px; height: 32px; }
	.inp-md { padding: 8px 14px;  font-size: 14px; height: 40px; }
	.inp-lg { padding: 10px 16px; font-size: 15px; height: 48px; }

	.inp.il { padding-left:  38px; }
	.inp.ir { padding-right: 38px; }

	.icon {
		position: absolute;
		display: flex;
		align-items: center;
		justify-content: center;
		width: 38px;
		color: var(--text-tertiary);
		pointer-events: none;
	}
	.icon-l { left: 0; }
	.icon-r { right: 0; }

	.msg  { font-family: var(--font-sans); font-size: 12px; }
	.emsg { color: var(--nova-300); }
	.hmsg { color: var(--text-tertiary); }
</style>
