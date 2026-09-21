<script lang="ts">
	import Avatar from './Avatar.svelte';
	import ProgressBar from './ProgressBar.svelte';

	let {
		collapsed = $bindable(false),
		activePath = '/dashboard',
		user,
		storageUsed = 68.4,
		storageTotal = 100
	}: {
		collapsed?: boolean;
		activePath?: string;
		user?: { name: string; email: string; initials: string };
		storageUsed?: number;
		storageTotal?: number;
	} = $props();

	const navItems = [
		{
			label: 'Dashboard',
			href: '/dashboard',
			icon: `<path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M9 22V12h6v10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'My Files',
			href: '/dashboard/files',
			icon: `<path d="M3 7a2 2 0 012-2h4l2 2h8a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V7z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'Shared',
			href: '/dashboard/shared',
			icon: `<path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><circle cx="9" cy="7" r="4" stroke="currentColor" stroke-width="1.5"/><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'Starred',
			href: '/dashboard/starred',
			icon: `<path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'Recent',
			href: '/dashboard/recent',
			icon: `<circle cx="12" cy="12" r="10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/><path d="M12 6v6l4 2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		},
		{
			label: 'Trash',
			href: '/dashboard/trash',
			icon: `<path d="M3 6h18M19 6l-1 14H6L5 6M10 11v6M14 11v6M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>`
		}
	];

	const storagePct = $derived(Math.round((storageUsed / storageTotal) * 100));
	const storageVariant = $derived(
		storagePct > 85 ? 'danger' : storagePct > 65 ? 'warning' : 'primary'
	);
</script>

<aside
	class="relative flex min-h-screen shrink-0 flex-col overflow-hidden border-r border-(--border-default) transition-[width] duration-380 ease-(--ease-smooth)"
	style="width:{collapsed
		? '68px'
		: '240px'};background:rgb(28 12 29 / 34%) ;backdrop-filter:blur(32px) saturate(160%);-webkit-backdrop-filter:blur(32px) saturate(160%)"
>
	<!-- top shine -->
	<div
		class="pointer-events-none absolute top-0 right-0 left-0 h-px"
		style="background:linear-gradient(90deg,transparent,rgba(255,255,255,0.18),transparent)"
	></div>

	<!-- header -->
	<div class="flex items-center justify-between gap-2 px-3.5 pt-4.5 pb-3.5">
		<a href="/" class="flex min-w-0 flex-1 items-center gap-2.5 no-underline">
			<div
				class="flex h-8.5 w-8.5 shrink-0 items-center justify-center rounded-(--r-md) border border-(--border-default) bg-(--glass-2)"
				style="box-shadow:0 0 18px rgba(99,102,241,0.32),inset 0 1px 0 rgba(255,255,255,0.08)"
			>
				<svg viewBox="0 0 36 32" fill="none" class="h-4.5 w-5">
					<path
						d="M10 27C6.134 27 3 23.866 3 20c0-3.074 1.966-5.69 4.716-6.65A11 11 0 0 1 29 14.5l.1.003A7.5 7.5 0 0 1 29 29H10z"
						fill="url(#sb-g)"
					/>
					<path
						d="M15 23l3-4 3 4M18 19v8"
						stroke="white"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
					<defs>
						<linearGradient id="sb-g" x1="3" y1="8" x2="30" y2="30" gradientUnits="userSpaceOnUse">
							<stop stop-color="#6366f1" /><stop offset="1" stop-color="#8b5cf6" />
						</linearGradient>
					</defs>
				</svg>
			</div>
			{#if !collapsed}
				<span
					class="text-[17px] font-extrabold tracking-[-0.055em] whitespace-nowrap"
					style="background:linear-gradient(135deg,#a5b4fc 0%,#8b5cf6 100%);-webkit-background-clip:text;-webkit-text-fill-color:transparent;background-clip:text"
					>Kloude</span
				>
			{/if}
		</a>

		<button
			onclick={() => (collapsed = !collapsed)}
			aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
			class="flex h-7 w-7 shrink-0 cursor-pointer items-center justify-center rounded-(--r-sm) border border-(--border-subtle) bg-transparent text-(--text-tertiary) transition-[background,color,border-color] duration-115 hover:border-(--border-default) hover:bg-(--glass-2) hover:text-(--text-secondary)"
		>
			<svg
				viewBox="0 0 20 20"
				fill="none"
				class="h-3.5 w-3.5 transition-transform duration-380 ease-(--ease-smooth)"
				style="transform:rotate({collapsed ? '180deg' : '0deg'})"
			>
				<path
					d="M12 5l-5 5 5 5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	</div>

	<!-- divider -->
	<div class="mx-3.5 h-px shrink-0 bg-(--border-subtle)"></div>

	<!-- nav -->
	<nav class="flex flex-col gap-0.5 p-2.5 pt-3" aria-label="Main navigation">
		{#if !collapsed}
			<span
				class="mb-1.5 px-1.5 text-[10px] font-semibold tracking-[0.08em] text-(--text-muted) uppercase"
				>Navigation</span
			>
		{/if}
		{#each navItems as item}
			{@const active = activePath === item.href}
			<a
				href={item.href}
				title={collapsed ? item.label : undefined}
				class="relative flex items-center gap-2.5 rounded-(--r-md) p-2.5 text-[13.5px] font-medium tracking-[-0.01em] whitespace-nowrap no-underline transition-[background,color,border] duration-115"
				style={active
					? 'background:rgba(99,102,241,0.12);color:var(--iris-300);border:1px solid rgba(99,102,241,0.18)'
					: 'color:var(--iris-200);border:1px solid transparent'}
				onmouseenter={(e) => {
					if (!active) {
						(e.currentTarget as HTMLElement).style.background = 'var(--glass-2)';
					}
				}}
				onmouseleave={(e) => {
					if (!active) {
						(e.currentTarget as HTMLElement).style.background = '';
						(e.currentTarget as HTMLElement).style.color = 'var(--text-iris-200)';
					}
				}}
			>
				<span
					class="flex h-4.5 w-4.5 shrink-0 items-center justify-center"
					style={active ? 'color:var(--iris-400)' : ''}
				>
					<svg viewBox="0 0 24 24" fill="none" class="h-4.5 w-4.5">{@html item.icon}</svg>
				</span>
				{#if !collapsed}
					<span class="min-w-0 flex-1 overflow-hidden">{item.label}</span>
				{/if}
				{#if active && !collapsed}
					<span
						class="h-1.5 w-1.5 shrink-0 rounded-full"
						style="background:var(--grad-nebula);box-shadow:0 0 8px rgba(99,102,241,0.7)"
					></span>
				{/if}
			</a>
		{/each}
	</nav>

	<div class="flex-1"></div>

	<!-- storage widget -->
	{#if !collapsed}
		<div
			class="mx-2.5 mb-2 flex flex-col gap-2 rounded-(--r-lg) border border-(--border-subtle) bg-(--glass-2) p-3"
		>
			<div class="flex items-center justify-between">
				<span class="text-[12px] font-semibold text-(--text-secondary)">Storage</span>
				<span class="text-[11px] text-(--text-tertiary) tabular-nums"
					>{storageUsed} <span class="text-(--text-muted)">/ {storageTotal} GB</span></span
				>
			</div>
			<ProgressBar
				value={storageUsed}
				max={storageTotal}
				variant={storageVariant}
				size="sm"
				animated
			/>
			<p class="m-0 text-[11px] text-(--text-muted)">
				{100 - storagePct}% free ·
				<a
					href="/dashboard/upgrade"
					class="font-medium text-(--iris-400) no-underline transition-colors duration-115 hover:text-(--iris-300)"
					>Upgrade</a
				>
			</p>
		</div>
	{:else}
		<div
			class="relative mx-auto mb-2 flex h-10 w-10 items-center justify-center overflow-hidden rounded-(--r-md) border border-(--border-subtle) bg-(--glass-2)"
			title="Storage: {storagePct}% used"
		>
			<svg viewBox="0 0 24 24" fill="none" class="relative z-10 h-4.5 w-4.5 text-(--text-tertiary)">
				<ellipse cx="12" cy="5" rx="9" ry="3" stroke="currentColor" stroke-width="1.5" />
				<path
					d="M3 5v14c0 1.657 4.03 3 9 3s9-1.343 9-3V5"
					stroke="currentColor"
					stroke-width="1.5"
					stroke-linecap="round"
				/>
				<path d="M3 12c0 1.657 4.03 3 9 3s9-1.343 9-3" stroke="currentColor" stroke-width="1.5" />
			</svg>
			<span
				class="absolute right-0 bottom-0 left-0 bg-[rgba(99,102,241,0.22)] transition-[height] duration-600"
				style="height:{storagePct}%"
			></span>
		</div>
	{/if}

	<!-- divider -->
	<div class="mx-3.5 h-px shrink-0 bg-(--border-subtle)"></div>

	<!-- settings -->
	<div class="p-2.5">
		<a
			href="/dashboard/settings"
			title={collapsed ? 'Settings' : undefined}
			class="flex items-center gap-2.5 rounded-(--r-md) border border-transparent px-2 py-2 text-[13.5px] font-medium text-(--text-tertiary) no-underline transition-[background,color] duration-115 hover:bg-(--glass-2) hover:text-(--text-secondary)"
		>
			<span class="flex h-4.5 w-4.5 shrink-0 items-center justify-center">
				<svg viewBox="0 0 24 24" fill="none" class="h-4.5 w-4.5">
					<circle cx="12" cy="12" r="3" stroke="currentColor" stroke-width="1.5" />
					<path
						d="M19.07 4.93a9.97 9.97 0 010 14.14M4.93 4.93a9.97 9.97 0 000 14.14"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
					<path
						d="M12 2v2M12 20v2M2 12h2M20 12h2"
						stroke="currentColor"
						stroke-width="1.5"
						stroke-linecap="round"
					/>
				</svg>
			</span>
			{#if !collapsed}<span>Settings</span>{/if}
		</a>
	</div>

	<!-- divider -->
	<div class="mx-3.5 h-px shrink-0 bg-(--border-subtle)"></div>

	<!-- user -->
	<div class="flex items-center gap-2.5 px-3.5 py-3" class:justify-center={collapsed}>
		<Avatar initials={user.initials} size="sm" status="online" />
		{#if !collapsed}
			<div class="flex min-w-0 flex-1 flex-col">
				<span class="truncate text-[13px] font-semibold tracking-[-0.01em] text-(--text-primary)"
					>{user.name}</span
				>
				<span class="truncate text-[11px] text-(--text-muted)">{user.email}</span>
			</div>
			<button
				class="flex h-6 w-6 shrink-0 cursor-pointer items-center justify-center rounded-(--r-sm) border-none bg-transparent text-(--text-muted) transition-colors duration-115 hover:text-(--text-secondary)"
				aria-label="User menu"
			>
				<svg viewBox="0 0 20 20" fill="none" class="h-4 w-4">
					<path
						d="M5 8l5 5 5-5"
						stroke="currentColor"
						stroke-width="1.4"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	</div>
</aside>
