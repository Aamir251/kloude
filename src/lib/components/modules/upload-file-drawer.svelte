<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { Button } from "../ui/button";
  import type { Tables } from "../../../database.types";
  import { toast } from "svelte-sonner";
  import FileListItem from "../ui/file-list-item.svelte";
  import { getFileType, saveFilesData } from "@/utils/file";

  type Props = {
    files: FileType[];
    showSideDrawer: boolean;
    userId: string;
  };

  let {
    files = $bindable(),
    showSideDrawer = $bindable(),
    userId,
  }: Props = $props();

  let loading: boolean = $state(false);

  let uploadedFilesCount = 0

  const removeFile = (index: number) => {
    files = files.filter((_, i) => i !== index);
  };

  const filesToSave : Omit<Tables<"files">, "id">[] = files.map(item => ({
    type : getFileType(item.file),
    folder_id : null,
    name : item.file.name,
    size : item.file.size,
    user_id : userId
  }))

  const handleUpload = async () => {
    loading = true;

    files.forEach(async (item, index) => {
      const { file } = item;

      const resp = await fetch(`http://localhost:5173/api/get-signed-url`, {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
          userId,
        }),
      });

      const { uploadUrl } = await resp.json();

      const xhr = new XMLHttpRequest();
      xhr.upload.addEventListener("progress", async (e) => {
        if (e.lengthComputable) {
          let progress = Math.round((e.loaded / e.total) * 100);
          files[index].progress = progress;
          if (progress === 100) {
            uploadedFilesCount++
            console.log({ uploadedFilesCount });
            if (uploadedFilesCount === files.length) {
              const { success, message } = await saveFilesData(filesToSave)
              if (success) {
                toast.success('Files Uploaded! 🎉')
              } else {
                toast.error('Failed to Upload!')
              }
              loading = false
            }
          }          
        }
      });
      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };
</script>


<Sheet.Root onOpenChange={() => (showSideDrawer = false)} open={showSideDrawer}>
  <Sheet.Content class="sm:max-w-2xl">
    <Sheet.Header>
      <Sheet.Title class="text-xl">Upload Files</Sheet.Title>
      <Sheet.Description>
        Select or delete your files here. Click Upload when you're done
      </Sheet.Description>
    </Sheet.Header>

    <div class="px-4">
      <div class="space-y-3 bg-primary-white p-5 rounded-md">
        <div
          class="grid grid-cols-[2fr_1fr_0.5fr] gap-x-6 text-sm text-gray font-medium"
        >
          <h5>Name</h5>
          <h5 class="mx-auto">File Size</h5>
        </div>
        <div class="divide-y-1 divide-gray/30">
          {#each files as file, index (file.file.name) }
            <FileListItem item={file} removeFile={removeFile.bind(null, index)} />
          {/each}
        </div>
      </div>
    </div>

    <div class="px-6 fixed bottom-4 right-0">
      <Button
        disabled={loading}
        aria-disabled={loading}
        onclick={handleUpload}
        class="cursor-pointer">Upload</Button
      >
    </div>
  </Sheet.Content>
</Sheet.Root>
