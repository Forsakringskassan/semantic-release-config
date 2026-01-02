# CHANGELOG

## 3.7.4 (2026-01-02)

### Bug Fixes

* **deps:** update dependency semantic-release-lerna to v2.16.2 0cda58e

## 3.7.3 (2025-12-26)

### Bug Fixes

* **deps:** update dependency semantic-release-lerna to v2.16.1 7f9479a

## 3.7.2 (2025-12-19)

### Bug Fixes

* **deps:** update dependency @semantic-release/npm to v13.1.3 2335d7f
* **deps:** update dependency semantic-release-lerna to v2.16.0 65d9438

## 3.7.1 (2025-12-12)

### Bug Fixes

* **deps:** update dependency semantic-release-lerna to v2.15.2 8c4c246

## 3.7.0 (2025-12-05)

### Features

* **deps:** require nodejs v22 or later f0faf0b
* support `release.config.{mjs,cjs,js}` configuration files 1902fa8

## 3.6.1 (2025-12-05)

### Bug Fixes

* **deps:** update dependency semantic-release-lerna to v2.15.1 5a38d41

## 3.6.0 (2025-11-28)

### Features

* add github action to run semantic-release e8b4607

### Bug Fixes

* **actions:** fix `--dry-run` being applied unconditionally b42dace
* **deps:** update dependency semantic-release-lerna to v2.15.0 5b663d7

## 3.5.0 (2025-11-21)

### Features

* **deps:** update dependency @semantic-release/npm to v13 e44129b
* **deps:** update semantic-release monorepo 52048a4

### Bug Fixes

* **deps:** update dependency @semantic-release/github to v12.0.1 1730c6b
* **deps:** update dependency @semantic-release/github to v12.0.2 be11761
* **deps:** update dependency @semantic-release/npm to v13.1.2 1529b72
* **deps:** update dependency semantic-release to v25.0.2 38cbbaa
* **deps:** update dependency semantic-release-lerna to v2.13.0 cc6a574
* **deps:** update dependency semantic-release-lerna to v2.14.1 7ae9d79
* **deps:** update semantic-release monorepo c7cd7c7

## 3.4.0 (2025-09-28)

### Features

* **deps:** support lerna v9 2bf039f

### Bug Fixes

* **deps:** update dependency semantic-release-lerna to v2.12.0 420b743

## 3.3.6 (2025-09-26)

### Bug Fixes

* **deps:** update dependency semantic-release to v24.2.9 0837072

## 3.3.5 (2025-09-19)

### Bug Fixes

* **deps:** update semantic-release monorepo 799a8d8

## 3.3.4 (2025-09-12)

### Bug Fixes

* **deps:** update dependency @semantic-release/github to v11.0.5 5522507
* **deps:** update dependency @semantic-release/release-notes-generator to v14.1.0 e174673

## 3.3.3 (2025-08-15)

### Bug Fixes

* **deps:** update dependency @semantic-release/github to v11.0.4 be471e2

## 3.3.2 (2025-07-18)

### Bug Fixes

* **deps:** update dependency conventional-changelog-conventionalcommits to v9.1.0 598c6a8
* **deps:** update dependency semantic-release to v24.2.7 fa562a8

## 3.3.1 (2025-07-04)

### Bug Fixes

* **deps:** update dependency @semantic-release/npm to v12.0.2 38d086e
* **deps:** update dependency semantic-release to v24.2.6 e804043

## 3.3.0 (2025-05-30)

### Features

* **deps:** update dependency conventional-changelog-conventionalcommits to v9 4ea9be6

### Bug Fixes

* **deps:** update dependency @semantic-release/github to v11.0.3 b8cc0a1
* **deps:** update dependency semantic-release to v24.2.5 b318d9e

## 3.2.3 (2025-05-23)

### Bug Fixes

* **deps:** update dependency semantic-release to v24.2.4 e994803

## 3.2.2 (2025-05-14)

### Bug Fixes

* **@forsakringskassan/semantic-release-monorepo-config:** add examples package (refs SFKUI-6500) fccb752

## 3.2.1 (2025-05-02)

### Bug Fixes

* **deps:** update dependency @semantic-release/github to v11.0.2 e6151ba

## 3.2.0 (2025-03-14)

### Features

* **@forsakringskassan/semantic-release-monorepo-config:** allow version bump in `publiccode.yml` bc21ff9

## 3.1.1 (2025-02-21)

### Bug Fixes

* **deps:** update dependency semantic-release to v24.2.3 e8a89a4
* **deps:** update dependency semantic-release-lerna to v2.11.1 c8962bb

## 3.1.0 (2025-02-14)

### Features

* **deps:** update dependency @semantic-release/github to v11 d74cf6c

### Bug Fixes

* **deps:** update dependency semantic-release to v24.2.2 8f07212
* **deps:** update dependency semantic-release-lerna to v2.11.0 a9bce94

## 3.0.4 (2025-01-24)

### Bug Fixes

* **deps:** update dependency @semantic-release/github to v10.3.5 c54eb76

## 3.0.3 (2025-01-10)

### Bug Fixes

* **deps:** update dependency @semantic-release/commit-analyzer to v13.0.1 f5a90d6
* **deps:** update dependency @semantic-release/release-notes-generator to v14.0.3 7fcca9c
* **deps:** update dependency semantic-release to v24.2.1 fae2af8

## 3.0.2 (2024-12-27)

### Bug Fixes

* **deps:** update dependency @semantic-release/release-notes-generator to v14.0.2 495b40f
* **deps:** update dependency semantic-release-lerna to v2.10.0 dfc784e

## 3.0.1 (2024-12-16)

### Bug Fixes

* **@forsakringskassan/semantic-release-common:** explicitly mark main branches as not prerelease b161982

## 3.0.0 (2024-12-09)

### ⚠ BREAKING CHANGES

* **deps:** Lerna v5 or later is now required.
* Obsolete
`@forsakringskassan/semantic-release-script-portlet-config` has been removed. It can
be replaced with `@forsakringskassan/semantic-release-config`.
* Obsolete
`@forsakringskassan/semantic-release-sitevision-config` has been removed. It can
be replaced with `@forsakringskassan/semantic-release-config`.

### Features

* **@forsakringskassan/semantic-release-config, @forsakringskassan/semantic-release-monorepo-config:** create github releases when running on github 5e4b8fb
* **deps:** require lerna v5 or later e4dbfad
* **deps:** require nodejs v20 or later 55e11cc
* **deps:** support lerna v7 and v8 da15218
* **deps:** update semantic-release to v24 fcb3ef8
* remove obsolete `semantic-release-script-portlet-config` d0ceb74
* remove obsolete `semantic-release-sitevision-config` ca9c346

### Bug Fixes

* **deps:** update dependency semantic-release to v24.2.0 ([#17](undefined/Forsakringskassan/semantic-release-config/issues/17)) f9631e2
* **deps:** update dependency semantic-release-lerna to v2.9.0 ([#8](undefined/Forsakringskassan/semantic-release-config/issues/8)) 70a9311

## 2.5.0 (2024-06-28)


### Features

* **deps:** support libnpmversion v6 b8bf939

## 2.4.2 (2024-06-20)


### Bug Fixes

* **@forsakringskassan/semantic-release-monorepo-config:** allow potential preview package to receive version bump 921acb3

## 2.4.1 (2024-04-19)


### Bug Fixes

* **@forsakringskassan/semantic-release-monorepo-config:** allow potential docs package to receive version bump ead98f1

## 2.4.0 (2024-02-27)


### Features

* **@forsakringskassan/semantic-release-bin, @forsakringskassan/semantic-release-common, @forsakringskassan/semantic-release-config, @forsakringskassan/semantic-release-monorepo-config, @forsakringskassan/semantic-release-script-portlet-config, @forsakringskassan/semantic-release-sitevision-config:** initial public version 7b0debf
