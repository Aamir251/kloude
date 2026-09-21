<script lang="ts">
	let message: string = $props();
</script>

<div
	class="mb-5 flex items-start gap-2 rounded-(--r-md) px-3.5 py-2.75 text-[13px] leading-snug text-[#fca5a5]"
	style="background:rgba(239,68,68,0.09);border:1px solid rgba(239,68,68,0.22)"
	role="alert"
>
	<svg viewBox="0 0 20 20" fill="none" class="mt-px h-3.75 w-3.75 shrink-0" aria-hidden="true">
		<circle cx="10" cy="10" r="8" stroke="currentColor" stroke-width="1.5" />
		<path d="M10 6.5v4M10 13v.5" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" />
	</svg>
	{message}
</div>
