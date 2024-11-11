import { OpenViewState } from 'obsidian';

export class OpenViewStateBuilder {
    constructor() {
        this.viewState = {};
    }
    private viewState: OpenViewState;
    inSourceMode(): OpenViewStateBuilder {
        if (!this.viewState.state) {
            this.viewState.state = {};
        }
        this.viewState.state = {
            ...this.viewState.state,
            mode: 'source'
        };
        return this;
    }
    withFocusAtTheEndOfTitleView(): OpenViewStateBuilder {
        if (!this.viewState.state) {
            this.viewState.eState = {};
        }
        this.viewState.eState = {
            ...this.viewState.eState,
            rename: 'end'
        };
        return this;
    }
    build(): OpenViewState {
        return this.viewState;
    }
}
