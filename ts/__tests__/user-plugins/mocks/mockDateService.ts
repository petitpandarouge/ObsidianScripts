export class MockDateService {
    now = jest.fn().mockImplementation(() => {
        return {
            format: jest.fn()
        };
    });
}