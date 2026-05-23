import { LitElement, css, html, type TemplateResult } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { choose } from 'lit/directives/choose.js';
import { signal, SignalWatcher, watch } from '@lit-labs/signals';
import.meta.glob("./components/**/*.ts", { eager: true });

export type Page = "menu" | "game"
export const currentPage = signal<Page>("menu");

@customElement("viol-root")
export class Root extends SignalWatcher(LitElement) {
  static styles = css`
    :root {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: column;
    }
  `;

  render(): TemplateResult {
    return html`${choose(currentPage.get(), [
      ["menu", () => html`<viol-menu-page></viol-menu-page>`],
      ["game", () => html`<viol-game-page></viol-game-page>`],
    ])}`;
  }
}