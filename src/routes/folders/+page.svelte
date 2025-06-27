<script lang="ts">
  import FoldersPage from './folders-page.svelte';

  const { data } = $props();

</script>

<FoldersPage files={data.files} folders={data.folders} />



