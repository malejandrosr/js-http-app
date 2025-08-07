import { User } from "../../models/user";
import { getUserById } from "../../use-cases/get-user-by-id";
import "./render-modal.css";
import modalHtml from "./render-modal.html?raw";

/** @type {HTMLDivElement} modal */
let modal;
/** @type {HTMLFormElement} form */
let form;
let loadedUser = {};

/**
 * Hides the modal.
 * @param {String|Number} id
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const showModal = async (id) => {
    modal?.classList.remove("hide-modal");

    loadedUser = {};

    if (!id) {
        return;
    }

    const user = await getUserById(id);

    setModalFormValues(user);
};

/**
 * Hides the modal.
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const hideModal = () => {
    modal?.classList.add("hide-modal");

    form?.reset();
};

/**
 * Sets the form values in the modal based on the user object.
 * @param {User} user
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const setModalFormValues = (user) => {
    if (!user) {
        return;
    }

    const { firstName, lastName, balance, isActive } = user;

    form.querySelector("[name='firstName']").value = firstName;
    form.querySelector("[name='lastName']").value = lastName;
    form.querySelector("[name='balance']").value = balance;
    form.querySelector("[name='isActive']").checked = isActive;

    loadedUser = user;
};

/**
 * Renders a modal to add a new user.
 * @param {HTMLDivElement} element
 * @param {(userObj) => Promise<void>} callback
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const renderModal = (element, callback) => {
    if (modal) {
        return;
    }

    if (!callback) {
        throw new Error("Callback function is required to handle form submission.");
    }

    modal = document.createElement("div");
    modal.innerHTML = modalHtml;
    modal.className = "modal-container hide-modal";

    form = modal.querySelector("form");

    modal.addEventListener("click", (event) => {
        if (event.target.className === "modal-container") {
            hideModal();
        }
    });

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        const userObj = { ...loadedUser };
        const formData = new FormData(form);

        if (!formData.get("isActive")) {
            formData.set("isActive", "off");
        }

        for (const [key, value] of formData) {
            if (key === "balance") {
                userObj[key] = +value;
                continue;
            }

            if (key === "isActive") {
                userObj[key] = (value === "on") ? true : false;
                continue;
            } else {
            }

            userObj[key] = value;
        }

        await callback(userObj);

        hideModal();
    });

    element.append(modal);
};
