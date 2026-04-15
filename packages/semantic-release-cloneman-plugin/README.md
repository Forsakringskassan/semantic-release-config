# `@forsakringskassan/semantic-release-cloneman-plugin`

A semantic-release plugin that publishes your [Cloneman](https://github.com/Forsakringskassan/cloneman) template to the npm registry.

## Usage

The recommended way to use this plugin is via the [`@forsakringskassan/semantic-release-cloneman-config`](../semantic-release-cloneman-config) package, which includes this plugin.

To use it standalone, install it manually and append it to your semantic config.

```bash
npm install --save-dev @forsakringskassan/semantic-release-cloneman-plugin
```

Semantic release config

```javascript
{
    "plugins": [
        ...
        ["@forsakringskassan/semantic-release-cloneman-plugin"],
        ...
    ]
}
```

## Authentication

The plugin resolves authentication in the following order:

1. **Local `.npmrc`** — If a `.npmrc` file exists in the project root and contains a token for the target registry, it is used for authentication.
2. **`NPM_TOKEN` environment variable** — If no token is found in `.npmrc`, the plugin falls back to the `NPM_TOKEN` environment variable.

## Environment Variables read by the plugin

| Variable           | Required | Description                                                      |
| ------------------ | -------- | ---------------------------------------------------------------- |
| `NPM_TOKEN`        | No       | Authentication token used to publish to the npm registry.        |
| `NPM_REGISTRY_URL` | No       | The npm registry URL. Defaults to `https://registry.npmjs.org/`. |
