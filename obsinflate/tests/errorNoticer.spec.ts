import { ErrorNoticer } from '@obsinflate/errorNoticer';
import Chance from 'chance';
import { INoticer } from '@obsinflate/infrastructure/noticer';
import { mock } from 'jest-mock-extended';

describe('ErrorNoticer', () => {
    it('should notice Obsidian and rethrow if Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
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
            expect.any(Number)
        );
    });
    it('should notice Obsidian for the time given to the ErrorNoticer if Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
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
            expect.any(Number)
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
    it('should notice Obsidian if an error that is not an instance of Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer);
        const unknownError = { whateverMessage: chance.string() };
        const wrappedAction = jest.fn(() => {
            throw unknownError;
        });
        const errorMessage = `An unknown error occured in ${wrappedAction.name}. Open the Developer Tools to know more about it.`;
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        // toThrow() only works with Error instances.
        await expect(action).rejects.toEqual(unknownError);
        expect(mockNoticer.notice).toHaveBeenCalledTimes(1);
        expect(mockNoticer.notice).toHaveBeenCalledWith(
            errorMessage,
            expect.any(Number)
        );
    });
});

// TODO : Timeout
