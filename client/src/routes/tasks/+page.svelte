<script lang="ts">
	import { page } from '$app/stores';
	import { useQuery } from '@sveltestack/svelte-query';
	import type { ITask } from '../../interfaces';

	const tasks = useQuery<ITask[], Error>(
		'tasks',
		() => fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/task`).then((res) => res.json()),
		{ refetchInterval: 1000 }
	);
	
</script>

<div class="text-2xl tracking-tight" style={`color: #${$page.url.searchParams.get("color")}`}>
	{#if $tasks.isLoading}
		<span>Loading...</span>
	{:else if $tasks.error}
		<span>An error has occurred: {$tasks.error.message}</span>
	{:else if $tasks.isSuccess}
		{#each $tasks.data as task}
			<span><span class="font-semibold"  style={`color: ${task.color}`}>{task.username}</span>: <span>{task.name}</span></span>
		{/each}
	{/if}
</div>
