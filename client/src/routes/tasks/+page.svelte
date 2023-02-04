<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	interface ITask {
		name: string;
		finished: boolean;
		username: string;
	}

	const tasks = useQuery<ITask[], Error>(
		'tasks',
		() => fetch('http://localhost:5000/task').then((res) => res.json()),
		{ refetchInterval: 1000 }
	);
</script>

<div class="main">
	{#if $tasks.isLoading}
		<span>Loading...</span>
	{:else if $tasks.error}
		<span>An error has occurred: {$tasks.error.message}</span>
	{:else if $tasks.isSuccess}
		<div>
			{#each $tasks.data as task}
				<h1>{task.username}: {task.name}</h1>
			{/each}
		</div>
	{/if}
</div>

<style>
	.main {
		background: #fff;
	}
</style>
