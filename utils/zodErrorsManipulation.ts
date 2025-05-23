import z from 'zod';
export function zodErrorsManipulation(zodErrors: z.ZodError) {
	const fieldErrors = zodErrors.errors.reduce(
		(acc: { [x: string]: unknown[] }, error: { path: unknown[]; message: unknown }) => {
			const fieldPath = error.path && error.path.length > 0 ? error.path.join('.') : 'genericError';
			if (!acc[fieldPath]) {
				acc[fieldPath] = [];
			}
			acc[fieldPath].push(error.message);
			return acc;
		},
		{},
	);
	return fieldErrors;
}
