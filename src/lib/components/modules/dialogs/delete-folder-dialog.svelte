<script lang="ts">
  import { invalidate } from "$app/navigation";
  import Dialog from "@/components/ui/dropdown-menu/dialog.svelte";
  import { toast } from "svelte-sonner";
  
  let { isOpen = $bindable(), folderId } = $props()
  let loading = $state(false)

  const handleSubmit = async (e : SubmitEvent) => {
    e.preventDefault()
    try {
      loading = true;
      
      const resp = await fetch("/api/folder/delete", {
        method : "POST",
        body : JSON.stringify(folderId)
      })

      if (!resp.ok) {
        const data = await resp.json()
        throw new Error(data.message);
      }

      toast.success('Folder Deleted!')
      invalidate('folders')

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown Error" 
      toast.error(errorMessage);

    } finally {
      loading = false
    }
  }



</script>

<Dialog
  btnText="Delete"
  closeDialog={() => {

  }}
  handleSubmit={handleSubmit}
  loading={loading}
  title='Are you sure you want to delete this folder?'
  bind:isOpen
>
  heheheheh
</Dialog>