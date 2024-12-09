export default function GoogleViewModel() {

    // const client_id = process.env.client_id;
    // const redirect_uri = '';

    const handleLogin = async () => {
        try {
            window.location.href = `${process.env.NEXT_PUBLIC_HTTP_SERVER}/auth/login/google/`;
        } catch (error) {
            console.error("Login failed", error);
        }
    };

    return {
        handleLogin,
    };
}