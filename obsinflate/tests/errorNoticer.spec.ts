import {
    DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS,
    ErrorNoticer
} from '@obsinflate/errorNoticer';
import Chance from 'chance';
import { INoticer } from '@obsinflate/infrastructure/noticer';
import { mock } from 'jest-mock-extended';
import { Duration } from 'luxon';
import {
    BUSINESS_ERROR_COLOR,
    TECHNICAL_ERROR_COLOR
} from '@obsinflate/infrastructure/color';
import { TestBusinessError } from '@obsinflate/tests/mocks/TestBusinessError';

describe('ErrorNoticer', () => {
    it('should notice Obsidian for the given duration and rethrow if Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const mockNoticer = mock<INoticer>();
        const duration = Duration.fromMillis(chance.integer());
        const errorNoticer = new ErrorNoticer(mockNoticer, duration);
        const wrappedAction = jest.fn(() => {
            throw new Error(errorMessage);
        });
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            duration.milliseconds,
            TECHNICAL_ERROR_COLOR
        );
    });
    it('should not notice Obsidian if no exception is thrown by the inner execution', async () => {
        // Arrange
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const wrappedAction = jest.fn();
        // Act
        await errorNoticer.wrap(wrappedAction);
        // Assert
        expect(mockNoticer.notice).toHaveBeenCalledTimes(0);
    });
    it('should notice Obsidian for the given duration and rethrow if an error that is not an instance of Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const duration = Duration.fromMillis(chance.integer());
        const errorNoticer = new ErrorNoticer(mockNoticer, duration);
        const unknownError = { whateverMessage: chance.string() };
        const wrappedAction = jest.fn(() => {
            throw unknownError;
        });
        const errorMessage = `An unknown error occured in "${wrappedAction.name}" action. Open the Developer Tools to know more about it.`;
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        // toThrow() only works with Error instances.
        await expect(action).rejects.toEqual(unknownError);
        expect(mockNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            duration.milliseconds,
            TECHNICAL_ERROR_COLOR
        );
    });
    it('should notice Obsidian for 5 seconds if no duration is provided when Error is thrown by the inner execution', async () => {
        // Arrange
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const chance = new Chance();
        const errorMessage = chance.word();
        const wrappedAction = jest.fn(() => {
            throw new Error(errorMessage);
        });
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        await expect(action).rejects.toThrow();
        expect(mockNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS,
            TECHNICAL_ERROR_COLOR
        );
    });
    it('should notice Obsidian for 5 seconds if no duration is provided when an error that is not an instance of Error is thrown by the inner execution', async () => {
        // Arrange
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const unknownError = {};
        const wrappedAction = jest.fn(() => {
            throw unknownError;
        });
        const errorMessage = `An unknown error occured in "${wrappedAction.name}" action. Open the Developer Tools to know more about it.`;
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        await expect(action).rejects.toEqual(unknownError);
        expect(mockNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS,
            TECHNICAL_ERROR_COLOR
        );
    });
    it('should notice Obsidian for the given duration if business Error is thrown by the inner execution', async () => {
        // Arrange
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const chance = new Chance();
        const errorMessage = chance.word();
        const wrappedAction = jest.fn(() => {
            throw new TestBusinessError(errorMessage);
        });
        // Act
        await errorNoticer.wrap(wrappedAction);
        // Assert
        expect(mockNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            DEFAULT_ERROR_NOTICE_TIMEOUT_IN_MS,
            BUSINESS_ERROR_COLOR
        );
    });
});
