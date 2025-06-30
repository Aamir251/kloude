<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import FormDialog from "@/components/ui/dropdown-menu/form-dialog.svelte";
  import { toast } from "svelte-sonner";
  
  let { isOpen = $bindable(), fileId } = $props()
  let loading = $state(false)

  const handleSubmit = async (e : SubmitEvent) => {
    e.preventDefault()
    try {
      loading = true;
      
      const resp = await fetch("/api/file", {
        method : "DELETE",
        body : JSON.stringify(fileId)
      })

      if (!resp.ok) {
        const data = await resp.json()
        throw new Error(data.message);
      }

      await invalidateAll()
      toast.success('File Deleted!')

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown Error" 
      toast.error(errorMessage);

    } finally {
      loading = false
      isOpen = false
    }
  }



</script>

<FormDialog
  btnText="Delete"
  closeDialog={() => {
    isOpen = false
  }}
  handleSubmit={handleSubmit}
  loading={loading}
  title='Are you sure you want to delete this file?'
  bind:isOpen
>
  This action cannot be undone
</FormDialog>