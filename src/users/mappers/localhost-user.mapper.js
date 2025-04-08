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
 * Returns a User object from localhost user data
 * @param {LocalhostUserData} localhostUserData
 * @returns {User}
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const localhostUser = (localhostUserData) => {
    const {
        avatar,
        balance,
        first_name,
        gender,
        id,
        isActive,
        last_name,
    } = localhostUserData;

    return new User({
        id,
        firstName: first_name,
        lastName: last_name,
        avatar,
        gender,
        balance,
        isActive,
    })
};
