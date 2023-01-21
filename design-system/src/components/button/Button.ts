import { html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";

@customElement("wc-button")
export class Button extends LitElement {
  protected render(): unknown {
    return html`<button>Click me</button>`;
  }
}
