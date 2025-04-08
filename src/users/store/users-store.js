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
    const users = await loadUsersByPage(state.currentPage + 1);

    if (users.length === 0) {
        return;
    }

    state.currentPage += 1;
    state.users = users;
};

/**
 * Load previous page
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const loadPrevPage = async () => {
    if (state.currentPage <= 1) {
        return;
    }

    const users = await loadUsersByPage(state.currentPage - 1);

    state.currentPage -= 1;
    state.users = users;
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

    /**
     * Returns the current state of the store.
     * @returns {Array<User>}
     * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
     */
    getUsers: () => [...state.users],
    /**
     * Returns the current page of the store.
     * @returns {Number}
     * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
     */
    getCurrentPage: () => state.currentPage,
};
