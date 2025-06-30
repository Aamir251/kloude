<script lang="ts">
import FoldersPage from '../folders-page.svelte';

  let { data } = $props();
  
</script>

<div class="translate-y-4 font-medium">
  {#await data.currentFolder}
    <h4>Loading Folder name</h4>
  {:then resp} 
    {#if resp.data?.length}
      <h4>{resp.data[0].name}</h4>
    {/if}
  {/await}
</div>
<FoldersPage files={data.files} folders={data.folders} />