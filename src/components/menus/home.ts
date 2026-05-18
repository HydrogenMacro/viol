import { css, html, LitElement, type CSSResultGroup, type TemplateResult } from "lit";
import { customElement } from "lit/decorators.js";

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
            <svg viewBox="0 0 100 100">
                <path d="">

                
                </path>
            </svg>
        `
    }
}