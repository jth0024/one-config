# one-config

One config file for your server and browser code.


## Installation

```bash
npm install one-config
```


## Getting Started

Import and initialize one-config. Be sure to do this as early as possible in your server code.

```javascript
require('one-config').initialize();
```

Create a `one.config.js` file in your project's root directory. You can optionally add a `server` property to store sensitive values. This property will not be available in the browser.

```javascript
module.exports = {
  foo: 'bar'
  server: {
    topSecretDatabaseKey: 'EFAC34A4',
  },
};
```

Explicitly inject the initialization script into your HTML.

```javascript
const { getScript } = require('one-config');

const html = `
  <html>
    <body>
      ...
      ${getScript()}
      <!-- Other bundles that depend on configuration -->
    </body>
  </html>
`;
```

That's it! You can now import and access configuration from anywhere in your application.

```javascript
const config = require('one-config').config();
```


## API

##### `config()`

* Returns a copy of the raw config object. Can be used anywhere on server or client.
* **NOTE**: Mutating this object will not affect the underlying config. Use `extend` or `set` to update the config.

##### `extend(values: Object, dangerously: Boolean = false)`

* Values are merged with the original config object. Like the original config object, `values` can contain an optional `server` property.
* **NOTE**: By default, this method will not apply updates in a browser environment or after `forBrowser` has been called. Use the `dangerously` argument to override this behavior. This method will not apply updates after `freeze` has been called.


##### `forBrowser()`

* Returns the raw config object without the `server` property. Use this function when you can't inject an initialization script into HTML and need to provide the config value globally yourself using Webpack or a Babel.


##### `forFile()`

* Returns a string representation of the `oneConfig` module to write to a file. Use this function when you can't inject an initialization script into HTML and need to provide the config globally yourself using Webpack or a Babel.  Since this module is meant to be used in the browser, it only supports the `config` and `get` methods, and the `server` property will be excluded.


##### `freeze()`

* Prevents any updates from being applied via `extend` or `set`.


##### `get(key: String)`

* Gets the value at the specified `key`.


##### `getScript()`

* Returns an initialization script tag to be injected into an HTML page.


##### `initialize(source: (String|Object) = './one.config.js')`

* Initializes the config for both server and browser environments. You can provide the optional `source` argument if you'd like to customize the file location or build an object at runtime.
* **NOTE**: This method should be called in your server's entry point as soon as possible.


##### `set(key: String, value: <any>, dangerously: Boolean = false)`

* Sets a `value` at the specified `key`. See `extend` for an explanation of `dangerously`.


## FAQ

<details>
  <summary>Why do we need another configuration manager?</summary>

  Well, I searched NPM and couldn't find a library that met the following criteria:
  1. Works on both client and server
  2. Allows values to be defined at runtime, not just build time
  3. Allows sensitive values to be excluded from client-side code
</details>

<details>
  <summary>Is it safe to store sensitive values in the `server` property of my config file?</summary>

  Yes! Any values defined in the `server` field are excluded when you use the config returned by `forBrowser`, `forFile`, or `getScript`. Furthermore, `server` values will not get bundled into your client-side code if you import `one-config`, because config is required dynamically on the server.
</details>

<details>
  <summary>I don't have control over the HTML returned from my server, can I still use one-config?</summary>

  Sure! You can simply call `forFile` and use Webpack or Babel to define the config globally yourself. Here's an example.

  ```javascript
  // webpack.config.js

  const fs = require('fs');
  const { forFile, initialize } = require('one-config');
  const path = require('path');

  // Initialize the config
  initialize();

  // Write the module to a file
  fs.writeFileSync(
    path.resolve(__dirname, './one-config.js'),
    forFile()
  )

  module.exports = {
    // ... other webpack config
    resolve: {
      alias: {
        'one-config': path.resolve(__dirname, './one-config.js'),
      }
    }
  }
  ```
</details>

<details>
  <summary>Why does `config` return an empty object?</summary>

  Remember, you must import and configure one-config as early as possible in your server's entry file. Otherwise, you may be accessing one-config before it has been properly initialized.
</details>
