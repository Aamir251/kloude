<script lang="ts">
    import FilesList from '@/components/modules/files/files-list.svelte';
  import FoldersList from '@/components/modules/folders/folders-list.svelte';
  import NotFound from '@/components/ui/file/not-found.svelte';
  import { onMount } from 'svelte';

  let { folders, files } = $props()
0
  type FolderType = {
    name: string;
    id: string;
  };

  let hasFiles : boolean = $state(false)


</script>


<div has-files="{hasFiles}">
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



