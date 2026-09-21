import type { Operations } from '@unpic/core/base';

// Transformer for @unpic/svelte/base's <Image>, targeting our own ipx server
// (see my-server.js). Builds URLs in ipx's own format: /_ipx/{modifiers}/{src}
// https://github.com/unjs/ipx#url-examples
export function ipxTransform(src: string | URL, operations: Operations): string {
	const modifiers: string[] = [];
	if (operations.width) modifiers.push(`w_${operations.width}`);
	if (operations.height) modifiers.push(`h_${operations.height}`);
	if (operations.quality) modifiers.push(`q_${operations.quality}`);
	modifiers.push(`f_${operations.format ?? 'auto'}`);

	// Our `src` is a presigned R2 URL with its own query string (?X-Amz-...).
	// Building the path via the URL API (rather than plain string concatenation)
	// percent-encodes that leading '?' so it survives as part of the ipx path
	// instead of being parsed as this request's own query string.
	const url = new URL('http://ipx.invalid');
	url.pathname = `/_ipx/${modifiers.join(',')}/${src.toString()}`;
	return url.pathname;
}
