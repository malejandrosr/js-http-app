import { localhostUserToModel } from "../mappers/localhost-user-to-model.mapper";
import { userToLocalhost } from "../mappers/user-to-localhost.mapper";
import { User } from "../models/user";
import usersStore from "../store/users-store";

/**
 * This function is a placeholder for saving user data.
 * @param {User} userObj
 * @returns {Promise<User>}
 * @throws {Error} If the user does not have a first name or last name.
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const saveUser = async (userObj) => {
    const user = new User(userObj);

    if (!user.firstName || !user.lastName) {
        throw new Error("First name and last name are required");
    }

    const userToSave = userToLocalhost(user);
    let userPersisted;

    if (user.id) {
        userPersisted = await updateUser(userToSave);
    } else {
        userToSave.id = await usersStore.loadNextId();
        userPersisted = await createUser(userToSave);
    }

    return localhostUserToModel(userPersisted);
};

/**
 * Creates a new user by sending a POST request to the server.
 * @param {User} user
 * @returns {Promise<User>}
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const createUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users`;

    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Error saving user data");
    }

    const responseJson = await response.json();

    return responseJson;
};

/**
 * Updates an existing user by sending a PUT request to the server.
 * @param {User} user
 * @returns {Promise<User>}
 * @author M.Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const updateUser = async (user) => {
    const url = `${import.meta.env.VITE_BASE_URL}/users/${user.id}`;

    const response = await fetch(url, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify(user),
    });

    if (!response.ok) {
        throw new Error("Error updating user data");
    }

    const responseJson = await response.json();

    return responseJson;
};
