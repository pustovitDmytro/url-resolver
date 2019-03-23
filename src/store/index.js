import Store from './Store';
import reducer from './reducer';

const initalState = {
    active      : false,
    redirectUrl : null
};

export default new Store(reducer, initalState);

