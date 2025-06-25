<script lang="ts">
    import Button from "../ui/button/button.svelte";
    import NotFound from "../ui/file/not-found.svelte";
    import CreateFolderDialogue from "./create-folder-dialogue.svelte";

  type Folder = {
    id : string
    name : string
  }

  type Props = {
    folders : Folder[]
  }
  let { folders } : Props = $props()

  const checkIfFolderAlreadyExists = (folderName : string) => {
    return folders.some(folder => folder.name === folderName)
  }
  
  let isCreateFolderOpen : boolean = $state(false)

</script>


{#if folders.length}
  {#each folders as folder}
    <h4>{folder.name}</h4>
  {/each}
{:else}
  <div class="not-found">
    <NotFound />
  </div>
{/if}



<div class="fixed bottom-10 right-10">
  <Button onclick={() => isCreateFolderOpen = true}>Create Folder</Button>
</div>

<CreateFolderDialogue checkIfFolderAlreadyExists={checkIfFolderAlreadyExists} bind:open={isCreateFolderOpen} />
