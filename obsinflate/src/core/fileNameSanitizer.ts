export const NOTE_TITLE_FORBIDDEN_CARACTERS = [
    '/',
    '\\',
    ':',
    '*',
    '?',
    '"',
    '<',
    '>',
    '|'
];
export const NOTE_TITLE_FORBIDDEN_CARACTERS_REPLACEMENT = '-';

export class FileNameSanitizer {
    sanitize(fileName: string): string {
        for (const forbiddenCaracter of NOTE_TITLE_FORBIDDEN_CARACTERS) {
            fileName = fileName.replace(
                forbiddenCaracter,
                NOTE_TITLE_FORBIDDEN_CARACTERS_REPLACEMENT
            );
        }
        return fileName;
    }
}
