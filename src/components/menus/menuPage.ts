import { signal, SignalWatcher, watch } from "@lit-labs/signals";
import { css, html, LitElement, type TemplateResult } from "lit";
import { customElement, property } from "lit/decorators.js";
import { choose } from "lit/directives/choose.js";

export type Menu = "home" | "settings" | "level-select"
export const currentMenu = signal<Menu>("home");

@customElement("viol-menu-page")
export class MenuPage extends SignalWatcher(LitElement) {
    static styles = css``;

    render() {
        return html`
        <viol-navbar></viol-navbar>
        ${choose(currentMenu.get(), [
            ["home", () => html`<viol-home-menu></viol-home-menu>`],
            ["settings", () => html``],
            ["level-select", () => html``],
        ])}`
    }
}