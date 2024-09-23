import { MockDate } from './mockDate';

export class MockDateService {
    now = jest.fn().mockImplementation(() => {
        return new MockDate();
    });
}
