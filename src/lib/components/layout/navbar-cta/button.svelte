<script lang="ts">
  import * as DropdownMenu from "$lib/components/ui/dropdown-menu/index.js";
  import CreateFolderDialog from "@/components/modules/dialogs/create-folder-dialog.svelte";

  let folderDialogOpen : boolean = $state(false);

</script>

<DropdownMenu.Root>
  <DropdownMenu.Trigger >
    <span class="bg-white px-5 py-2 rounded-sm font-semibold transition hover:opacity-80 cursor-pointer">New</span>
  </DropdownMenu.Trigger>
  <DropdownMenu.Content>
    <DropdownMenu.Group class="font-medium">
      <DropdownMenu.Item onclick={() => folderDialogOpen = true}>New Folder</DropdownMenu.Item>
      <DropdownMenu.Item >File Upload</DropdownMenu.Item>
      <DropdownMenu.Item>Folder Upload</DropdownMenu.Item>
    </DropdownMenu.Group>
  </DropdownMenu.Content>
</DropdownMenu.Root>

<CreateFolderDialog bind:open={folderDialogOpen} />

