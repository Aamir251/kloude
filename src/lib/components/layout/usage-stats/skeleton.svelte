<script lang="ts">

  let { length = 2 } : { length? : number } = $props()


  const arr = new Array(length-1);

</script>

<div class="bg-primary-white divide-y divide-gray/20 space-y-2">
  {#each arr as _ }
    {@render item()}
  {/each}
</div>

{#snippet item()}
  <div class="h-[52px] w-full bg-gray/20"></div>
  <div class="h-[52px] w-full bg-gray/20"></div>
{/snippet}