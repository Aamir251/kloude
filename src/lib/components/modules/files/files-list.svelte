<script lang="ts">
  import NotFound from "@/components/ui/file/not-found.svelte";

  let { files, hasFiles = $bindable() } = $props()

  if (files.length) {
    hasFiles = true
  }
  

  
</script>

{#if files?.length}
  <div class="flex pt-10 flex-wrap gap-8">
    {#each files as item}
      {@render file(item)}
    {/each}
  </div>
{:else}
  <div class="not-found">
    <NotFound />
  </div>
{/if}


{#snippet file(file : any)}
  <div class="file-item">
    <h4>{file.name}</h4>
  </div>
{/snippet}
