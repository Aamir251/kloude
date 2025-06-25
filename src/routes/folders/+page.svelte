<script lang="ts">
  import FoldersList from '@/components/modules/folders-list.svelte';
  import NotFound from '@/components/ui/file/not-found.svelte';

  const { data } = $props();

  type FolderType = {
    name: string;
    id: string;
  };


</script>

<style>
  section .not-found:last-child {
    display: none;
  }
</style>

<section>
  {#await data.folders}
    <h3>Loading Folders</h3> 
  {:then resp}
    {#if resp.error}
      <h3>ERRORRRRRR {resp.error}</h3>
    {:else}
      <FoldersList folders={resp.folders!} />
    {/if}
  {/await}

  {#await data.files}
    <h3>Loading Files</h3> 
  {:then resp}
    {#if resp.error}
      <h3>ERRORRRRRR {resp.error}</h3>
    {:else}
      {@render files(resp.files!)}
    {/if}
  {/await}
</section>



  {#snippet files(files: FolderType[])}
    {#if files.length}
      {#each files as file}
        <h4>{file.name}</h4>
      {/each}
    {:else}
      <div class="not-found">
        <NotFound />
      </div>
    {/if}
  {/snippet}

