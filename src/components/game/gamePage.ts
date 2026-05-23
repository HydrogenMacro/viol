import { css, html, LitElement } from "lit";
import { customElement } from "lit/decorators.js";
import { ViolEngine } from "../../game/engine";
import { makeNotePitch, type NotePitch } from "../../game/note";
import { bitflag, clearBit, setBit } from "../../lib/bitflag";

const C_STRING = makeNotePitch("C", 3);

type Keybind =
    | { type: "finger"; value: number }
    | { type: "string"; value: number };
@customElement("viol-game-page")
export class GamePage extends LitElement {
    static styles = css`
        :host {
            width: 100%;
            height: 100%;
            background: blue;
            display: flex;
        }
    `;
    engine = new ViolEngine();
    // -1 is none
    currentPlayedString = -1;

    currentFingerSemitones = bitflag();

    keybinds: Map<string, Keybind> = new Map([
        ["KeyN", { type: "finger", value: 0 }],
        ["KeyB", { type: "finger", value: 1 }],
        ["KeyV", { type: "finger", value: 2 }],
        ["KeyC", { type: "finger", value: 3 }],
        ["KeyX", { type: "finger", value: 4 }],
        ["KeyZ", { type: "finger", value: 5 }],
        ["ShiftLeft", { type: "finger", value: 6 }],
        ["Semicolon", { type: "string", value: 2 }],
        ["Quote", { type: "string", value: 3 }],
        ["Period", { type: "string", value: 0 }],
        ["Slash", { type: "string", value: 1 }],
    ]);

    _handleKeydown(ev: KeyboardEvent) {
        if (ev.repeat) return;
        let keybind = this.keybinds.get(ev.code);
        if (!keybind) return;
        switch (keybind.type) {
            case "finger":
                setBit(this.currentFingerSemitones, keybind.value);
                break;
            case "string":
                this.currentPlayedString = keybind.value;
                break;
        }

        this.update();
    }
    handleKeydown = this._handleKeydown.bind(this);

    _handleKeyup(ev: KeyboardEvent) {
        if (ev.repeat) return;
        let keybind = this.keybinds.get(ev.code);
        if (!keybind) return;
        switch (keybind.type) {
            case "finger":
                clearBit(this.currentFingerSemitones, keybind.value);
                break;
            case "string":
                this.currentPlayedString = -1;
                break;
        }
        this.update();
    }
    handleKeyup = this._handleKeyup.bind(this);

    pointerMovedThisFrame = false;
    framesNotMoved = 0;
    _handlePointermove(ev: MouseEvent) {
        this.currentPlayedString = 3;
        this.pointerMovedThisFrame = true;
    }
    handlePointermove = this._handlePointermove.bind(this);

    update() {
        if (this.currentPlayedString === -1) {
            this.engine.stop();
        } else {
            this.engine.play(
                playedStringToNote(
                    32 - Math.clz32(this.currentFingerSemitones),
                    this.currentPlayedString,
                    C_STRING,
                ),
            );
        }
    }

    connectedCallback() {
        window.addEventListener("keydown", this.handleKeydown);
        window.addEventListener("keyup", this.handleKeyup);
        window.addEventListener("pointermove", this.handlePointermove);

        const loop = () => {
            if (this.framesNotMoved === 20) {
                this.currentPlayedString = -1;
                this.update();
            }
            if (this.pointerMovedThisFrame) {
                if (this.framesNotMoved >= 20) {
                    this.update();
                }
                this.framesNotMoved = 0;
            } else {
                this.framesNotMoved += 1;
            }

            this.pointerMovedThisFrame = false;
            requestAnimationFrame(loop);
        };
        loop();
    }
    disconnectedCallback() {
        window.removeEventListener("keydown", this.handleKeydown);
        window.removeEventListener("keyup", this.handleKeyup);
        window.removeEventListener("pointermove", this.handlePointermove);
    }
    render() {
        return html` <div></div> `;
    }
}

function playedStringToNote(
    fingerSemitone: number,
    string: number,
    baseString: NotePitch,
): NotePitch {
    return (baseString + fingerSemitone + string * 7) as NotePitch;
}
