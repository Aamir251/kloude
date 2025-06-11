<script lang="ts">
  import { enhance } from "$app/forms";
  import LoginForm from "@/components/login-form.svelte";
  import type { SubmitFunction } from "./$types.js";

  let { form } = $props();

  let loading = $state<boolean>(false);

  let error = $derived(form?.message);

  const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
    error = undefined;
    loading = true;
    const password = formData.get("password") as string;
    if (password?.length < 6) {
      error = "Password should be at least 6 characters.";
      cancel();
    }

    return async ({ update }) => {
      update();
      loading = false;
    };
  };
</script>

<div class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10">
  <div class="w-full max-w-sm md:max-w-3xl">
    <LoginForm />
  </div>
</div>