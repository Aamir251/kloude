<script lang="ts">
  import { Label } from "$lib/components/ui/label/index.js";
  import { Input } from "$lib/components/ui/input/index.js";
  import { Button } from "../ui/button";
  import { enhance } from "$app/forms";
  import type { SubmitFunction } from "@sveltejs/kit";
  import { toast } from "svelte-sonner";
  import type { ActionData } from "../../../routes/register/$types";
  import { goto } from "$app/navigation";

  let { formAction }: { formAction?: ActionData } = $props();

  let loading: boolean = $state(false);

  let id = $props.id();

  const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
    loading = true;
    const password = formData.get("password") as string;
    const confirmPassword = formData.get("confirm-password") as string;
    if (confirmPassword !== password) {
      toast.error("password don't match");
      cancel();
    }

    return async ({ update }) => {
      update();
      loading = false;
    };
  };

  $effect(() => {
    if (formAction) {
      if (formAction?.success) {
        toast.success(formAction.message);
        setTimeout(() => {
          goto("/");
        }, 1500);
      } else {
        toast.error(formAction.message);
      }
    }
  });
</script>

<form use:enhance={handleSubmit} method="POST" class="p-6 md:p-8">
  <div class="flex flex-col gap-6">
    <div class="flex flex-col items-center text-center">
      <h1 class="text-2xl font-bold">Welcome back</h1>
      <p class="text-muted-foreground text-balance">
        Login to your Kloude account
      </p>
    </div>
    <div class="grid gap-3">
      <Label for="email-{id}">Full Name</Label>
      <Input
        id="username-{id}"
        type="text"
        placeholder="John Doe"
        required
        name="username"
      />
    </div>
    <div class="grid gap-3">
      <Label for="email-{id}">Email</Label>
      <Input
        id="email-{id}"
        type="email"
        placeholder="m@example.com"
        name="email"
        required
      />
    </div>
    <div class="grid gap-3">
      <Label for="password">Password</Label>

      <Input
        id="password-{id}"
        type="password"
        required
        name="password"
        placeholder="********"
      />
    </div>
    <div class="grid gap-3">
      <div class="flex items-center">
        <Label for="confirm-password">Confirm Password</Label>
        <a href="##" class="ml-auto text-sm underline-offset-2 hover:underline">
          Forgot your password?
        </a>
      </div>
      <Input
        id="confirm-password-{id}"
        type="password"
        required
        name="confirm-password"
        placeholder="********"
      />
    </div>
    <Button type="submit" class="w-full">Create Account 🚀</Button>

    <div class="text-center text-sm">
      Already have an account?
      <a href="/login" class="underline underline-offset-4"> Log in </a>
    </div>
  </div>
</form>
