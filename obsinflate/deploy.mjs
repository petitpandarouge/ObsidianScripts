/* eslint-disable no-undef */
import { execSync } from 'child_process';
import { readFileSync } from 'fs';
import { join } from 'path';

const packageJsonPath = join(process.cwd(), 'package.json');
const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
const config = packageJson.config;

try {
    execSync(`npm run bundle && ncp ./bundles ${config.obsidian.vaults.prod}`, {
        stdio: 'inherit'
    });
    console.log(`Deployment to "${config.obsidian.vaults.prod}" successful!`);
} catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
}
