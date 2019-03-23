import h from '../handler';
import { log } from '../utils/decorators';
import store from './index';

function comparator(state, prevState = {}) {
    if (state.active && !prevState.active) {
        h.handleActivate();
    }
    if (!state.active && prevState.active) {
        h.handleDeactivate();
    }
    if (state.redirectUrl && !prevState.redirectUrl) {
        h.handleRedirect(state.redirectUrl);
    }
}

store.subscribe(log()(comparator));
