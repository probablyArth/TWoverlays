<script lang="ts">
	import { QueryClientProvider, QueryClient } from '@sveltestack/svelte-query';
	const queryClient = new QueryClient();
	import '../app.css';
</script>

<QueryClientProvider client={queryClient}>
	<main>
		<slot />
	</main>
</QueryClientProvider>
