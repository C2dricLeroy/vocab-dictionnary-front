/**
 * Fetches the current user's ID from the authentication endpoint.
 * Makes an authenticated request to the /api/auth/me/ endpoint to get the user information.
 *
 * @returns {Promise<number | null>} Returns the user ID if successful, null if:
 *   - The user is not authenticated
 *   - The request fails
 *   - The response doesn't contain a user_id
 *
 * @throws Will not throw errors, but logs them to console
 */
export async function fetchUserInfo(): Promise<number | null> {
    try {
        const response = await fetch(
            process.env.NEXT_PUBLIC_BASE_URL + "/api/auth/me/",
            {
                method: "GET",
                credentials: "include"
            }
        );

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        if (!data.user_id) {
            return null;
        }

        return data.user_id;
    } catch (error) {
        console.error('Error fetching user info:', error);
        return null;
    }
}