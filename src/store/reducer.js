import {
    ACTIVATE,
    DEACTIVATE,
    REDIRECT_STARTED,
    REDIRECT_FINISHED
} from './actions';

const ACTIVE_REDUCER = state => ({
    [ACTIVATE]   : { ...state, active: true },
    [DEACTIVATE] : { ...state, active: false }
});

const REDIRECT_REDUCER = (state, payload) => ({
    [REDIRECT_STARTED]  : { ...state, redirectUrl: payload },
    [REDIRECT_FINISHED] : { ...state, redirectUrl: null }
});

const REDUCER = state => ({
    ...ACTIVE_REDUCER(state),
    ...REDIRECT_REDUCER(state)
});

export default function (state = {}, action = {}) {
    const reducer = REDUCER(state)[action.type];

    return reducer
        ? reducer
        : state;
}
