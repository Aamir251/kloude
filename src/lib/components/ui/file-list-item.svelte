<script lang="ts">
  import { getFileIcon } from "@/utils/file-icon";
  import { fly } from "svelte/transition";
  import Cross from "../icons/cross.svelte";
  import { formatSize } from "@/utils/file";
  import { Progress } from "../ui/progress";

  type Props = {
    item : FileType
    removeFile : () => void
  }

  let { item, removeFile } : Props = $props()

</script>

<div transition:fly={{ x : 30 }} class="grid grid-cols-[2fr_1fr_0.5fr] gap-x-6 items-center py-4 relative">
    <div class="flex items-center gap-x-4">
      <figure class="shrink-0 p-3 bg-white rounded-md">
        <img
          src={getFileIcon(item.file)}
          alt={item.file.name}
          width="30px"
          height="30px"
          class="w-8 h-8 object-contain"
        />
      </figure>
      <div>
        <h4 class="font-medium line-clamp-1">{item.file.name}</h4>
        {#if item.progress}
          <div class="flex gap-x-2 items-center">
            <Progress value={item.progress} class="h-1.5 w-32" />
            <span class="text-gray text-sm">{item.progress}%</span>
          </div>
        {/if}
      </div>
    </div>

    <h6 class="text-xs text-gray mx-auto">
      {formatSize(item.file.size)}
    </h6>

    <div>
      <button
        onclick={removeFile}
        class="w-7 h-7 cursor-pointer hover:bg-gray-100 text-gray"
      >
        <Cross />
      </button>
      {#if item.progress === 100}
        <img
          src="/icons/checked.png" 
          width="14" height="14" 
          class="absolute top-9 right-3" 
          title="upload completed" alt="upload complete" 
        />
      {/if}
    </div>
  </div>