import { toCamelCase } from "../utils/strings.mjs";

class MyCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.getAttributes();
  }

  // ==== Attributes ====
  static get observedAttributes() {
    return ["image-url", "image-alt", "title-label"];
  }

  getAttributes() {
    this.imageUrl = this.getAttribute("image-url");
    this.imageAlt = this.getAttribute("image-alt");
    this.titleLabel = this.getAttribute("title-label");
  }

  // ==== Events ====
  setEventListeners() {
    this.shadowRoot
      .getElementById("remove")
      .addEventListener("click", this.onRemove.bind(this));
  }

  onRemove() {
    this.remove();
  }

  // ==== Templates & Styles ====
  getTemplate() {
    const template = document.createElement("template");
    template.innerHTML = `
            <section class="card__wrapper">
                <img class="card__image" preload src="${this.imageUrl}" alt="${this.imageAlt}">
                <div class="card__content">
                    <h2 class="card__title">${this.titleLabel}</h2>
                    <slot name="content"></slot>
                </div>
                <div class="card__actions">
                    <button id="remove" class="card__button card__button--destructive">Remove</button>
                </div>
            </section>
            ${this.getStyles()}
        `;
    return template;
  }

  getStyles() {
    return `
            <style>
                * {
                  margin: 0;
                  padding: 0;
                  box-sizing: border-box;
                }

                :host {
                  width: 100%;
                  display: flex;
                  justify-content: center;
                }

                .card__wrapper {
                  width: 100%;
                  max-width: 270px;
                  display: flex;
                  flex-direction: column;
                  align-items: center;
                  border-color: hsl(240 5.9% 90%);
                  border-radius: 0.5rem;
                  border-width: 1px;
                  border-style: solid;
                  padding: 1.5em 1rem;
                  gap: 0.5rem;
                  box-shadow: 0 0 #0000, 0 0 #0000, 0 20px 25px -5px #0000001a,0 8px 10px -6px #0000001a;
                }

                .card__image {
                    width: 200px;
                    height: 200px;
                    border-radius: 50%;
                    object-fit: cover;

                    /* Prevent text/image selection */
                    user-select: none; 
                    -webkit-user-drag: none;
                }

                .card__content .card__title {
                  text-align: center;
                }

                .card__actions {
                  display: flex;
                  justify-content: space-between;
                  gap: 0.5rem;
                }

                .card__actions .card__button {
                  border: none;
                  padding: .5rem 1rem;
                  border-radius: 0.75rem;    
                  cursor: pointer;
                }

                .card__actions .card__button--destructive {
                  background-color: hsl(0 84.2% 60.2%);
                  color: hsl(0 0% 100%);
                }
            </style>
        `;
  }

  // ==== Helpers ====
  clear() {
    this.shadowRoot.innerHTML = "";
  }

  render() {
    // Clear the shadow DOM
    this.clear();
    // Append the template
    this.shadowRoot.appendChild(this.getTemplate().content.cloneNode(true));
    // Set event listeners
    this.setEventListeners();
  }

  // ==== Lifecycle Callbacks ====
  attributeChangedCallback(name, oldValue, newValue) {
    // Dynamically set the property
    if (oldValue !== newValue) {
      this[toCamelCase(name)] = newValue;
      this.render();
    }
  }

  connectedCallback() {
    this.render();
  }

  disconnectedCallback() {}
}

export { MyCard };
