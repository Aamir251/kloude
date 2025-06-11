<script lang="ts">
  import * as Card from "$lib/components/ui/card/index.js";

  import type { PageProps, SubmitFunction } from "./$types";
  import { onMount } from "svelte";
  import { goto } from "$app/navigation";
  import RegisterForm from "@/components/auth/register-form.svelte";
  import type { HTMLAttributes } from "svelte/elements";
  import { cn } from "@/utils";
  import { toast } from 'svelte-sonner'

  type Props = HTMLAttributes<HTMLDivElement> & PageProps;

  let { class: className, data, form, ...restProps }: Props = $props();

  // onMount(() => {
  //   let timeoutId: NodeJS.Timeout;

  //   if (data.accountStatus === "confirmed") {
  //     timeoutId = setTimeout(() => {
  //       goto("/");
  //     }, 2000);
  //   }
  // });
</script>

<div
  class="bg-muted flex min-h-svh flex-col items-center justify-center p-6 md:p-10"
>
  <div class="w-full max-w-sm md:max-w-3xl">
    <div class={cn("flex flex-col gap-6", className)} {...restProps}>
      <Card.Root class="overflow-hidden p-0">
        <Card.Content class="grid p-0 md:grid-cols-2">
          <RegisterForm formAction={form} />
          <div class="bg-muted relative hidden md:block">
            <img
              src="/auth-bg.jpg"
              alt="placeholder"
              class="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
            />
          </div>
        </Card.Content>
      </Card.Root>
      <div
        class="text-muted-foreground *:[a]:hover:text-primary *:[a]:underline *:[a]:underline-offset-4 text-balance text-center text-xs"
      >
        By clicking continue, you agree to our <a href="##">Terms of Service</a>
        and
        <a href="##">Privacy Policy</a>.
      </div>
    </div>
  </div>
</div>
