<script lang="ts">
  import CreateFolderDialog from "@/components/modules/dialogs/create-folder-dialog.svelte";
  import Button from "@/components/ui/button/button.svelte";

  let open : boolean = $state(false)

</script>

<div class="absolute top-3 right-5">
  <Button
    variant="outline"
    size="sm" class="cursor-pointer"
    onclick={() => {
      open = true
    }}
  >Create Folder</Button>
</div>


<CreateFolderDialog bind:open />