<script lang="ts">
    const url = `https://id.twitch.tv/oauth2/authorize?client_id=${import.meta.env.VITE_TWITCH_CLIENT_ID}&redirect_uri=${import.meta.env.VITE_TWITCH_REDIRECT_URI}&response_type=token&scope=chat:read chat:edit`
</script>

<a class="bg-black text-white rounded-sm p-4" href={url}>
    Get api key
</a>