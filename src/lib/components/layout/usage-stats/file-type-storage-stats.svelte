<script lang="ts">
  import type { Enums } from "../../../../database.types";
  import { getFileListItemIcon } from "@/utils/file-icon";
  import { formatSize } from "@/utils/file";

  export type Stat = {
    file_count: number;
    file_type: Enums<"file_type">;
    total_size: number;
  };

  type Props = {
    stats: Stat[];
  };

  let { stats }: Props = $props();
  
  const statsObject : { [key in Enums<"file_type">]?: Stat | undefined } = {}

  stats.forEach(item => {
    statsObject[item.file_type] = stats.find(el => el.file_type === item.file_type)
  })
  
</script>

<div class="divide-y-2 divide-gray/10 bg-primary-white shadow">
  {#each Object.keys(statsObject) as stat }
    {@render statItem(
      stat, 
      getFileListItemIcon(stat as unknown as Enums<"file_type">),
      statsObject[stat as unknown as Enums<"file_type">]
    )}
  {/each}
</div>

{#snippet statItem(name: string, icon: string, stat: Stat | undefined )}
  <h3 class="py-3 px-2 flex justify-between items-center">
    <div class="flex gap-x-3 items-center">
      <div class="p-2.5 bg-gray/20 rounded-md">
        <img src="{icon}" alt="{name}" width="19" height="19" />
      </div>
      <span class="block font-semibold text-sm">{name}</span>
    </div>
    <span class="font-bold text-gray text-sm">
      <span class="block">
        {#if stat?.total_size}
          {formatSize(stat.total_size)}
        {:else} 
          -
        {/if}
      </span>
    </span>
  </h3>
{/snippet}
