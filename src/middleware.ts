import type { MiddlewareNext } from 'astro';

export async function onRequest(context: any, next: MiddlewareNext) {
	const response = await next();
	try {
		const url: URL = context.url ?? new URL(context.request?.url);
		if (url?.pathname === '/card') {
			response.headers.set('X-Robots-Tag', 'noindex, nofollow');
		}
	} catch {
		// noop
	}
	return response;
}
