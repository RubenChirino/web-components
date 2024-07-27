class EmptyState extends HTMLElement {
    constructor() {
        super();

        this.getAttributes();
    }

    // === Attributes ===
    static get observedAttributes() {
        return ["text"];
    }

    getAttributes() {
        this.text = this.getAttribute("text");
    }

    // === Template & Styles ===
    getTemplate() {
        const emptyState = document.createElement("div");
        emptyState.classList.add("empty");

        emptyState.innerHTML = `
            <img preload class="empty__image" src="https://cataas.com/cat/says/empty-state.png" alt="Empty State">
            <p class="empty__text">${this.text}</p>
            ${this.getStyles()}
        `;

        return emptyState;
    }

    getStyles() {
        return `
            <style>
                .empty {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 1rem;
                }
                
                .empty .empty__text {
                    color: hsl(0 84.2% 60.2%);
                    font-size: 20px;
                }

                .empty .empty__image {
                    width: 200px;
                    height: 200px;
                    /* border-radius: 50%; */
                    object-fit: cover;
                }
            </style>
        `;
    }

    // === Helpers ===
    render() {
        this.appendChild(this.getTemplate());
    }

    // ==== Lifecycle Callbacks ====
    connectedCallback() {
        this.render();
    }

    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue !== newValue) {
            if (name === "text") {
                this.text = newValue;
            }
        }
    }

    disconnectedCallback() {}
}

export { EmptyState };