<script lang="ts">
  import Button from "@/components/ui/button/button.svelte";
  import FileListItem from "@/components/ui/file-list-item.svelte";
  import { Input } from "@/components/ui/input";
  import { getFileType, saveFilesData } from "@/utils/file";
  import { page } from "$app/state"
  import { toast } from "svelte-sonner";
  import type { ChangeEventHandler } from "svelte/elements";
  import { invalidate } from "$app/navigation";

  let loading : boolean = $state(false);

  let files : FileType[] = $state([])

  const handleChange : ChangeEventHandler<HTMLInputElement> = (e) => {
    const target = e.target as HTMLInputElement;
    
    if (!target.files) return;

    const selectedFiles : FileType[] = [...target.files].map(file => ({
      file,
      progress : null
    }))

    if (files?.length) {
      files = [...files, ...selectedFiles];
    } else {
      files = [...selectedFiles]
    }
  }
 
  const getFolderId = () : string | null => page.params?.id ?? null

  const filesToSave = $derived(files.map(item => ({
    type : getFileType(item.file),
    folder_id : getFolderId(),
    name : item.file.name,
    size : item.file.size,
  })))

  const removeFile = (index: number) => {
    files = files.filter((_, i) => i !== index);
  };

  let uploadedFilesCount = 0;

  const handleUpload = async () => {
    loading = true;

    files.forEach(async (item, index) => {
      const { file } = item;

      const resp = await fetch(`/api/get-signed-url`, {
        method: "POST",
        body: JSON.stringify({
          fileName: file.name,
          contentType: file.type,
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
              const { success } = await saveFilesData(filesToSave)
              if (success) {
                toast.success('Files Uploaded! 🎉')
                invalidate(`folders-${getFolderId()}`)
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


<aside class="px-4 py-10 border-0 border-x border-gray/20 h-[calc(100vh-84px)] flex-1 max-w-md">
  <h2 class="text-h3 font-semibold">Upload Files</h2>
  <h5 class="text-gray mt-2 text-sm">Select or delete your files here. Click Upload when you're done</h5>

  <div
    class="h-[100px] mt-5 relative w-full  bg-primary-white shadow rounded-xl flex flex-col justify-center items-center gap-3 group"
  >
    <img
      src="/icons/file-upload.svg"
      alt="upload file"
      class="w-10 h-10 transition duration-300 group-hover:scale-110"
    />
    <Input
      multiple
      type="file"
      onchange={handleChange}
      class="absolute w-full h-full bg-gray inset-0 opacity-0 cursor-pointer"
    />
      <h5 class="text-h6 font-semibold text-black">
        Click to select files
      </h5>
  </div>

  {#if filesToSave.length}
  <div class="mt-10">
    <div class="space-y-3 bg-primary-white rounded-md">
      <div
        class="grid grid-cols-[2fr_0.5fr_0.2fr] gap-x-6 text-sm text-gray font-medium"
      >
        <h5 class="translate-x-5">Name</h5>
        <h5 class="mx-auto">File Size</h5>
      </div>
      <div class="divide-y-1 divide-gray/30 max-h-[calc(100vh-410px)] overflow-y-auto no-scrollbar">
        {#each files as file, index (file.file.name) }
          <FileListItem item={file} removeFile={removeFile.bind(null, index)} />
        {/each}
      </div>
    </div>
  </div>

  <div class="px-6 fixed bottom-4 right-5">
    <Button
      disabled={loading}
      aria-disabled={loading}
      onclick={handleUpload}
      class="cursor-pointer">Upload</Button
    >
  </div>
  {/if}
  
</aside>