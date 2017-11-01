# one-config

A single source of configuration for your server and browser code.


## Installation

```bash
npm install one-config
```


## Getting Started

Import and initialize one-config. Be sure to do this as early as possible in your server.

```javascript
require('one-config').initialize();
```

Create a `one.config.js` file in your project's root directory. Optionally, add a `_server` field to store sensitive values. Values defined here will be merged into the config for server code and inaccessible to browser code.

```javascript
module.exports = {
  foo: 'bar'
  _server: {
    topSecretDatabaseKey: 'EFAC34A4',
  },
};
```

Explicitly inject the configuration into your HTML.

```javascript
import { forBrowser } from 'one-config';

const html = `
  <html>
    <body>
      ...
      ${forBrowser()}
      <!-- Other bundles that depend on configuration -->
    </body>
  </html>
`;
```

That's it! You can now import and access configuration from anywhere in your application.

```javascript
import { config } from 'one-config'
```


## API

### `extend(values: Object, dangerouslyApplyUpdates: Boolean = false)`

Values are merged with the original config object. Like the original config object, `values` can contain an optional `_server` property.

**NOTE**: By default, this method will not apply updates once `forBrowser` has been called. This behavior helps to ensure that values do not get out of sync between the browser and server, however, you can use the `dangerouslyApplyUpdates` argument to override this behavior.


### `forBrowser()`

Returns a script tag to be injected into an HTML page. This script tag will assign a config object to the `window`
so that values can be accessed in the browser.


### `freeze()`

Prevents any updates from being applied via `extend` or `set`.


### `get(key: String)`

Gets the value at the specified `key`.


### `initialize()`

Initializes the config object for both server and browser environments.

**NOTE**: This method should be called in your server's entry point as soon as possible.


### `set(key: String, value: <any>)`

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
  <summary>Is it safe to store sensitive values in the `_server` property of my config file?</summary>

  Yes! Any values defined in the `_server` field are excluded when you use from the config returned by `forBrowser`. Furthermore, `_server` values will not get bundled into your client-side code if you import `one-config`, because config is required dynamically on the server.
</details>

<details>
  <summary>Why is the configuration object `undefined` when I import it?</summary>

  Remember, you must import and configure one-config as early as possible in your server's entry file. Otherwise, you may be accessing one-config before it has been properly initialized.
</details>
