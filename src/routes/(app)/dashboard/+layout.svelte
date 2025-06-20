<script>
  import Navbar from "@/components/layout/navbar/navbar.svelte";
  
  let { children } = $props()
</script>

<Navbar />


<main class="container text-color-black">
  {@render children()}
</main>