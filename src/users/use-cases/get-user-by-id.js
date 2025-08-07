import { localhostUserToModel } from "../mappers/localhost-user-to-model.mapper";
import { User } from "../models/user";

/**
 * Load users by id
 * @param {String|Number} id
 * @returns {Promise<User>}
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const getUserById = async (id) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${id}`;

    const response = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });

    if (!response.ok) {
        throw new Error("Error fetching data");
    }

    const responseJson = await response.json();

    const user = localhostUserToModel(responseJson);

    return user;
};
