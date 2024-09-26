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
        const noticeTime = chance.integer({ min: 0, max: 1000 });
        const mockNoticer = mock<INoticer>();
        const errorNoticer = new ErrorNoticer(mockNoticer, noticeTime);
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
            noticeTime
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
    // TODO - See this with Guy
    // it('should notice Obsidian if an unknown error is thrown by the inner execution', async () => {
    //     // Arrange
    //     const chance = new Chance();
    //     const errorNoticer = new ErrorNoticer();
    //     const wrappedAction = jest.fn(() => { throw new UnknownError(chance.string()) });
    //     const mockNotice = jest.fn();
    //     (Notice as jest.Mock) = mockNotice;
    //     const errorMessage = `An unknown error occured in ${wrappedAction.name} occurred. Update the plugin to fix it.`;
    //     // Act
    //     const action = async () => await errorNoticer.wrap(wrappedAction);
    //     // Assert
    //     await expect(action).rejects.toThrow();
    //     expect(mockNotice).toHaveBeenCalledTimes(1);
    //     expect(mockNotice).toHaveBeenCalledWith(errorMessage, expect.any(Number));
    // });
});

// class UnknownError {
//     constructor(public message: string) {}
// }
// class UnknownError extends Error {
//   constructor(public message: string) {
//       super(message);
//       this.name = 'UnknownError';
//   }
// }

// TODO : Timeout
