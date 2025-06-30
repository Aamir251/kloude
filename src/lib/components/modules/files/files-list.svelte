<script lang="ts">
  import NotFound from "@/components/ui/file/not-found.svelte";
  import { getFileListItemIcon } from "@/utils/file-icon";
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import type { Tables } from "../../../../database.types";
    import DeleteFileDialog from "../dialogs/delete-file-dialog.svelte";

  let { files, hasFiles = $bindable() } = $props()
  
  if (files.length) {
    hasFiles = true
  }
  
  let selectedFile : string = $state("")
  let isDeleteFileDialogOpen : boolean = $state(false)

  const handleDeleteFileClick = (id : string) => {
    console.log({ id, isDeleteFileDialogOpen });
    
    selectedFile = id
    isDeleteFileDialogOpen = true
  }
  
</script>

{#if files?.length}
  <div class="flex pt-10 flex-wrap gap-8">
    {#each files as item}
      {@render file(item)}
    {/each}
  </div>
{:else}
  <div class="not-found">
    <NotFound />
  </div>
{/if}


{#snippet file(item : Tables<"files">)}
  <div class="py-3 pl-4 pr-1 rounded-md shadow border border-gray/20  w-72 flex justify-between">
    <div  class="flex items-center gap-x-5 hover:text-gray transition ">
      <div class="p-2.5 bg-gray/20 text-black rounded-md ">
        <div class="w-6 h-6 ">
          <img src="{getFileListItemIcon(item.type!)}" alt="{item.name}" />
        </div>
      </div>
      <h3 class="text-sm font-bold text-ellipsis line-clamp-2">{item.name}</h3>
    </div>
    <DropdownMenu.Root>
      <DropdownMenu.Trigger class="-translate-y-3 ">
        <span class="bg-white pl-3 pr-1 py-2 rounded-sm font-semibold transition hover:opacity-80 cursor-pointer ">•••</span>
      </DropdownMenu.Trigger>
      <DropdownMenu.Content>
        <DropdownMenu.Group class="font-medium">
          <DropdownMenu.Item onclick={handleDeleteFileClick.bind(null, item.id)}>Delete file</DropdownMenu.Item>
        </DropdownMenu.Group>
      </DropdownMenu.Content>
    </DropdownMenu.Root>
  </div>
{/snippet}


{#if selectedFile && isDeleteFileDialogOpen}
  <DeleteFileDialog fileId={selectedFile} isOpen={isDeleteFileDialogOpen} />
{/if}