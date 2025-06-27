<script lang="ts">
  import FoldersPage from '../folders-page.svelte';

  let { data } = $props();

</script>


<FoldersPage files={data.files} folders={data.folders} />