<script lang="ts">
  import type { GetStorageCostReturnType, GetStorageStatsReturnType } from "@/server/database/file";
  import FileTypeStorageStats, { type Stat } from "./file-type-storage-stats.svelte";
  import Skeleton from "./skeleton.svelte";
  import StorageAndCost from "./storage-and-cost.svelte";

  type Props = {
    storageCost : GetStorageCostReturnType
    storageStats : GetStorageStatsReturnType
  }

  let { storageCost, storageStats } : Props = $props()

</script>
<aside class="w-1/3 max-w-sm border-l border-gray/20 h-[calc(100vh-90px)] space-y-6 pl-3 rounded-md pt-6">
    {#await storageCost}
      <Skeleton  />
    {:then resp} 
      {#if resp.data?.length}
        <StorageAndCost
          cost={resp.data[0].total_cost}
          size={resp.data[0].total_storage_gb}
        />
      {/if}
    {/await}
    
  {#await storageStats}
    <Skeleton length={3} />
  {:then resp} 
    {#if resp.data?.length}
      <FileTypeStorageStats stats={resp.data as unknown as Stat[]} />
    {/if}
  {/await}
</aside>