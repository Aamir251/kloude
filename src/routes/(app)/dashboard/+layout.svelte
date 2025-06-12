<script>
  import Navbar from "@/components/layout/navbar/navbar.svelte";
  
  let { children } = $props()
</script>

<Navbar />


{@render children()}