<script>
    import SearchIcon from "../icons/search.svelte";
    import { Input } from "../ui/input";

</script>
<form action="">
  <div class="relative">
    <div class="absolute left-2 w-5 text-gray-400 top-2">
      <SearchIcon />
    </div>
    <Input placeholder='Search your files' class='border border-gray-400 pl-9 focus:border-gray-700 min-w-xs' />
  </div>
</form>