<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import type { IUsernameWithCount } from '../../interfaces';
	const leaderboard = useQuery<IUsernameWithCount[], Error>(
		'leaderboard',
		() => fetch('http://localhost:5000/task/leaderboard').then((res) => res.json()),
		{ refetchInterval: 1000 }
	);
</script>

<div class="bg-white">
	{#if $leaderboard.isLoading}
		<span>Loading...</span>
	{:else if $leaderboard.error}
		<span>An error has occurred: {$leaderboard.error.message}</span>
	{:else if $leaderboard.isSuccess}
		<div class="border-2 border-black p-4">
			<h2>Tasks leaderboard</h2>
			{#each $leaderboard.data as user}
				<h1>{user._id}: {user.count}</h1>
			{/each}
		</div>
	{/if}
</div>
