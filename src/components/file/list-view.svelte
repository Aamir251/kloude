<script lang="ts">
	import { Image } from '@unpic/svelte/base';
	import { fileColors } from './constants';
	import { ipxTransform } from '$lib/ipx-transform';
	import { fileLabels, type FileType } from './types';

  type Props = {
    file : FileType
  }

  let { file } : Props = $props();

  const fc = $derived(fileColors[file.type] ?? fileColors.default);

  console.log({ file })

</script>

<div
	class="group grid cursor-pointer items-center gap-4 px-5 py-3 transition-[background] duration-115 hover:bg-(--glass-1)"
	style="grid-template-columns:1fr 80px 80px 120px 80px"
>
	<!-- name + icon -->
	<div class="flex min-w-0 items-center gap-3">
		{#if file.type === 'image' && file.url}
			<div class="h-8 w-8 shrink-0 overflow-hidden rounded-(--r-md)">
				<img
				    src={file.url}
					alt={file.name || ""}
					width="80"
					height="80"

				/>
			</div>
		{:else}
			<div
				class="flex h-8 w-8 shrink-0 items-center justify-center rounded-(--r-md) text-[10px] font-bold"
				style="background:{fc}20;border:1px solid {fc}40;color:{fc}"
			>
				{fileLabels[file.type] ?? 'FILE'}
			</div>
		{/if}
		<div class="flex min-w-0 flex-col gap-0.5">
			<span
				class="truncate text-[13px] font-medium tracking-[-0.01em] text-(--text-primary) transition-colors duration-[115ms] group-hover:text-(--iris-300)"
				>{file.name}</span
			>
			<div class="flex items-center gap-2">
				<!-- {#if file.shared}
					<span
						class="flex items-center gap-0.5 text-[10.5px]"
						style="color:var(--orbit-400)"
					>
						<svg viewBox="0 0 16 16" fill="none" class="h-2.5 w-2.5"
							><path
								d="M11 14v-1.5a3 3 0 00-3-3H4a3 3 0 00-3 3V14"
								stroke="currentColor"
								stroke-width="1.3"
								stroke-linecap="round"
							/><circle
								cx="6"
								cy="5"
								r="2.5"
								stroke="currentColor"
								stroke-width="1.3"
							/><path
								d="M15 14v-1.5a3 3 0 00-2-2.8M10 2.2a3 3 0 010 5.6"
								stroke="currentColor"
								stroke-width="1.3"
								stroke-linecap="round"
							/></svg
						>
						Shared
					</span>
				{/if} -->
				{#if file.starred}
					<span
						class="flex items-center gap-0.5 text-[10.5px]"
						style="color:var(--solar-400)"
					>
						<svg viewBox="0 0 16 16" fill="currentColor" class="h-2.5 w-2.5"
							><path
								d="M8 1.5l1.9 3.8 4.2.6-3 2.9.7 4.2L8 11l-3.8 2 .7-4.2-3-2.9 4.2-.6z"
							/></svg
						>
					</span>
				{/if}
			</div>
		</div>
	</div>

	<!-- type badge -->
	<span
		class="w-fit rounded-(--r-full) px-2 py-0.5 text-[11px] font-semibold"
		style="background:{fc}18;color:{fc}">{fileLabels[file.type] ?? 'FILE'}</span
	>

	<!-- size -->
	<span class="text-[12.5px] text-(--text-tertiary) tabular-nums">{file.size}</span>

	<!-- modified + owner -->
	<!-- <div class="flex flex-col gap-0.5">
		<span class="text-[12.5px] text-(--text-secondary)">{file.modified}</span>
	</div> -->

	<!-- actions -->
	<div
		class="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-115 group-hover:opacity-100"
	>
		<button
			class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent text-(--text-muted) transition-[background,color] duration-[115ms] hover:bg-(--glass-3) hover:text-(--text-secondary)"
			aria-label="Download"
		>
			<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5"
				><path
					d="M8 3v8M4 8l4 4 4-4"
					stroke="currentColor"
					stroke-width="1.4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/><path
					d="M2 13h12"
					stroke="currentColor"
					stroke-width="1.4"
					stroke-linecap="round"
				/></svg
			>
		</button>

		<!-- <ShareBtn /> -->
		<button
			class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent text-(--text-muted) transition-[background,color] duration-[115ms] hover:bg-(--glass-3) hover:text-(--text-secondary)"
			aria-label="More options"
		>
			<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5"
				><circle cx="8" cy="3.5" r="1" fill="currentColor" /><circle
					cx="8"
					cy="8"
					r="1"
					fill="currentColor"
				/><circle cx="8" cy="12.5" r="1" fill="currentColor" /></svg
			>
		</button>
	</div>
</div>
