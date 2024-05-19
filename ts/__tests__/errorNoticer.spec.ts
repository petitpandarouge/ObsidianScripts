jest.mock('@obsidian/notice', () => {
    return {
      Notice: jest.fn(),
    };
  });

import { ErrorNoticer } from '@obsidian/errorNoticer';
import { Notice } from '@obsidian/notice';
import Chance from 'chance';

describe('ErrorNotifier', () => {
    it('should notice Obsidian and rethrow if exception is thrown by the inner execution', async () => {
        // Arrange
        const chance = new Chance();
        const errorMessage = chance.string();
        const errorNoticer = new ErrorNoticer();
        const wrappedAction = jest.fn(() => { throw new Error(errorMessage) });
        const mockNotice = jest.fn();
        (Notice as jest.Mock) = mockNotice;
        // Act
        const action = async () => await errorNoticer.wrap(wrappedAction);
        // Assert
        await expect(action).rejects.toThrow(errorMessage);
        expect(mockNotice).toHaveBeenCalledTimes(1);
        expect(mockNotice).toHaveBeenCalledWith(errorMessage, expect.any(Number));
    });   
    it('should not notice Obsidian if no exception is thrown by the inner execution', async () => {
        // Arrange
        const errorNoticer = new ErrorNoticer();
        const wrappedAction = jest.fn();
        const mockNotice = jest.fn();
        (Notice as jest.Mock) = mockNotice;
        // Act
        await errorNoticer.wrap(wrappedAction);
        // Assert
        expect(mockNotice).toHaveBeenCalledTimes(0);
    });
});

// TODO : Timeout
// TODO : Rethrow