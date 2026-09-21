<script lang="ts">
	import { fly, fade } from 'svelte/transition';
	import {
		upload,
		closeUploadDialog,
		addUploadFiles,
		cancelUpload,
		removeUpload,
		clearCompletedUploads
	} from '$lib/stores/upload-manager.svelte';
	import { getFileKind, fileIcons, fileColors, formatBytes } from '$components/file/constants';
	import ProgressBar from '$components/ui/ProgressBar.svelte';

	let dragOver = $state(false);
	let inputEl: HTMLInputElement | undefined = $state();

	function onFilesPicked(fileList: FileList | null) {
	    console.log({ fileList })
		if (fileList && fileList.length) addUploadFiles(fileList);
	}

	function onDrop(e: DragEvent) {
		e.preventDefault();
		dragOver = false;
		onFilesPicked(e.dataTransfer?.files ?? null);
	}
</script>

{#if upload.isOpen}
	<div
		class="fixed inset-0 z-40 bg-black/45"
		onclick={() => closeUploadDialog()}
		transition:fade={{ duration: 180 }}
		role="presentation"
	></div>

	<aside
		class="fixed top-0 right-0 z-50 flex h-screen w-full max-w-150 flex-col border-l border-(--border-default)"
		style="background:rgb(15 12 26 / 96%);backdrop-filter:blur(32px) saturate(160%);-webkit-backdrop-filter:blur(32px) saturate(160%)"
		transition:fly={{ x: 400, duration: 280, opacity: 1 }}
	>
		<!-- header -->
		<div
			class="flex shrink-0 items-center justify-between border-b border-(--border-subtle) px-5 py-4"
		>
			<span class="text-[15px] font-semibold tracking-[-0.02em] text-(--text-primary)"
				>Upload files</span
			>
			<button
				onclick={() => closeUploadDialog()}
				aria-label="Close"
				class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent text-(--text-muted) transition-colors duration-115 hover:bg-(--glass-2) hover:text-(--text-secondary)"
			>
				<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5">
					<path
						d="M4 4l8 8M12 4l-8 8"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
				</svg>
			</button>
		</div>

		<div class="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto p-5">
			<!-- dropzone -->
			<button
				type="button"
				onclick={() => inputEl?.click()}
				ondragover={(e) => {
					e.preventDefault();
					dragOver = true;
				}}
				ondragleave={() => (dragOver = false)}
				ondrop={onDrop}
				class="flex w-full cursor-pointer flex-col items-center justify-center gap-2.5 rounded-(--r-xl) border-2 border-dashed p-6 text-center transition-[border-color,background] duration-210"
				style={dragOver
					? 'border-color:rgba(99,102,241,0.60);background:rgba(99,102,241,0.08)'
					: 'border-color:var(--border-default);background:rgba(255,255,255,0.02)'}
			>
				<div
					class="flex h-10 w-10 items-center justify-center rounded-(--r-lg) border border-(--border-default)"
					style="background:rgba(99,102,241,0.08);color:var(--iris-400)"
				>
					<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5">
						<path
							d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
						<path
							d="M17 8l-5-5-5 5M12 3v12"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
							stroke-linejoin="round"
						/>
					</svg>
				</div>
				<div>
					<p class="m-0 text-[13px] font-medium text-(--text-secondary)">Drop files here</p>
					<p class="m-0 mt-0.5 text-[12px] text-(--text-muted)">
						or <span class="font-medium" style="color:var(--iris-400)">browse to upload</span>
					</p>
				</div>
				<p class="m-0 text-[11px] text-(--text-muted)">Max 5 GB per file</p>
			</button>
			<input
				bind:this={inputEl}
				type="file"
				multiple
				class="hidden"
				onchange={(e) => onFilesPicked((e.currentTarget as HTMLInputElement).files)}
			/>

			<!-- queue -->
			{#if upload.items.length > 0}
				<div class="flex flex-col gap-1.5">
					<div class="flex items-center justify-between px-0.5">
						<span class="text-[11px] font-semibold tracking-[0.06em] text-(--text-muted) uppercase"
							>Queue ({upload.items.length})</span
						>
						<button
							onclick={() => clearCompletedUploads()}
							class="cursor-pointer border-none bg-transparent p-0 text-[11.5px] font-medium text-(--iris-400) transition-colors duration-115 hover:text-(--iris-300)"
							>Clear completed</button
						>
					</div>

					{#each upload.items as item (item.id)}
						{@const kind = getFileKind({ type: item.type, name: item.name })}
						{@const color = fileColors[kind]}
						<div
							class="flex flex-col gap-2 rounded-(--r-lg) border border-(--border-subtle) bg-(--glass-1) p-3"
						>
							<div class="flex items-center gap-2.5">
								<div
									class="flex h-8 w-8 shrink-0 items-center justify-center rounded-(--r-md)"
									style="background:{color}20;border:1px solid {color}40;color:{color}"
								>
									<svg viewBox="0 0 24 24" fill="none" class="h-4 w-4">{@html fileIcons[kind]}</svg>
								</div>
								<div class="flex min-w-0 flex-1 flex-col gap-0.5">
									<span
										class="truncate text-[12.5px] font-medium text-(--text-primary)"
										title={item.name}>{item.name}</span
									>
									<span class="text-[11px] text-(--text-muted)">
										{formatBytes(item.size)}
										{#if item.status === 'error'}
											<span style="color:var(--nova-400)"> · {item.errorMsg ?? 'Failed'}</span>
										{:else if item.status === 'canceled'}
											<span class="text-(--text-muted)"> · Canceled</span>
										{/if}
									</span>
								</div>

								{#if item.status === 'uploading'}
									<button
										onclick={() => cancelUpload(item.id)}
										aria-label="Cancel upload"
										class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent text-(--text-muted) transition-colors duration-115 hover:bg-(--glass-3) hover:text-(--text-secondary)"
									>
										<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3">
											<path
												d="M4 4l8 8M12 4l-8 8"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
											/>
										</svg>
									</button>
								{:else if item.status === 'done'}
									<span style="color:var(--aurora-400)">
										<svg viewBox="0 0 16 16" fill="none" class="h-4 w-4">
											<path
												d="M3 8.5l3.2 3.2L13 4.5"
												stroke="currentColor"
												stroke-width="1.6"
												stroke-linecap="round"
												stroke-linejoin="round"
											/>
										</svg>
									</span>
								{:else}
									<button
										onclick={() => removeUpload(item.id)}
										aria-label="Remove"
										class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent text-(--text-muted) transition-colors duration-115 hover:bg-(--glass-3) hover:text-(--text-secondary)"
									>
										<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3">
											<path
												d="M4 4l8 8M12 4l-8 8"
												stroke="currentColor"
												stroke-width="1.5"
												stroke-linecap="round"
											/>
										</svg>
									</button>
								{/if}
							</div>

							<ProgressBar
								value={item.progress}
								max={100}
								size="xs"
								animated={item.status === 'uploading'}
								variant={item.status === 'error'
									? 'danger'
									: item.status === 'done'
										? 'success'
										: item.status === 'canceled'
											? 'warning'
											: 'primary'}
							/>
						</div>
					{/each}
				</div>
			{/if}
		</div>
	</aside>
{/if}
