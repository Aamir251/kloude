<script lang="ts">
	let { glow, color }: { glow: string; color: string } = $props();
</script>

<!-- ambient -->
<div
	class="pointer-events-none absolute -top-6 -right-6 h-20 w-20 rounded-full opacity-50 transition-opacity duration-380 group-hover:opacity-90"
	style="filter:blur(24px);background:{glow}"
></div>
<!-- shine -->
<div
	class="pointer-events-none absolute top-0 right-[10%] left-[10%] h-px"
	style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.12),transparent)"
></div>

<div class="relative flex items-center justify-between">
	<div
		class="flex h-10 w-10 items-center justify-center rounded-(--r-lg) border border-(--border-default)"
		style="background:{color};box-shadow:0 0 16px {glow}"
	>
		<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-white">
			<path
				d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z"
				stroke="currentColor"
				stroke-width="1.5"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</div>
	<svg
		viewBox="0 0 16 16"
		fill="none"
		class="h-3.5 w-3.5 text-(--text-muted) opacity-0 transition-opacity duration-115 group-hover:opacity-100"
	>
		<circle cx="8" cy="4" r="1" fill="currentColor" /><circle
			cx="8"
			cy="8"
			r="1"
			fill="currentColor"
		/><circle cx="8" cy="12" r="1" fill="currentColor" />
	</svg>
</div>
