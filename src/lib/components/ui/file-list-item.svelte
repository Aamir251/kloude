<script lang="ts">
  import { getFileIcon } from "@/utils/file-icon";
  import { fly } from "svelte/transition";
  
  type Props = {
    file : File;
    index : number
  }

  let { file, index } : Props = $props()

</script>

<div
  transition:fly={{ x: 50 }}
  class="p-2.5 border border-gray-300 rounded-sm flex gap-x-4 items-center justify-between"
>
  <div class="flex items-center gap-x-4">
    <img
      src={getFileIcon(file)}
      alt={file.name}
      width="30px"
      height="30px"
      class="w-9 h-9 object-contain"
    />
    <div>
      <h4 class="font-medium">{file.name}</h4>
      <p class="text-xs text-gray-500">{file.size}</p>
    </div>
  </div>

  <!-- <button
    onclick={removeFile.bind(null, index)}
    class="w-7 h-7 cursor-pointer hover:bg-gray-100"
  >
    <Cross />
  </button> -->
</div>
