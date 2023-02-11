import type { PageLoad } from './$types';

export const load = (({ params }) => {
	return {
		color: params.slug
	};
}) satisfies PageLoad;
