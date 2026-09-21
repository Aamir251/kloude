<script lang="ts">
	import { Image } from '@unpic/svelte/base';
	import { fileColors, fileIcons } from './constants';
	import { ipxTransform } from '$lib/ipx-transform';
	import type { FileType } from './types';

  type Props = {
    file : FileType
  }

  let { file } : Props = $props();

  const fc = $derived(fileColors[file.type] ?? fileColors.default);

  console.log({ file })

</script>

<div
		class="group relative flex cursor-pointer flex-col gap-2.5 rounded-(--r-xl) border border-(--border-default) p-3.5 transition-[border-color,transform,background] duration-[210ms] hover:-translate-y-0.5 hover:border-(--border-strong)"
		style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)"
	>
		<!-- shine -->
		<div
			class="pointer-events-none absolute top-0 right-[20%] left-[20%] h-px"
			style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.10),transparent)"
		></div>

		<!-- star btn -->
		<button
			class="absolute top-2.5 right-2.5 z-10 flex h-6 w-6 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent transition-[color,opacity] duration-[115ms]"
			style={file.starred
				? 'color:var(--solar-400);opacity:1'
				: 'color:var(--text-muted);opacity:0'}
			class:group-hover:opacity-100={!file.starred}
			aria-label={file.starred ? 'Unstar' : 'Star'}
		>
			<svg
				viewBox="0 0 16 16"
				fill={file.starred ? 'currentColor' : 'none'}
				class="h-3.5 w-3.5"
			>
				<path
					d="M8 1.5l1.9 3.8 4.2.6-3 2.9.7 4.2L8 11l-3.8 2 .7-4.2-3-2.9 4.2-.6z"
					stroke="currentColor"
					stroke-width="1.3"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>

		<!-- file icon / image thumbnail -->
		<div
			class="flex aspect-4/3 w-full items-center justify-center overflow-hidden rounded-(--r-lg) border border-(--border-subtle)"
			style="background:{fc}14"
		>
			{#if file.type === 'image' || file.type === "video" && file.url}
				<!-- <Image
					src={file.url}
					transformer={ipxTransform}
					layout="fullWidth"
					aspectRatio={4 / 3}
					objectFit="cover"
					alt={file.name}
					sizes="200px"
					class="h-full w-full"
				/> -->

				<img
			        src="{file.url}"
					alt="{file.name || ''}"
					class="object-cover w-full h-full"
				/>
			{:else}
				<div
					class="flex h-12 w-12 items-center justify-center rounded-(--r-lg) border"
					style="background:{fc}22;border-color:{fc}44;color:{fc}"
				>
					<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"
						>{@html fileIcons[file.type] ?? fileIcons.doc}</svg
					>
				</div>
			{/if}
		</div>

		<!-- name + meta -->
		<div class="flex flex-col gap-0.5">
			<p
				class="m-0 truncate text-[12.5px] font-medium tracking-[-0.01em] text-(--text-primary) transition-colors duration-[115ms] group-hover:text-(--iris-300)"
			>
				{file.name}
			</p>
			<p class="m-0 text-[11px] text-(--text-muted)">{file.size}</p>
		</div>

		<!-- hover actions -->
		<div
			class="flex items-center gap-1 border-t border-(--border-subtle) pt-1.5 opacity-0 transition-opacity duration-[115ms] group-hover:opacity-100"
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
		</div>
	</div>
