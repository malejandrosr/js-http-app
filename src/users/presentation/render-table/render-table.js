import usersStore from "../../store/users-store";
import { deleteUserById } from "../../use-cases/delete-user-by-id";
import { showModal } from "../render-modal/render-modal";
import "./render-table.css";

/** @type {HTMLTableElement} table */
let table;

/**
 * Table select listener.
 * @param {MouseEvent} event
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const tableSelectListener = (event) => {
    const element = event.target.closest(".select-user");

    if (!element) {
        return;
    }

    const id = element.getAttribute("data-id");

    showModal(id);
};

/**
 * Table delete listener.
 * @param {MouseEvent} event
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
*/
const tableDeleteListener = async (event) => {
    const element = event.target.closest(".delete-user");

    if (!element) {
        return;
    }

    const id = element.getAttribute("data-id");

    try {
        await deleteUserById(id);

        await usersStore.reloadPage();

        document.querySelector("#current-page").textContent = usersStore.getCurrentPage();

        renderTable();
    } catch (error) {
        console.error("Error deleting user:", error);
        alert("Error deleting user. Please try again later.");
    }
};

/**
 * Renders the table with the users.
 * @returns {HTMLTableElement}
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const createTable = () => {
    const table = document.createElement("table");

    const thead = document.createElement("thead");
    thead.innerHTML = `
        <tr>
            <th>ID</th>
            <th>Balance</th>
            <th>Firstname</th>
            <th>Lastname</th>
            <th>Active</th>
            <th>Actions</th>
        </tr>
    `;

    const tbody = document.createElement("tbody");

    table.append(thead, tbody);

    return table;
}

/**
 * Renders a table in the given HTML element.
 * @param {HTMLDivElement} element
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const renderTable = (element) => {
    const users = usersStore.getUsers();

    if (!table) {
        table = createTable();
        element.append(table);

        // TODO: Add event listeners to the table
        table.addEventListener("click", tableSelectListener);
        table.addEventListener("click", tableDeleteListener);
    }

    let tbodyTr = "";
    users.forEach((user) => {
        tbodyTr += `
            <tr>
                <td>${user.id}</td>
                <td>${user.balance}</td>
                <td>${user.firstName}</td>
                <td>${user.lastName}</td>
                <td>${user.isActive ? "Yes" : "No"}</td>
                <td>
                    <a href="#" class="select-user" data-id="${user.id}">Select</a>
                    |
                    <a href="#" class="delete-user" data-id="${user.id}">Delete</a>
                </td>
            </tr>
        `;
    });

    table.querySelector("tbody").innerHTML = tbodyTr;
};
