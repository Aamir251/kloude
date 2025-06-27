<script lang="ts">
  import { Sidebar } from '@/components/layout/sidebar';
  let { children } = $props()
</script>


<div class="flex">
  <div class="flex-2">
    {@render children()}
  </div>

  <Sidebar  />
</div>


