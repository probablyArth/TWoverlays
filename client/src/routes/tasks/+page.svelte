<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import type { ITask } from '../../interfaces';
	
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
				<h1>{task.user.name}: {task.name}</h1>
			{/each}
		</div>
	{/if}
</div>

<style>
	.main {
		background: #fff;
	}
</style>
