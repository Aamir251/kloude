<script lang="ts">
  import LoginForm from "@/components/login-form.svelte";
  import { toast } from "svelte-sonner";

  let { form } = $props();

  let error = $derived(form?.message);

  $effect(() => {
    if (error) {
      toast.error(error);
    }
  });
</script>

<div
  class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
>
  <div class="w-full max-w-sm md:max-w-3xl">
    <LoginForm />
  </div>
</div>
