<script lang="ts">
  import { toast } from "svelte-sonner";
  import { Input } from "../../ui/input";
  import { page } from "$app/state";
  import { invalidateAll } from "$app/navigation";
  import FormDialog from "@/components/ui/dropdown-menu/form-dialog.svelte";

  type Props = {
    open: boolean;
  };

  let { open = $bindable() }: Props = $props();

  let loading = $state<boolean>(false);

  const handleSubmit = async (e: SubmitEvent) => {
    e.preventDefault();
    loading = true;
    try {
      const formData = new FormData(e.target as HTMLFormElement);
      const name = formData.get("folder-name");

      const parent_id = page.params?.id ?? null;

      const resp = await fetch("/api/folder/create", {
        method: "POST",
        body: JSON.stringify({ name, parent_id }),
      });

      if (!resp.ok) {
        const data = await resp.json();
        throw new Error(data.message);
      }

      if (resp.ok) {
        await invalidateAll();
        toast.success("Folder created 🎉");
      }
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error(errorMessage);
    } finally {
      loading = false;
      open = false;
    }
  };
</script>

<FormDialog
  btnText='Create'
  isOpen={open}
  handleSubmit={handleSubmit}
  loading={loading}
  title='Please enter folder name'
  closeDialog={() => {
    open = false
  }}
>
  <Input
    placeholder="Folder Name"
    name="folder-name"
    required
    aria-required
  />
</FormDialog>
