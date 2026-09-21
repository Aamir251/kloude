<script lang="ts">
	type Option = { value: string; label: string; disabled?: boolean };

	let {
		label = '',
		options = [],
		value = $bindable(''),
		error = '',
		hint = '',
		disabled = false,
		placeholder = 'Select an option',
		required = false,
		size = 'md' as 'sm' | 'md' | 'lg',
		id = `sel-${Math.random().toString(36).slice(2, 7)}`,
		name,
		class: cls = ''
	}: {
		label?: string;
		options: Option[];
		value?: string;
		error?: string;
		hint?: string;
		disabled?: boolean;
		placeholder?: string;
		required?: boolean;
		size?: 'sm' | 'md' | 'lg';
		id?: string;
		name?: string;
		class?: string;
	} = $props();
</script>

<div class="field {cls}">
	{#if label}
		<label for={id} class="lbl" class:req={required}>{label}</label>
	{/if}

	<div class="wrap" class:err={!!error} class:dis={disabled}>
		<select {id} {name} {disabled} {required} bind:value class="sel sel-{size}">
			{#if placeholder}
				<option value="" disabled hidden>{placeholder}</option>
			{/if}
			{#each options as opt}
				<option value={opt.value} disabled={opt.disabled}>{opt.label}</option>
			{/each}
		</select>

		<span class="chevron" aria-hidden="true">
			<svg width="14" height="14" viewBox="0 0 14 14" fill="none">
				<path d="M3 5L7 9L11 5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
			</svg>
		</span>
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

	.sel {
		width: 100%;
		font-family: var(--font-sans);
		background: var(--glass-2);
		backdrop-filter: blur(16px);
		-webkit-backdrop-filter: blur(16px);
		border: 1px solid var(--border-default);
		border-radius: var(--r-md);
		color: var(--text-primary);
		letter-spacing: -0.01em;
		appearance: none;
		cursor: pointer;
		padding-right: 36px;
		outline: none;
		transition:
			background var(--dur-normal) var(--ease-out),
			border-color var(--dur-normal) var(--ease-out),
			box-shadow var(--dur-normal) var(--ease-out);
	}
	.sel:focus {
		background: var(--glass-3);
		border-color: var(--border-focus);
		box-shadow: 0 0 0 3px rgba(99, 102, 241, 0.14);
	}
	.sel:disabled { opacity: 0.38; cursor: not-allowed; }

	.wrap.err .sel       { border-color: rgba(239, 68, 68, 0.55); }
	.wrap.err .sel:focus { border-color: rgba(239, 68, 68, 0.75); box-shadow: 0 0 0 3px rgba(239,68,68,0.13); }

	.sel-sm { padding: 6px 12px;  font-size: 13px; height: 32px; }
	.sel-md { padding: 8px 14px;  font-size: 14px; height: 40px; }
	.sel-lg { padding: 10px 16px; font-size: 15px; height: 48px; }

	.sel option {
		background: #0d1425;
		color: rgba(255,255,255,0.92);
	}

	.chevron {
		position: absolute;
		right: 12px;
		color: var(--text-tertiary);
		pointer-events: none;
		display: flex;
		align-items: center;
	}

	.msg  { font-family: var(--font-sans); font-size: 12px; }
	.emsg { color: var(--nova-300); }
	.hmsg { color: var(--text-tertiary); }
</style>
