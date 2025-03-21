/**
 * Fetch a random quote from the Breaking Bad API
 * @returns {Promise<Object>}
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
const fetchQuote = async () => {
    try {
        const url = "http://localhost:3333/random-quote";

        const response = await fetch(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        });

        const data = await response.json();

        return data[0];
    } catch (error) {
        console.error("Error fetching data", error);
    }
};

/**
 * Render the Breaking Bad App
 * @param {HTMLDivElement} element
 * @returns void
 * @author M. Alejandro Salgado Ramírez <alejandrosram@outlook.com>
 */
export const BreakingbadApp = async (element) => {
    document.querySelector("#app-title").innerHTML = "Breakingbad App";

    element.innerHTML = "Loading...";

    const blockquoteLabel = document.createElement("blockquote");
    const h3Label = document.createElement("h3");
    const nextQuoteButton = document.createElement("button");
    nextQuoteButton.innerHTML = "Next Quote";

    /**
     * Render the quote
     * @param {Object} data
     * @returns void
     */
    const renderQuote = (data) => {
        blockquoteLabel.innerHTML = data.quote;
        h3Label.innerHTML = data.author;
        element.replaceChildren(blockquoteLabel, h3Label, nextQuoteButton);
    };

    nextQuoteButton.addEventListener("click", async () => {
        element.innerHTML = "Loading...";

        const quote = await fetchQuote();

        renderQuote(quote);
    });

    fetchQuote().then(renderQuote);
};
