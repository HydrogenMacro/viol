import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { currentPage } from "../..";

@customElement("viol-level-select")
export class LevelSelect extends LitElement {
    static styles = css``;

    render() {
        return html`
            <button @click="${() => currentPage.set("game")}">sel</button>
        `;
    }
}
