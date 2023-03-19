export default {
  "**/*.{ts,tsx}": "eslint --cache --fix",
  "**/package.json": () => "yarn"
}