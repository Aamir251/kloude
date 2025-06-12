<script lang="ts">
  import "../app.css";
  let { children, data } = $props();
  import { invalidate } from '$app/navigation'
  import { onMount } from 'svelte';
    import { Toaster } from "@/components/ui/sonner";

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

<Toaster />
{@render children()}