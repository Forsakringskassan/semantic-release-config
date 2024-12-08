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

### Script-portlet

Use this preset if your repo is publishing an Etjänst for use with Sitevision.

Edit `package.json`:

```json
{
    "release": {
        "extends": "@forsakringskassan/semantic-release-script-portlet-config"
    }
}
```

### Sitevision

Edit `package.json`:

```json
{
    "release": {
        "extends": "@forsakringskassan/semantic-release-sitevision-config"
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
