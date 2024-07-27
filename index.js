// Services
import { getCats } from "./services/index.mjs";

// Utils
import { createCardList, showEmptyCardListState, createEmptyCardListState } from "./utils/render.mjs";

async function homePage() {
    try {
        const emojisList = await getCats();
        // Render the list of cards
        const cardList = createCardList(emojisList);
        document.querySelector(".container").appendChild(cardList);

        // Check cards
        showEmptyCardListState(cardList, { emptyStateText: "There are no more cats! 😔" });
    } catch {
        const errorComponent = createEmptyCardListState("An error has occurred 😱");
        document.querySelector('.container').appendChild(errorComponent);
    }
};

homePage();