# one-config

A single source of configuration for your server and browser code.


## Installation

```bash
npm install one-config
```


## Getting Started

Import and initialize one-config. Be sure to do this as early as possible in your server code.

```javascript
require('one-config').initialize();
```

Create a `one.config.js` file in your project's root directory. You can also add an optional `SERVER` property to store sensitive values. These values will be merged into the config on the server, but not in the browser.

```javascript
module.exports = {
  foo: 'bar'
  SERVER: {
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

or define the config globally yourself at build time...

```javascript
// webpack.config.js

const { forBrowser } = require('one-config');
const path = require('path');
const config = forBrowser();

fs.writeFileSync(
  path.resolve(__dirname, 'build/client.json'),
  JSON.stringify({ config })
)

module.exports = {
  // ... other webpack config
  resolve: {
    alias: {
      'one-config': path.resolve(__dirname, 'build/client.json'),
    }
  }
}
```

That's it! You can now import and access configuration from anywhere in your application.

```javascript
import { config } from 'one-config'
```


## API

#### `config: Object`

The raw config object. Can be imported anywhere on server or client.

**NOTE**: Mutating this object may cause unexpected behavior.

#### `extend(values: Object, dangerously: Boolean = false)`

Values are merged with the original config object. Like the original config object, `values` can contain an optional `server` property.

**NOTE**: By default, this method will not apply updates once `forBrowser` has been called. This behavior helps to ensure that values do not get out of sync between the browser and server, however, you can use the `dangerously` argument to override this behavior.


#### `forBrowser()`

Returns the config object without the `SERVER` property. Use this function if you need to define the config globally yourself with Webpack's DefinePlugin or a Babel transform.


#### `freeze()`

Prevents any updates from being applied via `extend` or `set`.


#### `get(key: String)`

Gets the value at the specified `key`.


#### `getScript()`

Returns an initialization script tag to be injected into an HTML page.


#### `initialize()`

Initializes the config object for both server and browser environments.

**NOTE**: This method should be called in your server's entry point as soon as possible.


#### `set(key: String, value: <any>)`

Sets a `value` at the specified `key`.

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

  Yes! Any values defined in the `server` field are excluded when you use from the config returned by `forBrowser`. Furthermore, `server` values will not get bundled into your client-side code if you import `one-config`, because config is required dynamically on the server.
</details>

<details>
  <summary>Why is the configuration object `undefined` when I import it?</summary>

  Remember, you must import and configure one-config as early as possible in your server's entry file. Otherwise, you may be accessing one-config before it has been properly initialized.
</details>
