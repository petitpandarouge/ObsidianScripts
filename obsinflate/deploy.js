const { execSync } = require('child_process');
const { config } = require('./package.json');

try {
    execSync(`npm run bundle && ncp ./bundles ${config.obsidian.vaults.prod}`, {
        stdio: 'inherit'
    });
    console.log(`Deployment to "${config.obsidian.vaults.prod}" successful!`);
} catch (error) {
    console.error('Deployment failed:', error);
    process.exit(1);
}
