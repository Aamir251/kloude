<script lang="ts">
	import { Avatar, Badge, Button, ProgressBar } from '$components/ui';
	import { openUploadDialog } from '$lib/stores/upload-manager.svelte';

	const stats = [
		{
			label: 'Total Storage',
			value: '100 GB',
			sub: '68.4 GB used',
			icon: `<ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="1.5"/><path d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/><path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke="currentColor" stroke-width="1.5"/>`,
			gradient: 'var(--grad-nebula)',
			glow: 'rgba(99,102,241,0.28)',
			trend: '+2.4 GB this week',
			trendUp: true
		},
		{
			label: 'Total Files',
			value: '4,821',
			sub: '312 added this month',
			icon: `<path d="M13 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M13 2v7h7" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
			gradient: 'var(--grad-aurora)',
			glow: 'rgba(6,182,212,0.24)',
			trend: '+48 yesterday',
			trendUp: true
		},
		{
			label: 'Shared with me',
			value: '237',
			sub: '14 awaiting review',
			icon: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
			gradient: 'var(--grad-cosmos)',
			glow: 'rgba(168,85,247,0.24)',
			trend: '+3 today',
			trendUp: true
		},
		{
			label: 'Starred',
			value: '89',
			sub: 'Quick-access files',
			icon: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`,
			gradient: 'var(--grad-solar)',
			glow: 'rgba(245,158,11,0.24)',
			trend: '5 starred this week',
			trendUp: true
		}
	];

	const recentFiles = [
		{
			name: 'Q4 Report Final.pdf',
			type: 'pdf',
			size: '4.2 MB',
			modified: '2 min ago',
			shared: true,
			starred: true
		},
		{
			name: 'Brand Assets.zip',
			type: 'zip',
			size: '128 MB',
			modified: '1 hr ago',
			shared: false,
			starred: false
		},
		{
			name: 'Hero Video.mp4',
			type: 'video',
			size: '340 MB',
			modified: '3 hrs ago',
			shared: true,
			starred: false
		},
		{
			name: 'Design System.fig',
			type: 'figma',
			size: '18.7 MB',
			modified: 'Yesterday',
			shared: true,
			starred: true
		},
		{
			name: 'API Docs.md',
			type: 'doc',
			size: '82 KB',
			modified: 'Yesterday',
			shared: false,
			starred: false
		},
		{
			name: 'Product Photos.zip',
			type: 'zip',
			size: '2.1 GB',
			modified: '2 days ago',
			shared: false,
			starred: false
		}
	];

	const storageBreakdown = [
		{ label: 'Videos', value: 24.1, pct: 35, color: 'var(--grad-cosmos)' },
		{ label: 'Images', value: 18.3, pct: 27, color: 'var(--grad-aurora)' },
		{ label: 'Documents', value: 14.8, pct: 22, color: 'var(--grad-nebula)' },
		{ label: 'Other', value: 11.2, pct: 16, color: 'var(--grad-solar)' }
	];

	const activity = [
		{
			action: 'uploaded',
			file: 'Q4 Report Final.pdf',
			user: 'You',
			time: '2 min ago',
			initials: 'AM',
			badge: 'success' as const
		},
		{
			action: 'shared',
			file: 'Design System.fig',
			user: 'Sara Chen',
			time: '1 hr ago',
			initials: 'SC',
			badge: 'primary' as const
		},
		{
			action: 'commented on',
			file: 'Hero Video.mp4',
			user: 'Jake Reeves',
			time: '3 hrs ago',
			initials: 'JR',
			badge: 'orbit' as const
		},
		{
			action: 'starred',
			file: 'Q4 Report Final.pdf',
			user: 'You',
			time: 'Yesterday',
			initials: 'AM',
			badge: 'warning' as const
		},
		{
			action: 'deleted',
			file: 'Old Assets.zip',
			user: 'You',
			time: '2 days ago',
			initials: 'AM',
			badge: 'danger' as const
		}
	];

	const fileColors: Record<string, string> = {
		pdf: '#ef4444',
		zip: '#f59e0b',
		video: '#8b5cf6',
		figma: '#06b6d4',
		doc: '#6366f1'
	};
	const fileLabels: Record<string, string> = {
		pdf: 'PDF',
		zip: 'ZIP',
		video: 'MP4',
		figma: 'FIG',
		doc: 'DOC'
	};

	const quickActions = [
		{
			label: 'Upload files',
			desc: 'Add files to your drive',
			color: 'var(--grad-nebula)',
			glow: 'rgba(99,102,241,0.3)',
			icon: `<path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M17 8l-5-5-5 5M12 3v12" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'New folder',
			desc: 'Organise your workspace',
			color: 'var(--grad-aurora)',
			glow: 'rgba(6,182,212,0.3)',
			icon: `<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v8a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 11v6M9 14h6" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'Share a file',
			desc: 'Invite teammates',
			color: 'var(--grad-cosmos)',
			glow: 'rgba(168,85,247,0.3)',
			icon: `<path d="M4 12v8a2 2 0 002 2h12a2 2 0 002-2v-8" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M16 6l-4-4-4 4M12 2v13" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'Scan & upload',
			desc: 'Use your camera',
			color: 'var(--grad-forest)',
			glow: 'rgba(16,185,129,0.3)',
			icon: `<rect x="3" y="3" width="18" height="18" rx="2" stroke="currentColor" stroke-width="1.5"/><path d="M9 9h.01M15 9h.01M9 15h.01M15 15h.01" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`
		}
	];
</script>

<div class="flex h-full flex-col overflow-y-auto">
	<!-- ── Topbar ─────────────────────────────────────────── -->
	<header
		class="sticky top-0 z-20 flex shrink-0 items-center justify-between gap-4 border-b border-(--border-subtle) px-8 py-4"
		style="background:rgba(7,11,24,0.72);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)"
	>
		<div class="min-w-0">
			<h1 class="m-0 text-[22px] leading-tight font-bold tracking-[-0.04em] text-(--text-primary)">
				Good morning, Alex 👋
			</h1>
			<p class="m-0 mt-0.5 text-[13px] text-(--text-secondary)">
				Here's what's happening with your files today.
			</p>
		</div>

		<div class="flex shrink-0 items-center gap-3">
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
					class="h-9 w-52 rounded-(--r-md) border border-(--border-default) bg-(--glass-2) pr-4 pl-9 text-[13px] text-(--text-primary) transition-[background,border-color,box-shadow] duration-[210ms] outline-none placeholder:text-(--text-muted) focus:border-[rgba(99,102,241,0.60)] focus:bg-(--glass-3) focus:shadow-[0_0_0_3px_rgba(99,102,241,0.10)]"
				/>
			</div>

			<!-- notifications bell -->
			<button
				class="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-(--r-md) border border-(--border-default) bg-(--glass-2) text-(--text-secondary) transition-[background,color] duration-[115ms] hover:bg-(--glass-3) hover:text-(--text-primary)"
				aria-label="Notifications"
			>
				<svg viewBox="0 0 20 20" fill="none" class="h-4.5 w-4.5">
					<path
						d="M10 2a6 6 0 00-6 6v3l-1.5 2.5A.5.5 0 003 14h14a.5.5 0 00.4-.8L16 11V8a6 6 0 00-6-6z"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<path
						d="M8 14a2 2 0 004 0"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
					/>
				</svg>
				<span
					class="absolute top-1.5 right-1.5 h-2 w-2 rounded-full border-2 border-[var(--bg-base)]"
					style="background:var(--iris-500)"
				></span>
			</button>

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

	<!-- ── Page body ──────────────────────────────────────── -->
	<div class="flex flex-col gap-6 p-8">
		<!-- Stat cards -->
		<div class="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
			{#each stats as stat}
				<div
					class="group relative flex cursor-default flex-col gap-4 overflow-hidden rounded-(--r-xl) border border-(--border-default) p-5 transition-[border-color,transform] duration-[210ms] hover:-translate-y-0.5 hover:border-(--border-strong)"
					style="background:rgba(255,255,255,0.04);backdrop-filter:blur(20px);-webkit-backdrop-filter:blur(20px)"
				>
					<!-- shine -->
					<div
						class="pointer-events-none absolute top-0 right-[15%] left-[15%] h-px"
						style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.14),transparent)"
					></div>
					<!-- ambient glow -->
					<div
						class="pointer-events-none absolute -top-8 -right-8 h-28 w-28 rounded-full opacity-60 transition-opacity duration-[380ms] group-hover:opacity-100"
						style="filter:blur(32px);background:{stat.glow}"
					></div>

					<div class="relative flex items-start justify-between gap-3">
						<div class="flex flex-col gap-1.5">
							<p
								class="m-0 text-[11px] font-semibold tracking-[0.07em] text-(--text-muted) uppercase"
							>
								{stat.label}
							</p>
							<p
								class="m-0 text-[28px] leading-none font-bold tracking-[-0.04em] text-(--text-primary)"
							>
								{stat.value}
							</p>
						</div>
						<div
							class="flex h-10 w-10 shrink-0 items-center justify-center rounded-(--r-lg) border border-(--border-default)"
							style="background:{stat.gradient};box-shadow:0 0 18px {stat.glow}"
						>
							<svg viewBox="0 0 24 24" fill="none" class="h-5 w-5 text-white">{@html stat.icon}</svg
							>
						</div>
					</div>

					<div class="relative flex flex-col gap-0.5">
						<p class="m-0 text-[12px] text-(--text-muted)">{stat.sub}</p>
						<p class="m-0 text-[11.5px] font-medium" style="color:var(--aurora-400)">
							{stat.trend}
						</p>
					</div>
				</div>
			{/each}
		</div>

		<!-- Middle row -->
		<div class="grid grid-cols-1 gap-5 xl:grid-cols-[1fr_308px]">
			<!-- Recent files card -->
			<div
				class="flex flex-col overflow-hidden rounded-(--r-xl) border border-(--border-default)"
				style="background:rgba(255,255,255,0.038);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)"
			>
				<div class="flex items-center justify-between border-b border-(--border-subtle) px-5 py-4">
					<div class="flex items-center gap-2.5">
						<span class="text-[15px] font-semibold tracking-[-0.02em] text-(--text-primary)"
							>Recent Files</span
						>
						<Badge variant="default" size="sm">{recentFiles.length}</Badge>
					</div>
					<a
						href="/dashboard/files"
						class="flex items-center gap-1 text-[12px] font-medium text-(--iris-400) no-underline transition-colors duration-[115ms] hover:text-(--iris-300)"
					>
						View all
						<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3"
							><path
								d="M3 8h10M9 4l4 4-4 4"
								stroke="currentColor"
								stroke-width="1.5"
								stroke-linecap="round"
								stroke-linejoin="round"
							/></svg
						>
					</a>
				</div>

				<!-- column headers -->
				<div
					class="grid gap-4 border-b border-(--border-subtle) px-5 py-2"
					style="grid-template-columns:1fr 72px 96px 72px"
				>
					<span class="text-[10.5px] font-semibold tracking-[0.07em] text-(--text-muted) uppercase"
						>Name</span
					>
					<span
						class="text-right text-[10.5px] font-semibold tracking-[0.07em] text-(--text-muted) uppercase"
						>Size</span
					>
					<span
						class="hidden text-right text-[10.5px] font-semibold tracking-[0.07em] text-(--text-muted) uppercase sm:block"
						>Modified</span
					>
					<span
						class="text-right text-[10.5px] font-semibold tracking-[0.07em] text-(--text-muted) uppercase"
						>Actions</span
					>
				</div>

				<div class="divide-y divide-(--border-subtle)">
					{#each recentFiles as file}
						{@const fc = fileColors[file.type] ?? '#6366f1'}
						<div
							class="group grid cursor-pointer items-center gap-4 px-5 py-3.5 transition-[background] duration-[115ms] hover:bg-(--glass-1)"
							style="grid-template-columns:1fr 72px 96px 72px"
						>
							<div class="flex min-w-0 items-center gap-3">
								<div
									class="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--r-md) text-[10px] font-bold tracking-wide"
									style="background:{fc}20;border:1px solid {fc}40;color:{fc}"
								>
									{fileLabels[file.type] ?? 'FILE'}
								</div>
								<div class="flex min-w-0 flex-col gap-0.5">
									<span
										class="truncate text-[13.5px] font-medium tracking-[-0.01em] text-(--text-primary) transition-colors duration-[115ms] group-hover:text-(--iris-300)"
										>{file.name}</span
									>
									<div class="flex items-center gap-2">
										{#if file.shared}
											<span
												class="flex items-center gap-0.5 text-[10.5px]"
												style="color:var(--orbit-400)"
											>
												<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3"
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
										{/if}
										{#if file.starred}
											<span
												class="flex items-center gap-0.5 text-[10.5px]"
												style="color:var(--solar-400)"
											>
												<svg viewBox="0 0 16 16" fill="none" class="h-3 w-3"
													><path
														d="M8 1.5l1.9 3.8 4.2.6-3 2.9.7 4.2L8 11l-3.8 2 .7-4.2-3-2.9 4.2-.6z"
														stroke="currentColor"
														stroke-width="1.3"
														stroke-linecap="round"
														stroke-linejoin="round"
													/></svg
												>
												Starred
											</span>
										{/if}
									</div>
								</div>
							</div>

							<span class="text-right text-[12.5px] text-(--text-tertiary) tabular-nums"
								>{file.size}</span
							>
							<span class="hidden text-right text-[12.5px] text-(--text-muted) sm:block"
								>{file.modified}</span
							>

							<div
								class="flex items-center justify-end gap-1 opacity-0 transition-opacity duration-[115ms] group-hover:opacity-100"
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
					{/each}
				</div>
			</div>

			<!-- Right column -->
			<div class="flex flex-col gap-5">
				<!-- Storage breakdown -->
				<div
					class="flex flex-col overflow-hidden rounded-(--r-xl) border border-(--border-default)"
					style="background:rgba(255,255,255,0.038);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)"
				>
					<div
						class="flex items-center justify-between border-b border-(--border-subtle) px-5 py-4"
					>
						<span class="text-[15px] font-semibold tracking-[-0.02em] text-(--text-primary)"
							>Storage</span
						>
						<span class="text-[12px] text-(--text-muted) tabular-nums">68.4 / 100 GB</span>
					</div>
					<div class="flex flex-col gap-4 p-5">
						<!-- stacked bar -->
						<div class="flex h-2.5 overflow-hidden rounded-full">
							{#each storageBreakdown as seg}
								<div class="h-full" style="width:{seg.pct}%;background:{seg.color}"></div>
							{/each}
						</div>
						<ProgressBar value={68.4} max={100} variant="primary" size="xs" animated={false} />
						<!-- legend -->
						<div class="mt-1 flex flex-col gap-3">
							{#each storageBreakdown as seg}
								<div class="flex items-center justify-between">
									<div class="flex items-center gap-2">
										<span class="h-2 w-2 shrink-0 rounded-full" style="background:{seg.color}"
										></span>
										<span class="text-[13px] text-(--text-secondary)">{seg.label}</span>
									</div>
									<span class="text-[12px] text-(--text-tertiary) tabular-nums">{seg.value} GB</span
									>
								</div>
							{/each}
						</div>
						<div class="border-t border-(--border-subtle) pt-2">
							<Button variant="ghost" size="sm" class="w-full">Get more storage</Button>
						</div>
					</div>
				</div>

				<!-- Drop zone -->
				<button
					onclick={() => openUploadDialog()}
					class="group relative flex w-full cursor-pointer flex-col items-center justify-center gap-3 rounded-(--r-xl) border-2 border-dashed border-(--border-default) p-6 text-center transition-[border-color,background] duration-[210ms] hover:border-[rgba(99,102,241,0.42)] hover:bg-[rgba(99,102,241,0.04)]"
					style="background:rgba(255,255,255,0.02)"
				>
					<div
						class="flex h-11 w-11 items-center justify-center rounded-(--r-lg) border border-(--border-default) transition-[background,box-shadow] duration-[210ms] group-hover:shadow-[0_0_20px_rgba(99,102,241,0.28)]"
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
					<p class="m-0 text-[11px] text-(--text-muted)">Max 2 GB per file</p>
				</button>
			</div>
		</div>

		<!-- Bottom row -->
		<div class="grid grid-cols-1 gap-5 pb-8 xl:grid-cols-[1fr_272px]">
			<!-- Activity feed -->
			<!-- <div
				class="flex flex-col rounded-(--r-xl) border border-(--border-default) overflow-hidden"
				style="background:rgba(255,255,255,0.038);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)"
			>
				<div class="flex items-center justify-between px-5 py-4 border-b border-(--border-subtle)">
					<span class="text-[15px] font-semibold tracking-[-0.02em] text-(--text-primary)">Activity</span>
					<Badge variant="primary" size="sm">
						<span class="w-1.5 h-1.5 rounded-full bg-current mr-1.5 inline-block animate-pulse"></span>
						Live
					</Badge>
				</div>
				<div class="divide-y divide-[var(--border-subtle)]">
					{#each activity as event}
						<div class="flex items-start gap-3.5 px-5 py-4">
							<Avatar initials={event.initials} size="sm" />
							<div class="flex flex-col gap-0.5 flex-1 min-w-0">
								<p class="m-0 text-[13px] leading-snug">
									<span class="font-semibold text-(--text-primary)">{event.user}</span>
									<span class="text-(--text-secondary)"> {event.action} </span>
									<span class="font-medium" style="color:var(--iris-300)">{event.file}</span>
								</p>
								<span class="text-[11.5px] text-(--text-muted)">{event.time}</span>
							</div>
							<Badge variant={event.badge} size="sm">{event.action}</Badge>
						</div>
					{/each}
				</div>
			</div> -->

			<!-- Quick actions -->
			<!-- <div
				class="flex flex-col overflow-hidden rounded-(--r-xl) border border-(--border-default)"
				style="background:rgba(255,255,255,0.038);backdrop-filter:blur(24px);-webkit-backdrop-filter:blur(24px)"
			>
				<div class="border-b border-(--border-subtle) px-5 py-4">
					<span class="text-[15px] font-semibold tracking-[-0.02em] text-(--text-primary)"
						>Quick Actions</span
					>
				</div>
				<div class="flex flex-col gap-1.5 p-3">
					{#each quickActions as action}
						<button
							class="group flex w-full cursor-pointer items-center gap-3 rounded-(--r-lg) border border-transparent px-3 py-3 text-left transition-[background,border-color] duration-[115ms] hover:border-(--border-subtle) hover:bg-(--glass-2)"
							style="background:transparent"
						>
							<div
								class="flex h-9 w-9 shrink-0 items-center justify-center rounded-(--r-md) border border-(--border-default)"
								style="background:{action.color};box-shadow:0 0 14px {action.glow}"
							>
								<svg viewBox="0 0 24 24" fill="none" class="h-4.5 w-4.5 text-white"
									>{@html action.icon}</svg
								>
							</div>
							<div class="flex min-w-0 flex-1 flex-col">
								<span
									class="text-[13px] font-medium text-(--text-primary) transition-colors duration-[115ms] group-hover:text-(--iris-300)"
									>{action.label}</span
								>
								<span class="text-[11.5px] text-(--text-muted)">{action.desc}</span>
							</div>
							<svg
								viewBox="0 0 16 16"
								fill="none"
								class="h-3.5 w-3.5 shrink-0 text-(--text-muted) opacity-0 transition-opacity duration-[115ms] group-hover:opacity-100"
							>
								<path
									d="M5 8h6M8 5l3 3-3 3"
									stroke="currentColor"
									stroke-width="1.4"
									stroke-linecap="round"
									stroke-linejoin="round"
								/>
							</svg>
						</button>
					{/each}
				</div>
			</div> -->
		</div>
	</div>
</div>
