import usersStore from "../../store/users-store";
import "./render-table.css";

/** @type {HTMLTableElement} table */
let table;

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
                    <a href="#" class="edit" data-id="${user.id}">Edit</a>
                    |
                    <a href="#" class="delete" data-id="${user.id}">Delete</a>
                </td>
            </tr>
        `;
    });

    table.querySelector("tbody").innerHTML = tbodyTr;
};
