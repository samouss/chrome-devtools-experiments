module.exports = {
  moduleDirectories: [
    'src',
    'node_modules',
  ],
  moduleNameMapper: {
    '\\.css$': 'identity-obj-proxy',
  },
  setupFiles: [
    './jest.polyfills.js',
    './jest.setup.js',
  ],
  snapshotSerializers: [
    'enzyme-to-json/serializer',
  ],
};
