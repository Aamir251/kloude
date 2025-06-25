<script lang="ts">
  import * as Dialog from "$lib/components/ui/dialog/index.js";
  import type { SubmitFunction } from "@sveltejs/kit";
  import Button from "../ui/button/button.svelte";
  import { Input } from "../ui/input";
  import { toast } from "svelte-sonner";
  import { enhance } from "$app/forms";

  type Props = {
    checkIfFolderAlreadyExists: (folderName: string) => boolean;
  };

  let { checkIfFolderAlreadyExists }: Props = $props();

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
    };
  };
</script>

<Dialog.Root>
  <Dialog.Trigger>
    <Button>Create Folder</Button>
  </Dialog.Trigger>

  <Dialog.Content>
    <Dialog.Header>
      <Dialog.Title>Enter Folder Name</Dialog.Title>
      <Dialog.Description>
        <form
          method="POST"
          use:enhance={handleSubmit}
          action="?/createFolder"
          class="space-y-4 mt-5"
        >
          <Input placeholder="Folder Name" name="folder-name" />
          <Button disabled={loading} type="submit">Create</Button>
        </form>
      </Dialog.Description>
    </Dialog.Header>
  </Dialog.Content>
</Dialog.Root>
