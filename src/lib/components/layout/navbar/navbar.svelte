<script>
  import { NavCta } from "../navbar-cta";
  import Navlinks from "./navlinks.svelte";
  import Navlogo from "./navlogo.svelte";

</script>

<header class="bg-black">
  <div class="relative w-11/12 mx-auto py-3 flex justify-between items-center">
    <Navlogo />
    <Navlinks />
    <div class="relative z-10">
      <NavCta />
    </div>
  </div>
</header>

