import { User } from "../models/user";

/**
 * @typedef {Object} LocalhostUserData
 * @property {String} id
 * @property {String} first_name
 * @property {String} last_name
 * @property {String} avatar
 * @property {Number} balance
 * @property {String} gender
 * @property {Boolean} isActive
 */
/**
 * Returns a User object formatted for localhost user data
 * @param {User} user
 * @returns {LocalhostUserData} - User object formatted for localhost
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const userToLocalhost = (user) => {
    const {
        avatar,
        balance,
        firstName,
        gender,
        id,
        isActive,
        lastName,
    } = user;

    return {
        avatar,
        balance,
        first_name: firstName,
        gender,
        id,
        isActive,
        last_name: lastName,
    };
}
