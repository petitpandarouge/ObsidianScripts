jest.mock('@obsinflate/noticeWrapper', () => {
    return {
      NoticeWrapper: jest.fn(),
    };
  });

import { ErrorNoticer } from '@obsinflate/errorNoticer';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NoticeWrapper } from '@obsinflate/noticeWrapper';
import Chance from 'chance';

describe('ErrorNoticer', () => {
    it('should notice Obsidian and rethrow if Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const errorNoticer = new ErrorNoticer();
        const wrappedAction = jest.fn(() => { throw new Error(errorMessage) });
        const mockNotice = jest.fn();
        (NoticeWrapper as jest.Mock) = mockNotice;
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockNotice).toHaveBeenCalledTimes(1);
        expect(mockNotice).toHaveBeenCalledWith(errorMessage, expect.any(Number));
    });   
    it('should notice Obsidian for the time given to the ErrorNoticer if Error is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const noticeTime = chance.integer({ min: 0, max: 1000 });
        const errorNoticer = new ErrorNoticer(noticeTime);
        const wrappedAction = jest.fn(() => { throw new Error(errorMessage) });
        const mockNotice = jest.fn();
        (NoticeWrapper as jest.Mock) = mockNotice;
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockNotice).toHaveBeenCalledTimes(1);
        expect(mockNotice).toHaveBeenCalledWith(errorMessage, noticeTime);
    });
    it('should not notice Obsidian if no exception is thrown by the inner execution', async () => {
        // Arrange
        const errorNoticer = new ErrorNoticer();
        const wrappedAction = jest.fn();
        const mockNotice = jest.fn();
        (NoticeWrapper as jest.Mock) = mockNotice;
        // Act
        await errorNoticer.wrap(wrappedAction);
        // Assert
        expect(mockNotice).toHaveBeenCalledTimes(0);
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