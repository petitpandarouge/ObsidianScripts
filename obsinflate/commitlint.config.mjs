export default {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'body-full-stop': [2, 'always', '.'],
        'body-max-line-length': [2, 'always', 100],
        'body-case': [
            2,
            'always',
            ['sentence-case', 'start-case', 'pascal-case', 'upper-case']
        ],
        'body-empty': [1, 'never'],
        'footer-max-line-length': [2, 'always', 100],
        'footer-empty': [1, 'never'],
        'references-empty': [1, 'never'],
        'scope-enum': [
            2,
            'always',
            [
                'obsidian',
                'quickadd',
                'userplugins',
                'dataview',
                'ci',
                'build',
                'release',
                'cms',
                'integration'
            ]
        ],
        'scope-empty': [1, 'never'],
        'type-enum': [
            2,
            'always',
            ['feat', 'fix', 'docs', 'style', 'refactor', 'test', 'chore']
        ]
    }
};
