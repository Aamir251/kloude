<script>
  import * as Tooltip from "$lib/components/ui/tooltip/index.js";

  const links = [
    { id: 0, href: "/dashboard", name: "Dashboard", icon: "/icons/dashboard.svg" },
    { id: 1, href: "/files", name: "My Files", icon: "/icons/folders.svg" },
    { id: 2, href: "/", name: "Shared Files", icon: "/icons/shared.svg" },
    { id: 3, href: "/", name: "Trash", icon: "/icons/trash.svg" },
    { id: 4, href: "/", name: "Settings", icon: "/icons/settings.svg" },
    { id: 4, href: "/", name: "Profile", icon: "/icons/profile.svg" },
  ];
</script>

<ul class="absolute h-full w-full flex justify-center inset-0 gap-12">
  {#each links as link}
    <Tooltip.Provider>
      <Tooltip.Root >
        <Tooltip.Trigger>
          <a href={link.href}>
            <img
              width="20"
              height="20"
              class="object-contain"
              src={link.icon}
              alt={link.name}
            />
          </a>
        </Tooltip.Trigger>
        <Tooltip.Content>
          <p>{link.name}</p>
        </Tooltip.Content>
      </Tooltip.Root>
    </Tooltip.Provider>
  {/each}
</ul>
