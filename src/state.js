const state = {
    active : false
};

export default state;
export function setState(newState = {}) {
    Object.keys(newState).forEach(key => {
        state[key] = newState[key];
    });
}

