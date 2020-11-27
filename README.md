## Introduction

X-Choice is a survey platform which can allow users to publish surveys quickly.

## Tech stack

### Front-end

- React.js
- Next.js
- TypeScript
- Ant Design
- Jest & Enzyme

### Back-end

- Java
- Spring & SpringBoot
- JUnit 5
- Mockito
- MySQL

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

## Appendix

### References

#### Jest + Enzyme

Jest comes for free when using `create-react-app`, but with Next.js, we need to set up manually. It became extremely frastrated when want TypeScript support at the same time. Here are the resources I used to make the setup work:

- https://medium.com/@kjaer/setting-up-jest-and-enzyme-for-typescript-next-js-apps-ce383167643
- https://jestjs.io/docs/en/configuration
- https://jestjs.io/docs/en/webpack#handling-static-assets
- https://medium.com/codeclan/testing-react-with-jest-and-enzyme-20505fec4675
- https://basarat.gitbook.io/typescript/intro-1/jest
