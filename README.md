# @forsakringskassan/semantic-release-config

## Install

`$ npm install --save-dev @forsakringskassan/semantic-release-config`

## Usage

The shareable configs can be configured in the semantic-release configuration file

- Primary releases from `master` (alias: `main`, `dev`).
- Hotfixes from `release/N.x` and `release/N.N.x`.
- Prereleases from `beta`.

### NPM package

Use this preset if your repo is publishing an NPM package.

Edit `package.json`:

```json
{
    "release": {
        "extends": "@forsakringskassan/semantic-release-config"
    }
}
```

### Monorepo

Use this preset if your repo is publishing NPM packages from a monorepo.

Edit `package.json`:

```json
{
    "release": {
        "extends": "@forsakringskassan/semantic-release-monorepo"
    }
}
```

## Github Actions

> [!IMPORTANT]
> The Github action only works when [Trusted publishing](https://docs.npmjs.com/trusted-publishers/) is enabled.
> If you need to use token based authentication you cannot use this action.

To use with Github actions:

```yaml
concurrency: release-${{ github.ref }}

jobs:
    release:
        runs-on: ubuntu-latest
        permissions:
            contents: write
            issues: write
            pull-requests: write
            id-token: write
        steps:
            - name: Create Github application token
              uses: actions/create-github-app-token@v2
              id: app-token
              with:
                  app-id: ${{ vars.RELEASE_APP_ID }}
                  private-key: ${{ secrets.RELEASE_APP_KEY }}
            - name: Checkout
              uses: actions/checkout@v5
              with:
                  fetch-depth: 0
                  token: ${{ steps.app-token.outputs.token }}
            - name: Use Node.js
              uses: actions/setup-node@v6
              with:
                  node-version: 24.x
            - name: Install dependencies
              run: npm ci
            - name: Build
              run: npm run build
            - name: Release
              uses: Forsakringskassan/semantic-release-config@main
              with:
                  app-slug: ${{ steps.app-token.outputs.app-slug }}
                  gh-token: ${{ steps.app-token.outputs.token }}
```

`main` can also be replaced by a semantic versioned tag such as `v13.0.0`:

```diff
-uses: Forsakringskassan/semantic-release-config@main
+uses: Forsakringskassan/semantic-release-config@v13.0.0
```

> [!IMPORTANT]
> You **do not** need to have `semantic-release` or `@forsakringskassan/semantic-release-config` installed as a dependency in `package.json`.
> This action installs all the dependencies automatically.

**Options**:

| Parameter       | Required | Default | Description                                                                  |
| --------------- | -------- | ------- | ---------------------------------------------------------------------------- |
| `app-slug`      | ✓        |         | Github application slug.                                                     |
| `gh-token`      | ✓        |         | Github token used when comminting and using the Github API.                  |
| `config-preset` |          |         | Configuration package to use, overrides automatic detection.                 |
| `dry-run`       |          | `false` | Run semantic-release in dry-run mode.                                        |
| `skip-install`  |          | `false` | Set to true to skip installig semantic-release and the configuration preset. |
