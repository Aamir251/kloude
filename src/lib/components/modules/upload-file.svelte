<script lang="ts">
  import type { ChangeEventHandler } from "svelte/elements";
  import { Input } from "../ui/input";
  import UploadFileDrawer from "./upload-file-drawer.svelte";
  import Button from "../ui/button/button.svelte";


  export type FileType = {
    file : File
    progress : number | null
  }

  let files: FileType[] | null = $state(null);

  let inputFiles = $state(undefined);

  let { userId } : { userId : string } = $props()
  let showSideDrawer: boolean = $state(true);

  const handleChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    if (!target?.files) return;

    const selectedFiles : FileType[] = [...target.files].map((file, index) => ({
      file,
      progress : null
    }))

    if (files?.length) {
      files = [...files, ...selectedFiles];
    } else {
      files = [...selectedFiles]
    }
    showSideDrawer = true
    
  };

  const clearFiles = () => {
    inputFiles = undefined;
    files = null;
  };

  const showFiles = (files: FileList) => {
    if (files.length === 0) return "No files selected.";
    return Array.from(files)
      .map((file) => file.name)
      .join(", ");
  };
</script>

<h3 class="text-h3 font-semibold mb-5">Upload Files</h3>

<div
  class="h-[200px] relative w-full bg-primary-white shadow rounded-xl flex flex-col justify-center items-center gap-3 group"
>
  <img
    src="/icons/file-upload.svg"
    alt="upload file"
    class="w-14 h-14 transition duration-300 group-hover:scale-110"
  />
  <Input
    multiple
    type="file"
    bind:files={inputFiles}
    onchange={handleChange}
    class="absolute w-full h-full bg-gray inset-0 opacity-0 cursor-pointer"
  />
    <h5 class="text-h4 font-semibold text-black">
      Drag and drop files, or Browse
    </h5>
  </div>


  {#if files?.length}
    <h5 class="text-lg font-semibold text-black">
      {files.length} files selected
    </h5>
    <div class="flex">
      <Button size='sm' variant='secondary' onclick={() => showSideDrawer = true }>View Selected Files</Button>
      <Button onclick={clearFiles} size='sm' variant='ghost'>
        <span>Clear All</span>
        <img src="/icons/cross.svg" alt="clear selected files" class="w-5" />
      </Button>
    </div>
  {/if}

{#if files && files.length > 0}
  <UploadFileDrawer bind:files bind:showSideDrawer userId={userId} />
{/if}
