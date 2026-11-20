export default class CustomCharCounterElement extends HTMLElement {
    #value = '';
    #config = {};
    get value() {
        return this.#value;
    }
    set value(newValue) {
        this.#value = newValue ?? '';
        this.#updateUI();
    }

    get config() {
        return this.#config;
    }

    set config(newConfig) {
        this.#config = newConfig ?? {};
        this.#updateConfig();
    }

    connectedCallback() {
        this.innerHTML = `
      <div style="font-family: inherit;">
        <uui-input id="input" style="width: 100%;" placeholder="Enter text..."></uui-input>
        <div style="display: flex; justify-content: flex-end; margin-top: 4px; font-size: 12px; color: #666;">
          <span id="counter">0 characters</span>
        </div>
      </div>
    `;
        const input = this.querySelector('#input');
        input.value = this.#value;
        input.addEventListener('input', (e) => {
            this.#value = e.target.value;
            this.#updateCounter();
            this.dispatchEvent(new CustomEvent('property-value-change', { bubbles: true, composed: true }));
        });

        this.#updateConfig();
        this.#updateUI();
    }

    #updateConfig() {
        const input = this.querySelector('#input');
        if (input) {
            const placeholder = this.#config?.find?.(x => x.alias === 'placeholder')?.value || 'Enter text...';
            input.placeholder = placeholder;
        }
    }

    #updateUI() {
        const input = this.querySelector('#input');
        if (input) {
            input.value = this.#value;
        }
        this.#updateCounter();
    }

    #updateCounter() {
        const counter = this.querySelector('#counter');
        if (counter) {
            const len = this.#value ? this.#value.length : 0;
            const max = this.#config?.find?.(x => x.alias === 'maxChars')?.value;
            if (max) {
                counter.textContent = `${len} / ${max} characters`;
                counter.style.color = len > max ? '#d9534f' : '#666';
            } else {
                counter.textContent = `${len} character${len === 1 ? '' : 's'}`;
                counter.style.color = '#666';
            }
        }
    }
}
customElements.define('custom-char-counter', CustomCharCounterElement);