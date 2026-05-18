import { css, html, LitElement, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("viol-navbar")
export class Navbar extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            height: 3rem;
            display: flex;
        }
        .navbar-side-section {
            flex: 1;
            background: red;
        }
    `;

    render(): TemplateResult {
        return html`
            <div class="navbar-side-section"></div>
            <div class="navbar-side-section"></div>
            <div class="navbar-side-section"></div>
        `;
    }
}
