<script>
  import Navbar from "@/components/layout/navbar/navbar.svelte";
  
  let { children } = $props()
</script>

<Navbar />


<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" >
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
</svelte:head>

<main class="container text-color-black font-manrope">
  {@render children()}
</main>