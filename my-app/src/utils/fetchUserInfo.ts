export async function fetchUserInfo() {
    const response = await fetch( process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/me/", { method: "GET", credentials: "include" });
    const data = await response.json();
    return data.user_id;
}
