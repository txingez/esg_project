export const commonConfig = () => {
	return {
		headers: {
			Authorization: `Bearer ${localStorage.getItem(import.meta.env.ENV_TOKEN_KEY)}`,
		}
	}
}
