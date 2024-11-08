echo "Checking pipeline..."

npx --no-install npm run build
npx --no-install npm run test:unit
npx --no-install npm run bundle
npx --no-install npm run bundle:helloworld
