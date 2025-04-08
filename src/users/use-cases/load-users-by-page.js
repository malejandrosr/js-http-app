import { localhostUser } from "../mappers/localhost-user.mapper";

/**
 * @typedef {Object} User
 * @property {String} id
 * @property {String} firstName
 * @property {String} lastName
 * @property {String} avatar
 * @property {Number} balance
 * @property {String} gender
 * @property {Boolean} isActive
 */
/**
 * Load users by page
 * @param {Number} page
 * @returns {Promise<Array<User>>}
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const loadUsersByPage = async (page = 1) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users?_page=${page}`;

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

    if (responseJson.last < page) {
        return [];
    }

    const users = responseJson.data.map(localhostUser);

    return users;
};
