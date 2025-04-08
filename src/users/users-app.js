import usersStore from "./store/users-store";

/**
 * Render the Users App
 * @param {HTMLDivElement} element
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const UsersApp = async (element) => {
    element.innerHTML = "Loading...";

    await usersStore.loadNextPage();
};
