<script lang="ts">
  import FoldersList from '@/components/modules/folders-list.svelte';
  import NotFound from '@/components/ui/file/not-found.svelte';
  import { toast } from 'svelte-sonner';

  const { data, form } = $props();

  type Folder = {
    name: string;
    id: string;
  };

  $effect(() => {
    if (form?.message) {
      toast.error(form.message)
    }
    if (form?.success) {
      toast.success('Folder Created!', { duration : 1200 })
    }
  })

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





  {#snippet files(files: Folder[])}
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

