# ohare-timeline

- [About](#about)
- [Dependencies](#dependencies)
- [Getting started](#getting-started)

## About

| Title       | O&#39;Hare timeline                                                                                                                  |
| ----------- | ------------------------------------------------------------------------------------------------------------------------------------ |
| Developer   | [Patrick Judge](pjudge@bettergov.org)                                                                                                |
| Link        | [https://projects.bettergov.org/2019/ohare/timeline/](https://projects.bettergov.org/2019/ohare/timeline/)                           |
| Archie doc  | [1YSdJeAVipCdkgDKyQcvhsCgSq7fyzlcXmzh09zOgA9s](https://docs.google.com/document/d/1YSdJeAVipCdkgDKyQcvhsCgSq7fyzlcXmzh09zOgA9s/edit) |
| Spreadsheet | n/a                                                                                                                                  |

© Better Government Association 2019

## Dependencies

Make sure you have the latest version of [node](https://docs.npmjs.com/getting-started/installing-node) installed on your machine as well as the [yarn](https://yarnpkg.com/en/docs/install#mac-stable) package manager.

# Getting started

1.  Clone this project and `cd` into the directory.

```bash
$ git clone https://github.com/bettergov/ohare-timeline.git && cd ohare-timeline
```

2.  Install dependencies.

```bash
$ yarn
```

3. Move `.env.example` to `.env`. Commented and emphasized (`#!`) env variables should either be filled out or readable from elsewhere, e.g. `~/.bash_profile`.

```bash
$ mv .env.example .env
```

```bash
# .env

DOCUMENT_ID="1YSdJeAVipCdkgDKyQcvhsCgSq7fyzlcXmzh09zOgA9s"

# Authorize googleapis using their default env variables
# See gulp/tasks/{archie,sheets}
#! GCLOUD_PROJECT=
#! GOOGLE_APPLICATION_CREDENTIALS=

# s3 / AWS variables
#! AWS_ACCESS_KEY_ID=
#! AWS_SECRET_ACCESS_KEY=
S3_PROD_BUCKET='projects.bettergov.org'
S3_STAGE_BUCKET='stage-projects.bettergov.org'
S3_REGION='us-east-1'
CLOUDFRONT_DISTRIBUTION_ID='E3TGYGX4OFUT9M'

```

4.  Finally, run the project.

```bash
$ yarn dev
```
