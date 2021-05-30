# MediaWiki ShortURL Builder

This tool is used to automatically build a MediaWiki [Short URL](https://www.mediawiki.org/wiki/Manual:Short_URL) configuration for any public MediaWiki installation just by scanning the publicly available configuration.

It was originally developed by Daniel at [Redwerks](https://redwerks.org/) in Ruby. This is a React/JavaScript port of the original project.

This project is a [Create React App](https://github.com/facebook/create-react-app) <abbr title="Single Page Application">SPA</abbr> and uses Vercel style serverless api functions to implement the server based wiki analysis code.

## Available Scripts

In the project directory, you can run:

### `npm start`

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
