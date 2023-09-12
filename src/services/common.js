export const headers = () => ({
    Authorization: `Bearer ${sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)}`,
});
