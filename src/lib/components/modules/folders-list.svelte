<script lang="ts">
    import Folder from "../icons/folder.svelte";
    import NotFound from "../ui/file/not-found.svelte";

  type FolderType = {
    id : string
    name : string
  }

  type Props = {
    folders : FolderType[]
  }

  let { folders } : Props = $props()

</script>


{#if folders.length}
  <div class="flex pt-10 flex-wrap gap-8">
    {#each folders as folder}
    <a href="/folders/{folder.id}" class="flex flex-col gap-1.5 py-3 px-8 rounded-md shadow border border-gray/20 justify-center items-center hover:text-gray transition">
      <Folder />
      <h3 class="text-sm font-medium">{folder.name}</h3>
    </a>

  {/each}
  </div>
{:else}
  <div class="not-found">
    <NotFound />
  </div>
{/if}
