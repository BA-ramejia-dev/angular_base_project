import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom/jest-globals';
import _ from 'lodash';

// Workaround: https://github.com/jsdom/jsdom/issues/2177
// eslint-disable-next-line no-console
const originalConsoleError = console.error;

// eslint-disable-next-line no-console
console.error = function (msg) {
    if (_.startsWith(msg, '[vuex] unknown')) return;
    if (_.startsWith(msg, 'Error: Could not parse CSS stylesheet')) return;
    originalConsoleError(msg);
};
