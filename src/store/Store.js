export default class Store {
    constructor(reducer, initialState = {}) {
        this.subscribers = [];
        this.reducer = reducer;
        this._state = this.reduce(initialState);
    }
    reduce =(state, action) => {
        return this.reducer(state, action);
    }

    dispatch = actionType => {
        const action = actionType.type
            ? actionType
            : { type: actionType };

        const state = this.state;

        this._state = this.reduce(this.state, action);
        this.subscribers.forEach(fn => fn(this.state, state));
    }
    get state() {
        return this._state;
    }
    subscribe = fn => {
        this.subscribers.push(fn);
        fn(this.state);
    }
    unsubscribe = fn => {
        this.subscribers = this.subscribers.filter(s => s !== fn);
    }
}
