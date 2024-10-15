import { Formater } from '@obsinflate/infrastructure/formater';

describe('Formater', () => {
    it('should format a flatten object property in the given template', () => {
        // Arrange
        const template = 'Hello, {{name}}!';
        const formater = new Formater(template);
        const data = { name: 'world' };
        // Act
        const result = formater.format(data);
        // Assert
        expect(result).toBe('Hello, world!');
    });

    it('should format nested object properties in the given template', () => {
        // Arrange
        const template =
            'Hello, {{user.name}}! You have {{user.notifications.count}} new messages.';
        const formater = new Formater(template);
        const data = { user: { name: 'John', notifications: { count: 5 } } };
        // Act
        const result = formater.format(data);
        // Assert
        expect(result).toBe('Hello, John! You have 5 new messages.');
    });
});
