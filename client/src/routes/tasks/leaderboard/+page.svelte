<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import type { IUsernameWithCount } from '../../../interfaces';
	import { page } from '$app/stores';
	import { userInfo } from 'os';
	const leaderboard = useQuery<IUsernameWithCount[], Error>(
		'leaderboard',
		() =>
			fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/task/leaderboard`).then((res) =>
				res.json()
			),
		{ refetchInterval: 1000 }
	);
</script>

<div class="text-2xl border-2 border-black tracking-tight" style={`color: #${$page.url.searchParams.get("color")}`}>
	{#if $leaderboard.isLoading}
		<span>Loading...</span>
	{:else if $leaderboard.error}
		<span>An error has occurred: {$leaderboard.error.message}</span>
	{:else if $leaderboard.isSuccess}
		<!-- <table class="table-fixed w-screen max-h-screen  p-4 ">
			<thead>
				<tr class="">
					<th class="w-[65%]">username</th>
					<th>tasks completed</th>
				</tr>
			</thead>
			{#each $leaderboard.data as user}
				<tr class="py-[10px]">
					<td>{user._id}</td>
					<td class="text-center">{user.count}</td>
				</tr>
			{/each}
		</table> -->
		{#each $leaderboard.data as user}
			<h1 class="font-semibold">{user._id}: <span class="font-normal">{user.count}</span></h1>
		{/each}
	{/if}
</div>
