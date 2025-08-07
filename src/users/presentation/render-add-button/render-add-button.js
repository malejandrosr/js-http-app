import { showModal } from "../render-modal/render-modal";
import "./render-add-button.css";

/**
 * Renders a floating action button (FAB) to add a new user.
 * @param {HTMLDivElement} element
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const renderAddButton = (element) => {
    const fabButton = document.createElement("button");
    fabButton.innerText = "+";
    fabButton.classList.add("fab-button");

    element.append(fabButton);

    fabButton.addEventListener("click", () => {
        showModal();
    });
};
