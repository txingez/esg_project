export const commonConfig = () => {
    return {
        headers: {
            Authorization: `Bearer ${sessionStorage.getItem(import.meta.env.ENV_TOKEN_KEY)}`,
        }
    }
}
