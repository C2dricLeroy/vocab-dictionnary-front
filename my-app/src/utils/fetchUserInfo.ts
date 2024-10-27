export async function fetchUserInfo() {
    const response = await fetch("/api/me", { method: "GET", credentials: "include" });
    const data = await response.json();
    return data.user_id;
}
