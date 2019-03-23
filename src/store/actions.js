
const ACTIVE_TYPES = [
    'ACTIVATE',
    'DEACTIVATE',
    'REDIRECT_STARTED',
    'REDIRECT_FINISHED'
];

const TYPES = [
    ...ACTIVE_TYPES
];

const symbols = {};

TYPES.forEach(type => {
    symbols[type] = Symbol(type);
});

module.exports = symbols;
