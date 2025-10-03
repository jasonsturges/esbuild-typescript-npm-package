# ESBuild TypeScript NPM Package

Scaffold TypeScript npm packages using this template to bootstrap your next library.

Built with **ESBuild** for blazing fast builds and **Rollup** for bundled type definitions with watch mode support.


## Getting Started

Use this template via GitHub's "Use this template" button or:

```bash
gh repo create <name> --template="https://github.com/jasonsturges/esbuild-typescript-npm-package"
```

**Important**: Check package name availability before you start to avoid renaming later:

```bash
npm search <term>
```


## Usage

The following tasks are available:

- `npm run build` - Build production distributable (JS + types)
- `npm run dev` - Watch mode for both JS and types (rebuilds on file changes)
- `npm run serve` - Start dev server at http://localhost:3000 with live examples
- `npm run build:js` - Build only JavaScript bundles (all formats)
- `npm run build:types` - Build only TypeScript declarations (single bundled .d.ts)

### Output Formats

This template builds multiple distribution formats:

- **ESM** (`dist/index.es.js`) - Modern ES modules
- **CommonJS** (`dist/index.cjs.js`) - Node.js compatibility
- **UMD** (`dist/index.umd.js`) - Universal module definition
- **IIFE** (`dist/index.iife.js`) - Browser global variable
- **Types** (`dist/index.d.ts`) - Single bundled TypeScript declaration file

### Exports

Export everything from the top-level `index.ts` for inclusion in the build.

For example, if you have a `utils/` folder with an `arrayUtils.ts` file:

```ts
// src/utils/arrayUtils.ts
export const distinct = <T>(array: T[] = []) => [...new Set(array)];
```

Include that export in the top-level `index.ts`:

```ts
// src/index.ts
export { distinct } from "./utils/arrayUtils"
```


## Development

Multiple strategies for development are available.

### Local Development with Examples

The `examples/` folder provides a local development environment with a dev server:

```bash
npm run serve
```

This starts a dev server at http://localhost:3000 with:
- Live rebuilding on file changes
- Serves static assets from the `examples/` folder
- Perfect for rapid prototyping and testing

Edit `examples/index.ts` to test your library. Only exports from `src/index.ts` are included in the production build.

### Watch Mode Development

For development with `npm link` or when working with other projects:

```bash
npm run dev
```

This runs both JavaScript and TypeScript builds in watch mode, automatically rebuilding on file changes. **Both JS and types are rebuilt**, making this ideal for linked package development.

### Linked Project Development

To test your library in other projects before publishing:

#### Using Link

1. **From this library**: Start watch mode and link the package
   ```bash
   npm run dev
   npm link
   ```

2. **From your app**: Link to this library
   ```bash
   npm link "mylib"
   ```

A symlink is created in your app's `node_modules/`. Changes to your library are automatically rebuilt and reflected in your app.

#### Using Pack

From you library, pack it to create a tarball:

```bash
npm pack
```

This will create a [name].tgz tarball that includes the result of what will be uploaded to npm.

Install the pack file in a test app:

```bash
npm install [name].tgz
```


## Development Cleanup

Once development completes, `unlink` both your library and test app projects.

- **From your app**: run `npm unlink "mylib"` or `yarn unlink "mylib"` command to remove the library symlink
- **From your library**: run `npm unlink` or `yarn unlink` command to unregister the package

If you mistakenly forget to `unlink`, you can manually clean up artifacts from `yarn` or `npm`.

For `yarn`, the `link` command creates symlinks which can be deleted from your home directory:
```
~/.config/yarn/link
```

For `npm`, the `link` command creates global packages which can be removed by executing:
```bash
sudo npm rm --global "mylib"
```

Confirm your npm global packages with the command:
```bash
npm ls --global --depth 0
```

For your app, simply reinstall dependencies to clear any forgotten linked packages.  This will remove any symlinks in the `node_modules/` folder.


## Release Publishing

Update your `package.json` to the next version number and tag a release.

Assure that your package lockfile is also updated by running an install.  For npm, this will assure the lockfile has the updated version number.  Yarn does not duplicate the version number in the lockfile.

Assure either a `.npmrc` or `publishConfig` in your `package.json`:

package.json:
```json
  "publishConfig": {
    "registry": "https://registry.npmjs.org/",
    "scope": "username"
    "access": "public",
  }
```

If you are publishing to a private registry such as GitHub packages, update your `package.json` to include `publishConfig` and `repository`:

package.json:
```json
  "publishConfig": {
    "registry": "https://npm.pkg.github.com/@MyOrg"
  }
```

Before publishing, ensure a clean build:

```bash
rm -rf dist
npm run build
```

Verify your package name is available:

```bash
npm search <term>
```

Once ready to publish:

```bash
npm login
npm publish --access public
```

## Continuous Integration

For continuous integration with GitHub Actions, create a `.github/workflows/publish.yml`

For public NPM packages, use the following workflow:

```yml
name: Publish Package to npmjs
on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: 'https://registry.npmjs.org'
      - run: npm ci
      - run: npm run build
      - run: npm publish
        env:
          NODE_AUTH_TOKEN: ${{ secrets.NPM_TOKEN }}
```

For private GitHub packages, use the following workflow:

```yml
name: Publish Package to GitHub Packages
on:
  release:
    types: [created]

jobs:
  build:
    runs-on: ubuntu-latest
    permissions:
      contents: read
      packages: write
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: 20
          registry-url: "https://registry.npmjs.org"
          scope: "@MyOrg"
        env:
          NODE_AUTH_TOKEN: ${{ secrets.GITHUB_TOKEN }}
      - run: npm ci
      - run: npm run build
      - run: npm publish
```

This will deploy your build artifact when a release is tagged.

Obtain an "Automation" CI/CD access token to bypass 2FA from [npm](https://www.npmjs.com/) by selecting your profile image in the upper right, and chosing "Access Tokens".

To add secrets to your repository:
- From your repository, select _Settings_
- From the _Security_ section of the sidebar, expand _Secrets and variables_ and select _Actions_
- From the _Secrets_ tab, press _New repository secret_ to add the `NPM_TOKEN` key

To add secrets to your organization:
- From your organization, select _Settings_
- From the _Security_ section of the sidebar, expand _Secrets and variables_ and select _Actions_
- From the _Secrets_ tab, press _New organization secret_ to add the `NPM_TOKEN` key

For more information, see:
- [Using secrets in GitHub Actions](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)
- [Publish to npmjs and GPR with npm](https://github.com/actions/setup-node/blob/main/docs/advanced-usage.md#publish-to-npmjs-and-gpr-with-npm)
