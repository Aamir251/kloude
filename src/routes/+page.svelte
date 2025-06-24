<script lang="ts">
  import Greetings from "@/components/modules/greetings.svelte";
  import Searchbar from "@/components/modules/searchbar.svelte";
  import UploadFile from "@/components/modules/upload-file.svelte";

  let { data } = $props();
</script>

<div class="flex justify-between">
  <Greetings username={data.userProfile?.name} />
  <Searchbar />
</div>

<UploadFile userId={data.user!.id!} />