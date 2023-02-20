<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import type { IUsernameWithCount } from '../../../interfaces';
	import { page } from '$app/stores';
	const leaderboard = useQuery<IUsernameWithCount[], Error>(
		'leaderboard',
		() =>
			fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/task/leaderboard`).then((res) =>
				res.json()
			),
		{ refetchInterval: 1000 }
	);
</script>

<div class="text-2xl tracking-tight" style={`color: #${$page.url.searchParams.get("color")}`}>
	{#if $leaderboard.isLoading}
		<span>Loading...</span>
	{:else if $leaderboard.error}
		<span>An error has occurred: {$leaderboard.error.message}</span>
	{:else if $leaderboard.isSuccess}
		{#each $leaderboard.data as user}
		<span><span class="font-semibold" style={`color: ${user.color}`}>{user._id}</span>: <span>{user.count}</span></span>
		{/each}
	{/if}
</div>
