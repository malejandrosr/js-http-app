/**
 * This function fetches the next user ID from the server.
 * @returns {Promise<number>} The next user ID to be used.
 * @throws {Error} If there is an error fetching the next user ID.
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const loadNextUserId = async () => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=1`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching next user ID");
    }

    const data = await response.json();

    const items = data.items;

    return (items + 1).toString();
}
