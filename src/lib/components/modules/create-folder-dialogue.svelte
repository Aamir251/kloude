<script lang="ts">
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";

  import type { SubmitFunction } from "@sveltejs/kit";
  import Button from "../ui/button/button.svelte";
  import { Input } from "../ui/input";
  import { toast } from "svelte-sonner";
  import { enhance } from "$app/forms";

  type Props = {
    checkIfFolderAlreadyExists: (folderName: string) => boolean;
    open : boolean
  };

  let { checkIfFolderAlreadyExists, open = $bindable() }: Props = $props();

  let loading = $state<boolean>(false);


  const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
    loading = true;
    const folderName = formData.get("folder-name") as string;

    const alreadyExists: boolean = checkIfFolderAlreadyExists(folderName);
    if (alreadyExists) {
      toast.error("Folder already exists");
      cancel();
      loading = false;
      return;
    }

    return async ({ update }) => {
      update();
      loading = false;
      open = false
    };
  };
</script>

<AlertDialog.Root bind:open>
  <AlertDialog.Content>
    <form
      method="POST"
      use:enhance={handleSubmit}
      action="?/createFolder"
      class="space-y-4 mt-5"
    >
      <AlertDialog.Header>
        <AlertDialog.Title>Please Enter Folder Name</AlertDialog.Title>
        <AlertDialog.Description>
          <Input placeholder="Folder Name" name="folder-name" />
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel disabled={loading} type="button">Cancel</AlertDialog.Cancel>
        <Button disabled={loading} type="submit" >Create</Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>
