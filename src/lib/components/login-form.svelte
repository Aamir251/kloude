<script lang="ts">
	import * as Card from "$lib/components/ui/card/index.js";
	import { Label } from "$lib/components/ui/label/index.js";
	import { Input } from "$lib/components/ui/input/index.js";
	import { Button } from "$lib/components/ui/button/index.js";
	import { cn } from "$lib/utils.js";
	import type { HTMLAttributes } from "svelte/elements";
	import type { SubmitFunction } from "../../routes/login/$types";
	import { enhance } from "$app/forms";
	import { toast } from "svelte-sonner";

	let { class: className, ...restProps }: HTMLAttributes<HTMLDivElement> =
		$props();

	const id = $props.id();
	let loading = $state<boolean>(false);

	const handleSubmit: SubmitFunction = ({ formData, cancel }) => {
		loading = true;
		const password = formData.get("password") as string;
		if (password?.length < 6) {
			toast.error("Password must be greater than 6 characters");
			cancel();
			loading = false;
		}

		return async ({ update }) => {
			update();
			loading = false;
		};
	};
</script>

<div class={cn("flex flex-col gap-6", className)} {...restProps}>
	<Card.Root class="overflow-hidden p-0">
		<Card.Content class="grid p-0 md:grid-cols-2">
			<form use:enhance={handleSubmit} method="POST" class="p-6 md:p-8">
				<div class="flex flex-col gap-6">
					<div class="flex flex-col items-center text-center">
						<h1 class="text-2xl font-bold">Welcome back</h1>
						<p class="text-muted-foreground text-balance">
							Login to your Kloude account
						</p>
					</div>
					<div class="grid gap-3">
						<Label for="email-{id}">Email</Label>
						<Input
							id="email-{id}"
							type="email"
							name="email"
							placeholder="m@example.com"
							required
						/>
					</div>
					<div class="grid gap-3">
						<div class="flex items-center">
							<Label for="password">Password</Label>
							<a
								href="##"
								class="ml-auto text-sm underline-offset-2 hover:underline"
							>
								Forgot your password?
							</a>
						</div>
						<Input
							id="password-{id}"
							name="password"
							type="password"
							required
						/>
					</div>
					<Button disabled={loading} type="submit" class="w-full">Login</Button>
					<div
						class="after:border-border relative text-center text-sm after:absolute after:inset-0 after:top-1/2 after:z-0 after:flex after:items-center after:border-t"
					>
						<span class="bg-card text-muted-foreground relative z-10 px-2">
							Or continue with
						</span>
					</div>
					<div class="text-center text-sm">
						Don&apos;t have an account?
						<a href="/register" class="underline underline-offset-4">
							Sign up
						</a>
					</div>
				</div>
			</form>
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
		By clicking continue, you agree to our <a href="##">Terms of Service</a> and
		<a href="##">Privacy Policy</a>.
	</div>
</div>
