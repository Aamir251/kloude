<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import { toast } from "svelte-sonner";
  import Button from "../ui/button/button.svelte";
  import { Input } from "../ui/input";
  import { page } from "$app/state";
  import { invalidateAll } from "$app/navigation";

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

      console.log({ parent_id });
      

      const resp = await fetch("/api/create-folder", {
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

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <form onsubmit={handleSubmit} class="space-y-4 mt-5">
      <AlertDialog.Header>
        <AlertDialog.Title>Please Enter Folder Name</AlertDialog.Title>
        <AlertDialog.Description>
          <Input
            placeholder="Folder Name"
            name="folder-name"
            required
            aria-required
          />
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel disabled={loading} type="button"
          >Cancel</AlertDialog.Cancel
        >
        <Button disabled={loading} type="submit">Create</Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
