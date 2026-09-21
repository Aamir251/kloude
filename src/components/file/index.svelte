<script lang="ts">
	import ListView from './list-view.svelte';
	import {type FileType } from './types';
	import GridView from './grid-view.svelte';

  type Props = {
    viewType : "grid" | "list"
    file : FileType
  }

  let { viewType = "list", file } : Props = $props();

  console.log({ file })

</script>




{#if viewType === "grid"}
  <GridView file={file} />

{:else}
  <ListView file={file} />
{/if}
