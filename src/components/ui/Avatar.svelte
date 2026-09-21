<script lang="ts">
	type Size    = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
	type Shape   = 'circle' | 'rounded' | 'square';
	type Status  = 'online' | 'away' | 'busy' | 'offline';

	let {
		src      = '',
		alt      = '',
		initials = '',
		size     = 'md' as Size,
		shape    = 'circle' as Shape,
		status,
		class: cls = ''
	}: {
		src?:     string;
		alt?:     string;
		initials?: string;
		size?:    Size;
		shape?:   Shape;
		status?:  Status;
		class?:   string;
	} = $props();

	const gradients = [
		'var(--grad-nebula)',
		'var(--grad-aurora)',
		'var(--grad-cosmos)',
		'var(--grad-forest)',
		'var(--grad-solar)'
	];
	const bg = $derived(gradients[(initials.charCodeAt(0) || 0) % gradients.length]);
</script>

<span class="av av-{size} av-{shape} {cls}">
	{#if src}
		<img {src} {alt} class="av-img" />
	{:else if initials}
		<span class="av-init" style="background:{bg}">{initials.slice(0,2).toUpperCase()}</span>
	{:else}
		<span class="av-placeholder" style="background:{bg}">
			<svg viewBox="0 0 24 24" fill="currentColor" style="width:52%;height:52%;opacity:.88">
				<path d="M12 12c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm0 2c-3.33 0-10 1.67-10 5v2h20v-2c0-3.33-6.67-5-10-5z"/>
			</svg>
		</span>
	{/if}

	{#if status}
		<span class="av-status s-{status}"></span>
	{/if}
</span>

<style>
	.av {
		position: relative;
		display: inline-flex;
		flex-shrink: 0;
		vertical-align: middle;
	}

	.av-xs  { width: 24px;  height: 24px;  font-size: 9px;  }
	.av-sm  { width: 32px;  height: 32px;  font-size: 11px; }
	.av-md  { width: 40px;  height: 40px;  font-size: 13px; }
	.av-lg  { width: 48px;  height: 48px;  font-size: 15px; }
	.av-xl  { width: 64px;  height: 64px;  font-size: 20px; }
	.av-2xl { width: 80px;  height: 80px;  font-size: 25px; }

	.av-img, .av-init, .av-placeholder {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
		font-weight: 600;
		color: #fff;
		overflow: hidden;
		border: 1px solid rgba(255,255,255,0.12);
		letter-spacing: -0.01em;
	}
	.av-img { object-fit: cover; }

	.av-circle .av-img, .av-circle .av-init, .av-circle .av-placeholder { border-radius: 50%; }
	.av-rounded .av-img, .av-rounded .av-init, .av-rounded .av-placeholder { border-radius: var(--r-lg); }
	.av-square .av-img, .av-square .av-init, .av-square .av-placeholder { border-radius: var(--r-sm); }

	.av-status {
		position: absolute;
		bottom: 0;
		right: 0;
		width: 28%;
		height: 28%;
		min-width: 7px;
		min-height: 7px;
		border-radius: 50%;
		border: 2px solid var(--bg-base);
	}
	.s-online  { background: var(--aurora-500); }
	.s-away    { background: var(--solar-500);  }
	.s-busy    { background: var(--nova-500);   }
	.s-offline { background: var(--text-muted); }
</style>
