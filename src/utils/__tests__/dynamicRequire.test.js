const path = require('path');
const dynamicRequire = require('../dynamicRequire');

describe('utils/dynamic-require', () => {
  test('it returns null for an invalid module', () => {
    const foo = dynamicRequire('foo');
    expect(foo).toBe(null);
  });

  test('it returns fs when required', () => {
    const fs = dynamicRequire('fs');
    expect(fs).toBe(require.requireActual('fs'));
  });

  test('it returns a local module when required', () => {
    const constants = dynamicRequire(path.resolve(__dirname, '../constants'));
    expect(constants).toBe(require.requireActual('../constants'));
  });

  test('it escapes incorrectly formatted paths', () => {
    const resolvedPath = path.resolve(__dirname, '../constants');
    const badPath = resolvedPath.replace(/\//g, '\\');
    const constants = dynamicRequire(badPath);
    expect(constants).toBe(require.requireActual('../constants'));
  });
});
