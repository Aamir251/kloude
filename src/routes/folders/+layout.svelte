<script lang="ts">
  import { Sidebar } from '@/components/layout/sidebar';
  import CreateFolderBtn from './create-folder-btn.svelte';
  let { children } = $props()

</script>


<div class="flex">
  <div class="flex-2">
    <div class="relative">
      {@render children()}
      <CreateFolderBtn />
    </div>

  </div>

  <Sidebar  />
</div>


