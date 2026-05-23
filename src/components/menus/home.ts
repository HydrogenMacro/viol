import { css, html, LitElement, type CSSResultGroup, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";
import { currentMenu } from "./menuPage";

@customElement("viol-home-menu")
export class HomeMenu extends LitElement {
    static styles = css`
        :root {
            flex: 1;
        }
        #bg {
            width: 100%;
            height: 100%;
            background: blue;
        }

    `;
    render(): TemplateResult {
        return html`
            <button @click="${() => currentMenu.set("level-select")}">start</button>
        `
    }
}