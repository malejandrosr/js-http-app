/**
 * Deletes a user by their ID.
 * @param {String|Number} id
 * @returns {Promise<User>}
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const deleteUserById = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

    const response = await fetch(url, { method: "DELETE" });

    if (!response.ok) {
        throw new Error("Error deleting user");
    }

    const responseJson = await response.json();
    console.log({ responseJson });

    return true;
};
