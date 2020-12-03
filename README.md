## Introduction

[X-Choice](https://xchoice.vercel.app) is a survey platform which can allow users to publish surveys quickly.

This package is the main package with  project high-level details. For the bankend API design and DB design, please visit [xchoice-server](https://github.com/kevinwchn/xchoice-server).

## Product highlights
As a survey publisher you can:
1. Sign-up / login with email password or Google.
2. Publish surveys with multiple questions, each can have multiple choices. (At this point we only support single choice questions)
3. Generate a QR code and link to help delivery the survey. (Note, the QR code will not work inside wechat as wechat blocked vercel.app domain. Please use other QR code scanners such as built-in camera).
4. Manage survey by changing it's status between published and unpublished. Unpublished survey will not be visible to other users.
5. Delete a survey. Deleted survey will not be visible to publisher too.
6. View survey reports which shoulds number of responses and distributions on each question.

As a survey taker you can:
1. Open up a survey using link or QR code without login.
2. Take the survey.
3. Generate a QR code and link to help comming back to see the selection.
4. Retake the survey.

## Tech stack

- React.js
- Next.js
- TypeScript
- Ant Design
- Jest & Enzyme
- Prettier
- Eslint
- Auth0

## Page Routes

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

## Future works / backlogs
1. Allow publisher to save survey as draft when creating.
2. Allow publisher to change / delete questions when it is unpublished.
3. Allow publisher to deliver survey through emails.
4. Allow taker to update the selction instead of creating new each time.
5. Add a explore page for takers to take any random survey.
6. Add points / credit system. The more survey a user worked on, the more credits he/she can get which can be converted to gift cards / promo codes. Participant can earn more credits if participate early (ex. first 100). Survey publisher can offer more points to the participants if needed to get more responses or higher quality responses
7. Add the time window for the survey to be valid. Survey can expire / close automatically after the time window.
8. Support multi-choice questions, support answer with just a text box for user to input
9. Support pre-defined answer templates. Ex. 1-5 scale, Yes / No
10. Pagination of a survey with too many questions.
11. Smart jump to skip irrelevant questions. There can be cases where if you answer no for question 1, jump to question 5.
12. Support making some questions optional.

## Appendix

### References

#### Jest + Enzyme

Jest comes for free when using `create-react-app`, but with Next.js, we need to set up manually. It became extremely frastrated when want TypeScript support at the same time. Here are the resources I used to make the setup work:

- https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643
- https://jestjs.io/docs/en/configuration
- https://jestjs.io/docs/en/webpack#handling-static-assets
- https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
- https://basarat.gitbook.io/typescript/intro-1/jest
