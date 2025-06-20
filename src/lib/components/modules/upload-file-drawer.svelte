<script lang="ts">
  import * as Sheet from "$lib/components/ui/sheet/index.js";
  import { getFileIcon } from "@/utils/file-icon";
  import Cross from "../icons/cross.svelte";
  import { fly } from "svelte/transition";
  import { Button } from "../ui/button";
  import { Progress } from "../ui/progress";
  import { formatSize } from "@/utils/file";

  type Props = {
    files: File[];
    showSideDrawer: boolean;
    userId: string;
  };

  type FileWithProgress = {
    file: File;
    progress: number | null;
    index: number;
  };

  let {
    files = $bindable(),
    showSideDrawer = $bindable(),
    userId,
  }: Props = $props();

  let filesWithProgress: FileWithProgress[] = $derived.by(() => {
    return files.map((file, index) => ({
      file,
      progress: null,
      index,
    }));
  });

  let loading: boolean = $state(false);

  const removeFile = (index: number) => {
    files = files.filter((_, i) => i !== index);
  };

  const handleUpload = async () => {
    loading = true;

    filesWithProgress.forEach(async (element) => {
      const { file } = element;

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
      xhr.upload.addEventListener("progress", (e) => {
        if (e.lengthComputable) {
          let progress = Math.round((e.loaded / e.total) * 100);

          filesWithProgress[element.index].progress = progress;
        }
      });
      xhr.open("PUT", uploadUrl);
      xhr.setRequestHeader("Content-Type", file.type);
      xhr.send(file);
    });
  };
</script>

{#snippet filelistItem(fileWithProgress: FileWithProgress)}
  <div class="grid grid-cols-[2fr_1fr_0.5fr] gap-x-6 items-center py-4 relative">
    <div class="flex items-center gap-x-4">
      <figure class="shrink-0 p-3 bg-white rounded-md">
        <img
          src={getFileIcon(fileWithProgress.file)}
          alt={fileWithProgress.file.name}
          width="30px"
          height="30px"
          class="w-8 h-8 object-contain"
        />
      </figure>
      <div>
        <h4 class="font-medium line-clamp-1">{fileWithProgress.file.name}</h4>
        {#if fileWithProgress.progress}
          <div class="flex gap-x-2 items-center">
            <Progress value={fileWithProgress.progress} class="h-1.5 w-32" />
            <span class="text-gray text-sm">{fileWithProgress.progress}%</span>
          </div>
        {/if}
      </div>
    </div>

    <h6 class="text-xs text-gray mx-auto">
      {formatSize(fileWithProgress.file.size)}
    </h6>

    <div>
      <button
        onclick={removeFile.bind(null, fileWithProgress.index)}
        class="w-7 h-7 cursor-pointer hover:bg-gray-100 text-gray"
      >
        <Cross />
      </button>
      <!-- {#if fileWithProgress.progress === 100} -->
        <img
          src="/icons/checked.png" 
          width="14" height="14" 
          class="absolute top-9 right-3" 
          title="upload completed" alt="upload complete" 
        />
      <!-- {/if} -->
    </div>
  </div>
{/snippet}

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
          {#each filesWithProgress as file, index}
            {@render filelistItem(file)}
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
