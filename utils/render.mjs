import { MyCard } from "../components/my-card.mjs";
import { EmptyState } from "../components/empty-state.mjs";

const myCardElementTag = "my-card";
const emptyStateElementTag = "empty-state";

function createCardList(list) {
    // Only load the component once
    if (!customElements.get(myCardElementTag)) {
        customElements.define(myCardElementTag, MyCard);
    }

    const cardList = document.createElement("div");
    cardList.classList.add("card__list");

    list.forEach((emoji, index) => {
        const card = createCard(emoji, index);
        cardList.appendChild(card);
    });

    return cardList;
}

function createCard(data, index) {
    const card = document.createElement(myCardElementTag);
    card.setAttribute("class", "card__item");
    card.setAttribute("title-label", `Cat #${index + 1}`);

    const imageUrl = `https://cataas.com/cat/${data._id}`;
    card.setAttribute("image-url", imageUrl);

    const content = document.createElement("p");
    content.setAttribute("slot", "content");
    content.textContent = `Content for cat #${index + 1}`;

    card.appendChild(content);

    return card;
}

function createEmptyCardListState(emptyStateText) {
    // Only load the component once
    if (!customElements.get(emptyStateElementTag)) {
        customElements.define(emptyStateElementTag, EmptyState);
    }

    const emptyState = document.createElement("empty-state");
    emptyState.setAttribute("text", emptyStateText);

    return emptyState;
}

function showEmptyCardListState(cardList, options = { emptyStateText: "" }) {
    const emptyCardListContainer = createEmptyCardListState(options.emptyStateText);

    const checkEmptyCardListState = () => {
        console.log('checkEmptyCardListState =>', cardList.children.length);
        if (cardList.children.length === 0) {
            document.body.querySelector(".container").removeChild(cardList);
            document.body.querySelector(".container").appendChild(emptyCardListContainer);
        }
    };

    const cardListObserver = new MutationObserver(checkEmptyCardListState);
    cardListObserver.observe(cardList, { childList: true });

    // Initial check
    checkEmptyCardListState();
}

export { createCardList, showEmptyCardListState, createEmptyCardListState };