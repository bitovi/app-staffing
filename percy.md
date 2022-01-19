# Visual Regression Testing with Percy 

## Percy Snapshot

Loads and tests pages using a yaml config file
Can interact with page elements (e.g. input text and submit form)

### Install

```bash
npm install --save-dev @percy/cli
```

### Configure

Create a `snapshots.yml` file

```yml
- name: Home
   url: http://localhost:3000
- name: Team Members
   url: http://localhost:3000/team-members
```

Get your token from the Percy website and add it to the following command

```bash
export PERCY_TOKEN={your-token}
```

Add the following `package.json` scripts

```json
"percy:snapshot": "percy snapshot snapshots.yml"
```

### Run

Start your dev server before running the tests. Ideally, you are using a tool like [Mock Service Worker](https://www.npmjs.com/package/msw) for api mocking to provide consistent test data. If your displayed data changes in every test run, Percy will flag a lot of false positives.

```bash
npm run percy:snapshot
```

---

## Percy Storybook


### Install

```bash
npm install --save-dev @percy/cli @percy/storybook
```

### Configure

Get your token from the Percy website and add it to the following command

```bash
export PERCY_TOKEN={your-token}
```

Add the following `package.json` scripts

```json
"percy:storybook": "percy storybook:start --port=9009 --static-dir=./public"
```

### Run

Running the Storybook integration will startup storybook and create snapshots of all stories in your project.

```bash
npm run percy:storybook
```

### Advanced Config

In the story for each individual component, a `percy` parameter can be set. Some options include skipping the story or creating additional snapshot versions with different parameters set. https://docs.percy.io/docs/storybook

```js
SomeComponent.parameters = {
  percy: {
    additionalSnapshots: [
      { prefix: '[Dark mode] ', args: { colorScheme: 'dark' } },
      { suffix: ' with a search', queryParams: { search: 'foobar' } }
    ]
  }
};
```

---

## Optional for testing in multiple techniques for one repo

If you send two different types of test results using the same token, Percy will get very confused. 

To have multiple test types, for example your pages with snapshots and your components with the Storybook integration, you will need to setup a project for each. You will then be able to get a unique token for each test type. You will need to set the proper token before each. These tokens can be stored in your CI system and injected as needed.

```bash
export PERCY_TOKEN={your-snapshot-token}
npm run percy:snapshot
export PERCY_TOKEN={your-storybook-token}
npm run percy:storybook
```

---

## Percy Advanced

If you outgrow the capabilities of snapshot or Storybook testing, you can move on to integrations with browser automation tools including Puppeteer or Playwright.

### Install

```bash
npm install --save-dev @percy/cli @percy/playwright
```

### Test

With your chosen browser automation tool, in this case PLaywright, load and interact with the page as desired. You can then pass the page over to the Percy integration to send your test snapshot. `percySnapshot(page, 'Example Site')`

```js
const { chromium } = require('playwright');
const percySnapshot = require('@percy/playwright');

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage();
  await page.goto('http://example.com/', { waitUntil: 'networkidle2' });
  await percySnapshot(page, 'Example Site');

  await browser.close();
})();
```
