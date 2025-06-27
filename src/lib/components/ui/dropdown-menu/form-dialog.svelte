<script lang="ts">
    import { enhance } from "$app/forms";
  import * as AlertDialog from "$lib/components/ui/alert-dialog/index.js";
  import Button from "../button/button.svelte";

  let { isOpen = $bindable(), closeDialog, title, children, handleSubmit, loading, btnText } = $props()

</script>


<AlertDialog.Root bind:open={isOpen}>
  <AlertDialog.Content>
    <form onsubmit={handleSubmit} class="space-y-4 mt-5">
      <AlertDialog.Header>
        <AlertDialog.Title>{title}</AlertDialog.Title>
        <AlertDialog.Description>
          {@render children()}
        </AlertDialog.Description>
      </AlertDialog.Header>
      <AlertDialog.Footer>
        <AlertDialog.Cancel disabled={loading} type="button"
          >Cancel</AlertDialog.Cancel
        >
        <Button disabled={loading} type="submit">{btnText}</Button>
      </AlertDialog.Footer>
    </form>
  </AlertDialog.Content>
</AlertDialog.Root>