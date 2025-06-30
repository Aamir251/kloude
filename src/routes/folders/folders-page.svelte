<script lang="ts">
  import FilesList from '@/components/modules/files/files-list.svelte';
  import FoldersList from '@/components/modules/folders/folders-list.svelte';

  let { folders, files } = $props()
0
  let hasFiles : boolean = $state(false)

</script>


<div class="pt-16" has-files="{hasFiles}">
  {#await folders}
    <h3>Loading Folders</h3> 
  {:then resp}
    {#if resp.error}
      <h3>ERRORRRRRR {resp.error}</h3>
    {:else}
      <FoldersList folders={resp.data!} />
    {/if}
  {/await}

  {#await files}
    <h3>Loading Files</h3> 
  {:then resp}
    {#if resp.error}
      <h3>ERRORRRRRR {resp.error}</h3>
    {:else}
      <FilesList files={resp.data!} bind:hasFiles  />
    {/if}
  {/await}
</div>



