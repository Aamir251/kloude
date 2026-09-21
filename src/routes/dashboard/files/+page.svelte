<script lang="ts">
	import { FileItem } from '$components/file';
	import { type FileType } from '$components/file/types';
	import Folder from '$components/folder/folder.svelte';
	import { type Folder as FolderType } from '$components/folder/types';
	import { Button } from '$components/ui';
	import { openUploadDialog } from '$lib/stores/upload-manager.svelte';

	type ViewMode = 'grid' | 'list';
	type SortKey = 'name' | 'size' | 'modified' | 'type';

	let viewMode = $state<ViewMode>('grid');
	let sortKey = $state<SortKey>('modified');
	let sortAsc = $state(false);
	let search = $state('');
	let selectedType = $state('all');

	const { data } = $props();

	const folders: FolderType[] = [
		{
			name: 'Design Assets',
			files: 142,
			size: '2.3 GB',
			modified: '2 min ago'
		},
		{
			name: 'Marketing',
			files: 87,
			size: '540 MB',
			modified: '1 hr ago'
		}
	];

	const typeFilters = [
		{ key: 'all', label: 'All files' },
		{ key: 'pdf', label: 'PDFs' },
		{ key: 'image', label: 'Images' },
		{ key: 'video', label: 'Videos' },
		{ key: 'figma', label: 'Figma' },
		{ key: 'doc', label: 'Docs' },
		{ key: 'sheet', label: 'Sheets' },
		{ key: 'zip', label: 'Archives' }
	];

	const filtered = $derived(
		data.files
			.filter((f) => selectedType === 'all' || f.type === selectedType)
			.filter((f) => !search || f.name.toLowerCase().includes(search.toLowerCase()))
			.sort((a, b) => {
				let cmp = 0;
				if (sortKey === 'name') cmp = a.name.localeCompare(b.name);
				else if (sortKey === 'size') cmp = a.sizeBytes - b.sizeBytes;
				else if (sortKey === 'type') cmp = a.type.localeCompare(b.type);
				return sortAsc ? cmp : -cmp;
			})
	);

	function toggleSort(key: SortKey) {
		if (sortKey === key) sortAsc = !sortAsc;
		else {
			sortKey = key;
			sortAsc = false;
		}
	}
</script>

<div class="flex h-full flex-col overflow-y-auto">
	<!-- ── Topbar ─────────────────────────────────────────── -->
	<header
		class="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-4 border-b border-(--border-subtle) px-8 py-4"
		style="background:rgba(7,11,24,0.72);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)"
	>
		<div class="flex min-w-0 items-center gap-2">
			<!-- breadcrumb -->
			<a
				href="/dashboard"
				class="text-[13px] text-(--text-muted) no-underline transition-colors duration-115 hover:text-(--text-secondary)"
				>Dashboard</a
			>
			<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5 shrink-0 text-(--text-muted)"
				><path
					d="M6 4l4 4-4 4"
					stroke="currentColor"
					stroke-width="1.4"
					stroke-linecap="round"
					stroke-linejoin="round"
				/></svg
			>
			<span class="text-[13px] font-semibold text-(--text-primary)">My Files</span>
		</div>

		<div class="flex shrink-0 items-center gap-2.5">
			<!-- search -->
			<div class="relative hidden items-center sm:flex">
				<span
					class="pointer-events-none absolute left-0 flex w-10 items-center justify-center text-(--text-tertiary)"
				>
					<svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
						<circle cx="9" cy="9" r="6" stroke="currentColor" stroke-width="1.4" />
						<path d="M15 15l3 3" stroke="currentColor" stroke-width="1.4" stroke-linecap="round" />
					</svg>
				</span>
				<input
					type="search"
					placeholder="Search files…"
					bind:value={search}
					class="h-9 w-52 rounded-(--r-md) border border-(--border-default) bg-(--glass-2) pr-4 pl-9 text-[13px] text-(--text-primary) transition-[background,border-color,box-shadow] duration-[210ms] outline-none placeholder:text-(--text-muted) focus:border-[rgba(99,102,241,0.60)] focus:bg-(--glass-3) focus:shadow-[0_0_0_3px_rgba(99,102,241,0.10)]"
				/>
			</div>

			<!-- view toggle -->
			<div
				class="flex items-center gap-0.5 rounded-(--r-md) border border-(--border-default) bg-(--glass-2) p-0.5"
			>
				<button
					onclick={() => (viewMode = 'grid')}
					class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-none transition-[background,color] duration-115"
					style={viewMode === 'grid'
						? 'background:var(--glass-4);color:var(--text-primary)'
						: 'background:transparent;color:var(--text-muted)'}
					aria-label="Grid view"
				>
					<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5">
						<rect
							x="1"
							y="1"
							width="6"
							height="6"
							rx="1"
							stroke="currentColor"
							stroke-width="1.4"
						/>
						<rect
							x="9"
							y="1"
							width="6"
							height="6"
							rx="1"
							stroke="currentColor"
							stroke-width="1.4"
						/>
						<rect
							x="1"
							y="9"
							width="6"
							height="6"
							rx="1"
							stroke="currentColor"
							stroke-width="1.4"
						/>
						<rect
							x="9"
							y="9"
							width="6"
							height="6"
							rx="1"
							stroke="currentColor"
							stroke-width="1.4"
						/>
					</svg>
				</button>
				<button
					onclick={() => (viewMode = 'list')}
					class="flex h-7 w-7 cursor-pointer items-center justify-center rounded-md border-none transition-[background,color] duration-115"
					style={viewMode === 'list'
						? 'background:var(--glass-4);color:var(--text-primary)'
						: 'background:transparent;color:var(--text-muted)'}
					aria-label="List view"
				>
					<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5">
						<path
							d="M2 4h12M2 8h12M2 12h12"
							stroke="currentColor"
							stroke-width="1.4"
							stroke-linecap="round"
						/>
					</svg>
				</button>
			</div>

			<Button variant="primary" size="sm" onclick={() => openUploadDialog()}>
				<svg viewBox="0 0 20 20" fill="none" class="mr-1.5 h-4 w-4 shrink-0">
					<path
						d="M10 3v14M3 10h14"
						stroke="currentColor"
						stroke-width="2"
						stroke-linecap="round"
					/>
				</svg>
				Upload
			</Button>
		</div>
	</header>

	<div class="flex flex-col gap-6 p-8">
		<!-- ── Folders ───────────────────────────────────────── -->
		<section>
			<div class="mb-4 flex items-center justify-between">
				<h2
					class="m-0 text-[13px] font-semibold tracking-[0.06em] text-(--text-secondary) uppercase"
				>
					Folders
				</h2>
				<button
					class="flex cursor-pointer items-center gap-1.5 rounded-(--r-md) border border-(--border-subtle) bg-transparent px-3 py-1.5 text-[12px] font-medium text-(--text-muted) transition-[background,color,border-color] duration-[115ms] hover:border-(--border-default) hover:bg-(--glass-2) hover:text-(--text-secondary)"
				>
					<svg viewBox="0 0 16 16" fill="none" class="h-3.5 w-3.5"
						><path
							d="M8 3v10M3 8h10"
							stroke="currentColor"
							stroke-width="1.5"
							stroke-linecap="round"
						/></svg
					>
					New folder
				</button>
			</div>
			<div class="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
				{#each folders as folder}
					<Folder {...folder} />
				{/each}
			</div>
		</section>

		<!-- ── Files section ─────────────────────────────────── -->
		<section class="flex flex-col gap-4 pb-8">
			<!-- section header + filter pills -->
			<div class="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
				<h2
					class="m-0 text-[13px] font-semibold tracking-[0.06em] text-(--text-secondary) uppercase"
				>
					Files <span class="font-normal tracking-normal text-(--text-muted) normal-case"
						>({filtered.length})</span
					>
				</h2>
				<!-- type filters -->
				<div class="flex flex-wrap items-center gap-1.5">
					{#each typeFilters as tf}
						<button
							onclick={() => (selectedType = tf.key)}
							class="cursor-pointer rounded-(--r-full) border px-2.5 py-1 text-[12px] font-medium transition-[background,color,border-color] duration-[115ms]"
							style={selectedType === tf.key
								? 'background:rgba(99,102,241,0.15);color:var(--iris-300);border-color:rgba(99,102,241,0.30)'
								: 'background:transparent;color:var(--text-muted);border-color:var(--border-subtle)'}
							>{tf.label}</button
						>
					{/each}
				</div>
			</div>

			<!-- ── Grid view ── -->
			{#if viewMode === 'grid'}
				{#if filtered.length === 0}
					<div class="flex flex-col items-center justify-center gap-3 py-20 text-center">
						<div
							class="flex h-12 w-12 items-center justify-center rounded-(--r-xl) border border-(--border-default) text-(--text-muted)"
							style="background:var(--glass-2)"
						>
							<svg viewBox="0 0 24 24" fill="none" class="h-6 w-6"
								><path
									d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/><path
									d="M13 2v7h7"
									stroke="currentColor"
									stroke-width="1.5"
									stroke-linecap="round"
									stroke-linejoin="round"
								/></svg
							>
						</div>
						<p class="m-0 text-[14px] font-medium text-(--text-secondary)">No files found</p>
						<p class="m-0 text-[12px] text-(--text-muted)">Try adjusting your search or filter</p>
					</div>
				{:else}
					<div
						class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
					>
						{#each filtered as file}
							<FileItem {file} viewType="grid" />
						{/each}
					</div>
				{/if}

				<!-- ── List view ── -->
			{:else}
				<div
					class="flex flex-col overflow-hidden rounded-(--r-xl) border border-(--border-default)"
					style="background:rgba(255,255,255,0.038);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)"
				>
					<!-- column headers -->
					<div
						class="grid gap-4 border-b border-(--border-subtle) px-5 py-2.5"
						style="grid-template-columns:1fr 80px 80px 120px 80px"
					>
						{#each [['name', 'Name'], ['type', 'Type'], ['size', 'Size'], ['modified', 'Modified']] as const as [key, label]}
							<button
								onclick={() => toggleSort(key as SortKey)}
								class="flex cursor-pointer items-center gap-1 border-none bg-transparent p-0 text-[10.5px] font-semibold tracking-[0.07em] uppercase transition-colors duration-[115ms]"
								style={sortKey === key ? 'color:var(--iris-300)' : 'color:var(--text-muted)'}
							>
								{label}
								{#if sortKey === key}
									<svg
										viewBox="0 0 12 12"
										fill="none"
										class="h-3 w-3 transition-transform duration-115"
										style="transform:rotate({sortAsc ? '180deg' : '0deg'})"
									>
										<path
											d="M2 4l4 4 4-4"
											stroke="currentColor"
											stroke-width="1.4"
											stroke-linecap="round"
											stroke-linejoin="round"
										/>
									</svg>
								{/if}
							</button>
						{/each}
						<span
							class="text-right text-[10.5px] font-semibold tracking-[0.07em] text-(--text-muted) uppercase"
							>Actions</span
						>
					</div>

					{#if filtered.length === 0}
						<div class="flex flex-col items-center gap-2 py-16 text-center">
							<p class="m-0 text-[14px] font-medium text-(--text-secondary)">No files found</p>
							<p class="m-0 text-[12px] text-(--text-muted)">Try adjusting your search or filter</p>
						</div>
					{:else}
						<div class="divide-y divide-(--border-subtle)">
							{#each filtered as file}
								<FileItem {file} viewType="list" />
							{/each}
						</div>
					{/if}
				</div>
			{/if}
		</section>
	</div>
</div>
