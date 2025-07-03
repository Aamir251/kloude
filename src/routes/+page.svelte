<script lang="ts">
  import Greetings from "@/components/modules/greetings.svelte";
  import Searchbar from "@/components/modules/searchbar.svelte";
  import UploadFile from "@/components/modules/upload-file.svelte";
  import UsageStats from "@/components/layout/usage-stats"

  let { data } = $props();

</script>

<section class="flex">
  <div class="grow-1">
    <div class="flex justify-between">
      <Greetings username={data.userProfile?.name} />
      <Searchbar />
    </div>

    <UploadFile userId={data.user!.id!} />
  </div>


  <UsageStats 
    storageCost={data.storageCost}
    storageStats={data.storageStats}
  />

</section>