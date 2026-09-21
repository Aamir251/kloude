<script lang="ts">
	import GradientAndGlow from './gradient-and-glow.svelte';
	import type { Folder } from './types';

	let folder: Folder = $props();

	const glows = [
		{ color: 'var(--grad-nebula)', glow: 'rgba(99,102,241,0.28)' },
		{ color: 'var(--grad-cosmos)', glow: 'rgba(168,85,247,0.24)' },
		{ color: 'var(--grad-aurora)', glow: 'rgba(6,182,212,0.24)' },
		{ color: 'var(--grad-forest)', glow: 'rgba(16,185,129,0.24)' }
	];

	function getGlowAndcolor() {
		const index = Math.floor(Math.random() * glows.length);
		return glows[index];
	}

	const { color, glow } = getGlowAndcolor();
</script>

<button
	class="group relative flex w-full cursor-pointer flex-col gap-3.5 overflow-hidden rounded-(--r-xl) border border-(--border-default) p-4 text-left transition-[border-color,transform,background] duration-210 hover:-translate-y-0.5 hover:border-(--border-strong)"
	style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)"
>
	<GradientAndGlow {color} {glow} />

	<div class="relative">
		<p
			class="m-0 truncate text-[14px] font-semibold tracking-[-0.02em] text-(--text-primary) transition-colors duration-115 group-hover:text-(--iris-300)"
		>
			{folder.name}
		</p>
		<p class="m-0 mt-1 text-[12px] text-(--text-muted)">
			{folder.files} files · {folder.size}
		</p>
	</div>

	<div class="relative flex items-center justify-between border-t border-(--border-subtle) pt-2">
		<span class="text-[11px] text-(--text-muted)">Modified {folder.modified}</span>
		<svg
			viewBox="0 0 16 16"
			fill="none"
			class="h-3.5 w-3.5 text-(--iris-400) opacity-0 transition-opacity duration-115 group-hover:opacity-100"
		>
			<path
				d="M3 8h10M9 4l4 4-4 4"
				stroke="currentColor"
				stroke-width="1.4"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
</button>
