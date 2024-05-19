jest.mock('@obsidian/notice', () => {
    return {
      Notice: jest.fn().mockImplementation((message: string, timeoutInMs: number) => {
        return { message, timeoutInMs };
      }),
    };
  });

import { ErrorNoticer } from '@obsidian/errorNoticer';
import { Notice } from '@obsidian/notice';
import Chance from 'chance';

describe('ErrorNotifier', () => {
    it('should notice Obsidian if exception is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const errorNoticer = new ErrorNoticer();
        const action = jest.fn(() => { throw new Error(errorMessage) });
        // Act
        await errorNoticer.wrap(action);
        // Assert
        expect(Notice).toHaveBeenCalledTimes(1);
        expect(Notice).toHaveBeenCalledWith(errorMessage, expect.any(Number));
    });   
});

// TODO : Timeout
// TODO : Rethrow