<script lang="ts">
  import FolderIcon from "../icons/folder.svelte";
  import NotFound from "../ui/file/not-found.svelte";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import DeleteFolderDialog from "./dialogs/delete-folder-dialog.svelte";

  type FolderType = {
    id : string
    name : string
  }

  type Props = {
    folders : FolderType[]
  }

  let { folders } : Props = $props()

  let isDeleteFolderDialogOpen = $state<boolean>(false)

  let selectedFolder = $state<string>('')

  const handleDeleteFolderClick = (id : string) => {
    selectedFolder = id
    isDeleteFolderDialogOpen = true
  }

</script>


{#if folders.length}
  <div class="flex pt-10 flex-wrap gap-8">
    {#each folders as item}
    {@render folder(item.id, item.name)}

  {/each}
  </div>
{:else}
  <div class="not-found">
    <NotFound />
  </div>
{/if}


{#snippet folder(id : string, name : string)}
  <div class="py-3 pl-4 pr-1 rounded-md shadow border border-gray/20  w-72 flex justify-between">
    <a href="/folders/{id}" class="flex items-center gap-x-5 hover:text-gray transition ">
      <div class="p-2.5 bg-gray/20 text-black rounded-md ">
        <div class="w-6 h-6 ">
          <FolderIcon />
        </div>
      </div>
      <h3 class="text-sm font-bold">{name}</h3>
    </a>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="-translate-y-3 ">
        <span class="bg-white pl-3 pr-1 py-2 rounded-sm font-semibold transition hover:opacity-80 cursor-pointer ">•••</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group class="font-medium">
          <DropdownMenu.Item onclick={handleDeleteFolderClick.bind(null, id)}>Delete folder</DropdownMenu.Item>
          <DropdownMenu.Item >Rename folder</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
{/snippet}


{#if isDeleteFolderDialogOpen && selectedFolder}
  <DeleteFolderDialog bind:isOpen={isDeleteFolderDialogOpen} folderId={selectedFolder} />
{/if}