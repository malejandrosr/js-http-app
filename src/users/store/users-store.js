import { loadUsersByPage } from "../use-cases/load-users-by-page";

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
 * @typedef {Object} State
 * @property {Number} currentPage
 * @property {Array<User>} users
 */
/**
 * @type {State}
 */
const state = {
    currentPage: 0,
    users: [],
};

/**
 * Load next page
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const loadNextPage = async () => {
    await loadUsersByPage(state.currentPage + 1);
};

/**
 * Load previous page
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const loadPrevPage = () => {
    throw new Error("Not implemented");
};

/**
 * On user changed
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const onUserChanged = () => {
    throw new Error("Not implemented");
};

/**
 * Reload page
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const reloadPage = () => {
    throw new Error('Not implemented');
};

export default {
    loadNextPage,
    loadPrevPage,
    onUserChanged,
    reloadPage,

    getUsers: () => [...state.users],
    getCurrentPage: () => state.currentPage,
};
