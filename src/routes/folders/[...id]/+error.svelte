<script lang="ts">
	import { page } from '$app/state';
  import Button from '@/components/ui/button/button.svelte';

  let { message } = $props()
</script>

<div class="h-96 flex justify-center items-center flex-col gap-3">
  <h4 class="text-h4 font-medium">{page.error?.message || message}</h4>
  <Button href="/folders">
    Go Back
  </Button>
</div>