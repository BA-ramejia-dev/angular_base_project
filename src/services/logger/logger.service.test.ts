import { LoggerService } from '@/services/logger/logger.service';

describe('LoggerService', () => {
    let loggerService: LoggerService;
    const consoleLogMock = jest.fn();
    const consoleWarnMock = jest.fn();
    const consoleErrorMock = jest.fn();

    beforeEach(() => {
        jest.spyOn(console, 'log').mockImplementation(consoleLogMock);
        jest.spyOn(console, 'warn').mockImplementation(consoleWarnMock);
        jest.spyOn(console, 'error').mockImplementation(consoleErrorMock);
        loggerService = new LoggerService();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should not display log message in prod environment', () => {
        const logMessage = 'sample log';
        loggerService.log(logMessage);
        expect(consoleLogMock).not.toHaveBeenCalled();
    });

    it('should not display warning message in prod environment', () => {
        const logMessage = 'sample log';
        loggerService.warning(logMessage);
        expect(consoleWarnMock).not.toHaveBeenCalled();
    });

    it('should not display error message in prod environment', () => {
        const logMessage = 'sample log';
        loggerService.error(logMessage);
        expect(consoleErrorMock).not.toHaveBeenCalled();
    });
});
