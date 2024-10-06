import { execSync } from 'child_process';

try {
    execSync(`cd .. && husky obsinflate/.husky`, {
        stdio: 'inherit'
    });
    execSync(
        `cd .. && git config --local commit.template obsinflate/.gitmessage`,
        {
            stdio: 'inherit'
        }
    );
} catch (error) {
    console.error('Prepare failed:', error);
    process.exit(1);
}
