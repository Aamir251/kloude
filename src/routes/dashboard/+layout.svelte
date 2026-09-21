<script lang="ts">
	import Sidebar from '$components/ui/Sidebar.svelte';
	import UploadDialog from '$components/upload/upload-dialog.svelte';
	import { page } from '$app/state';

	let { children, data } = $props();

	let sidebarCollapsed = $state(false);

	const initials = $derived(
		data.user.name
			.split(' ')
			.map((word) => word.charAt(0))
			.join('')
			.toUpperCase()
	);
</script>

<div class="flex min-h-screen" style="background:var(--grad-page)">
	<!-- ambient orbs -->
	<div
		class="pointer-events-none fixed rounded-full"
		style="width:700px;height:700px;top:-280px;left:-200px;filter:blur(120px);background:radial-gradient(circle,rgb(31 52 36 / 62%) 0%,transparent 70%);z-index:0"
	></div>
	<div
		class="pointer-events-none fixed rounded-full"
		style="width:560px;height:560px;bottom:-200px;right:-180px;filter:blur(120px);background:radial-gradient(circle,rgba(139,92,246,0.12) 0%,transparent 70%);z-index:0"
	></div>

	<div class="relative z-10 shrink-0">
		<Sidebar
			user={{
				email: data.user.email,
				name: data.user.name,
				initials
			}}
			bind:collapsed={sidebarCollapsed}
			activePath={page.url.pathname}
		/>
	</div>

	<main class="relative z-10 flex min-w-0 flex-1 flex-col overflow-hidden">
		{@render children()}
	</main>
</div>

<UploadDialog />
