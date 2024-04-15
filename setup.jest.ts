import 'jest-preset-angular/setup-jest';
import '@testing-library/jest-dom/jest-globals';

// Workaround: https://github.com/jsdom/jsdom/issues/2177#issuecomment-1724971596
const handleJsDomStylesheetError = (): void => {
    // eslint-disable-next-line no-console
    const originalConsoleError = console.error;
    const jsDomCssError = 'Error: Could not parse CSS stylesheet';

    // eslint-disable-next-line no-console
    console.error = (...params) => {
        if (!params.find((p) => p.toString().includes(jsDomCssError))) {
            originalConsoleError(...params);
        }
    };
};
handleJsDomStylesheetError();
