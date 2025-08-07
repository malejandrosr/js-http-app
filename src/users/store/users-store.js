import { User } from "../models/user";
import { loadNextUserId } from "../use-cases/load-next-user-id";
import { loadUsersByPage } from "../use-cases/load-users-by-page";

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
 * Load next user ID
 * @returns {Promise<number>} The next user ID to be used.
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const loadNextId = async () => await loadNextUserId();

/**
 * On user changed
 * @param {User} persistedUser
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const onUserChanged = (persistedUser) => {
    let wasUserFound = false;

    state.users = state.users.map((user) => {
        if (user.id === persistedUser.id) {
            return persistedUser;
        }

        return user;
    });

    if (state.users.length < 10 && !wasUserFound) {
        state.users.push(persistedUser);
    }
};

/**
 * Reload page
 * @returns void
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const reloadPage = async () => {
    const users = await loadUsersByPage(state.currentPage);

    if (users.length === 0) {
        await loadPrevPage();
        return;
    }

    state.users = users;
};

export default {
    loadNextPage,
    loadPrevPage,
    loadNextId,
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
