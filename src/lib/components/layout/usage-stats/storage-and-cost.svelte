<script lang="ts">
  
  type Props = {
    size : number,
    cost : number,
  }

  let { size, cost } : Props = $props();



</script>

<div class="bg-primary-white divide-y divide-gray/20 shadow">

  {@render listItem('Storage Used', `${size ?? 0}GB`)}
  <!-- {@render listItem('Storage Cost', `$${cost ?? 0}/month`)} -->

</div>


{#snippet listItem(title : string, value : string)}
   <h3 class="flex justify-between items-center text-sm font-semibold py-4 px-3">
    <span class="block">{title}</span>
    <span class="block text-gray font-bold">{value}</span>
  </h3>
{/snippet}
  
 