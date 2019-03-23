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

const REDUCER = (state, payload) => ({
    ...ACTIVE_REDUCER(state),
    ...REDIRECT_REDUCER(state, payload)
});

export default function (state = {}, action = {}) {
    const reducer = REDUCER(state, action.payload)[action.type];

    return reducer || state;
}

