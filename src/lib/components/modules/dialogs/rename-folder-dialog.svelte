<script lang="ts">
  import { invalidateAll } from "$app/navigation";
  import FormDialog from "@/components/ui/dropdown-menu/form-dialog.svelte";
  import { Input } from "@/components/ui/input";
  import { toast } from "svelte-sonner";

  let { isOpen = $bindable(), folderId } = $props()

  let loading : boolean = $state(false)

  const handleSubmit = async (e : SubmitEvent) => {
    e.preventDefault()
    try {
      loading = true;

      const formData = new FormData(e.target as HTMLFormElement)
      const name = formData.get("folder-name")
      if (!name) throw new Error('Please Enter Folder Name')
      
      console.log({ folderId, name });
      
      const resp = await fetch("/api/folder/rename", {
        method : "PATCH",
        body : JSON.stringify({ folder_id : folderId, name })
      })

      if (!resp.ok) {
        const data = await resp.json()
        throw new Error(data.message);
      }

      await invalidateAll()
      toast.success('Folder Renamed!')

    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Unknown Error" 
      toast.error(errorMessage);

    } finally {
      loading = false
      isOpen = false;
    }
  }
</script>

<FormDialog
  btnText="Rename"
  closeDialog={() => {
    isOpen = false
  }}
  handleSubmit={handleSubmit}
  loading={loading}
  title='Please enter the new folder name'
  bind:isOpen
>
  <Input
    placeholder="Folder Name"
    name="folder-name"
    required
    aria-required
  />
</FormDialog>