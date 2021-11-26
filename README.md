<div align="center">
  <h1>Staffing App</h1>
  <strong>A tool to view and manage current and future resourcing needs.</strong>
</div>

## Staffing App

---

A tool to view and manage current and future resourcing needs.

> Mission
> To have more accurate and responsive staffing decisions.

## 🔗 Quick Links

- [Deployed site (also in about)](https://bitovi.github.io/app-staffing/)

- [Storybook](https://bitovi.github.io/app-staffing/storybook/)
- [Project WIKI](https://github.com/bitovi/app-staffing/wiki)
- [Project Board](https://github.com/bitovi/app-staffing/projects)
- [Definition of done](https://github.com/bitovi/app-staffing/wiki/Definition-of-Done)

## 🏗 Build Status

---

_TBD: Project build status if any_

## 🗂 Tech Stack & Project Dependencies

Tech Stack/Libraries

- [React](https://reactjs.org/docs/getting-started.html)
- [swr](https://swr.vercel.app/docs/getting-started)
- [StoryBook](https://storybook.js.org/docs/react/get-started/introduction)
- [Typescript](https://www.typescriptlang.org/docs/handbook/typescript-from-scratch.html)
- [ChakraUI](https://chakra-ui.com/docs/getting-started)

Dependencies

- [API](https://github.com/bitovi/app-staffing-api)

[comment]: <> (- [])

## 🔧 Project Setup

Follow these steps for setting up this project on ur local machine.

- **Running the project.**
  1.  Run `npm install` to install packages
  2.  Run `npm run dev` to start the app in the development mode.
  3.  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## 📜 Documentation

Components are documented using [storybook](https://storybook.js.org/docs/react/writing-stories/introduction).

```tsx
/**
 * task.stories.tsx
 * Documenting the different states for a Task component
 */
export default {
  component: Task,
  title: "Task",
};

const Template = (args) => <Task {...args} />;

export const Default = Template.bind({});
Default.args = {
  task: {
    id: "1",
    title: "Test Task",
    state: "TASK_INBOX",
    updatedAt: new Date(2021, 0, 1, 9, 0),
  },
};

export const Pinned = Template.bind({});
Pinned.args = {
  task: {
    ...Default.args.task,
    state: "TASK_PINNED",
  },
};
```

> Additional project documentation can be found on project [wiki](https://github.com/bitovi/app-staffing/wiki)

## 🦺 Style & Coding Guidelines

### Folder Structure

      ├── @types                      # Type declarations.
      ├── src                         # Source files
      │   ├── components              # Reusable components.
      │   ├── pages                   # Indvidual Pages accrocess the application
      │   ├── services                # Service layer
      │   ├── app.tsx                 # Main layout
      │   └── index.tsx               # Application entry point
      └── README.md

### Guidelines

- [ChakraUI Guidelines](https://bitovi.github.io/app-staffing/storybook/?path=/story/design-system--page)

## 🚀 Deployment

_TBD: Any deployment guideline._

## 🧪 Tests

The project uses [react-testing-library](https://testing-library.com/docs/react-testing-library/intro/) for test scripts.
Tests are created along with their associated component/module.

      ├── module
      │   └── module.tsx
      │   └── module.test.tsx

Run `npm run test` to run test scripts.

[comment]: <> (TBD testing guidelines)

## 🧰 Available Scripts

In the project directory, you can run:

### `npm run dev`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run storybook`

Run storybook development environment.\
Open [http://localhost:6006](http://localhost:6006/?path=/story/introduction--page) to view storybook dashboard. for viewing component.
