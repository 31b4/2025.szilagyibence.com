import type { MiddlewareNext } from 'astro';

export async function onRequest(_context: any, next: MiddlewareNext) {
	return next();
}
