## Introduction

[X-Choice](https://xchoice.vercel.app) is a survey platform which can allow users to publish surveys quickly.

This package is the main package with  project high-level details. For the bankend API design and DB design, please visit [xchoice-server](https://github.com/kevinwchn/xchoice-server).

## Tech stack

- React.js
- Next.js
- TypeScript
- Ant Design
- Jest & Enzyme
- Prettier
- Eslint
- Auth0

## Prod deployment

This website is hosted on [Vercel](http://vercel.com/), which is a platform made for Next.js. The public URL for this website is https://xchoice.vercel.app.

Vercel tracks this github repo and deploys automatically when there are updates on main branch.

## Local development

### Set up dev server

First, run the development server:

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Run unit tests

This package is using [Jest](https://jestjs.io/en/) and [Enzyme](https://enzymejs.github.io/enzyme/) for unit tests. It addes TypeScript support by using [ts-jest](https://kulshekhar.github.io/ts-jest/). For running all tests:

```bash
yarn test
```

For all of the components, we have the test to compare the current version with the snapshot (which was generated from the initial run). In case some components are updated and snapshots are expected to change, run:

```bash
yarn test -u
```

## Routes

For priority, 
- P0 - essential product feature. 
- P1 - important, but the product can work without these. 
- P2 - nice to have

| Route | Description | Priority |
| ------------- | ------------- | ----- |
| `/`  | Home page  | P0 |
| `/survey/create`  | Create survey page  | P0 |
| `/survey?id={id}`  | View survey page. Users can take the suvey at this page too.  | P0 |
| `/survey/response?slug={slug}`  | View survey page. Users can take the suvey at this page too. This page is for users to check the response after taking the survey.  | P0 |
| `/dashboard`  | Dashbord page which displays all the surveys the publisher created | P0 |
| `/dashboard/survey?id={id}`  | Page to manage a specific survey | P0 |
| `/signin`  | Sign in page | P0 |
| `/signup`  | Sign up page | P0 |
| `/profile`  | Page to manage user settings. | P1 |
| `/explorer`  | Page to explore random active surveys. User can pick a few to take. | P2 |

## Appendix

### References

#### Jest + Enzyme

Jest comes for free when using `create-react-app`, but with Next.js, we need to set up manually. It became extremely frastrated when want TypeScript support at the same time. Here are the resources I used to make the setup work:

- https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643
- https://jestjs.io/docs/en/configuration
- https://jestjs.io/docs/en/webpack#handling-static-assets
- https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
- https://basarat.gitbook.io/typescript/intro-1/jest
