<script lang="ts">
  // export const ssr = false;
  import {page} from "$app/stores"
  console.log()
  const accessToken = new URLSearchParams($page.url.hash.substring(1)).get("access_token");
  let error = "";
  const postKey = async () => {
    let res = await fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/auth`, {
      method: "POST",
      body: JSON.stringify({accessToken}),
      headers: {
        "Content-Type": "application/json"
      }
    });
    const status = res.status
    res = await res.json()
    if (status !== 201) {
      error = "An error occured while updating the api key"
    } else {
      error = ""
    }
  }
  (async () => {
    await postKey()
  })()
</script>

<div class="p-4 rounded-md shadow-md ">
  {#if error == ""}
  <h1 class="text-green-700">Successfully updated the access token, restart the server for it to work!</h1>
  {:else}
  <h1 class="text-red-700 text-xl">{error}</h1>
  {/if}
</div>