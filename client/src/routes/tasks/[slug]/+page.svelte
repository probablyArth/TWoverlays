<script lang="ts">
	import { useQuery } from '@sveltestack/svelte-query';
	import type { ITask } from '../../../interfaces';

	const tasks = useQuery<ITask[], Error>(
		'tasks',
		() => fetch(`${import.meta.env.VITE_BACKEND_API_BASE_URL}/task`).then((res) => res.json()),
		{ refetchInterval: 1000 }
	);
    import type { PageData } from './$types';
  
    export let data: PageData;
</script>

<div class={`text-2xl tracking-tight text-[${data.color}]`}>
	{#if $tasks.isLoading}
		<span>Loading...</span>
	{:else if $tasks.error}
		<span>An error has occurred: {$tasks.error.message}</span>
	{:else if $tasks.isSuccess}
		<table class="table-fixed w-screen max-h-screen p-4">
			<thead>
				<tr class="">
					<th class="w-[40%]">username</th>
					<th>current task</th>
				</tr>
			</thead>
			{#each $tasks.data as task}
				<tr class="py-[10px]">
					<td>{task.username}</td>
					<td class="text-center">{task.name}</td>
				</tr>
			{/each}
		</table>
	{/if}
</div>
