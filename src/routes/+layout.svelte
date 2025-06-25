<script lang="ts">
  import "../app.css";
  let { children, data } = $props();
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte';
  import { Toaster } from "@/components/ui/sonner";
    import Navbar from "@/components/layout/navbar/navbar.svelte";

  let { session, supabase } = $derived(data)
  onMount(() => {
    const { data } = supabase.auth.onAuthStateChange((_, newSession) => {
      if (newSession?.expires_at !== session?.expires_at) {
        invalidate('supabase:auth')
      }
    })
    return () => data.subscription.unsubscribe()
  })


</script>

<svelte:head>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" >
  <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap" rel="stylesheet">
</svelte:head>


<Toaster />
<Navbar />
<main class="text-color-black font-manrope w-11/12 mx-auto">
  {@render children()}
</main>