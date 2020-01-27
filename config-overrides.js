const path = require('path');

function addModuleToMainRule(config, moduleName) {
  addPathToMainRule(config, path.resolve('node_modules/' + moduleName));
}

function addPathToMainRule(config, modulePath) {
  let include = config.module.rules[2].oneOf[1].include;
  if (Array.isArray(include)) {
    include.push(modulePath);
  } else {
    include = [include, modulePath];
  }
  config.module.rules[2].oneOf[1].include = include;
}

module.exports = function override(config, env) {
  // config.entry[0] = path.resolve('src/index.web.js')

  addModuleToMainRule(config, '@react-navigation');
  addModuleToMainRule(config, 'react-native-gesture-handler');
  addModuleToMainRule(config, 'react-native-screens');
  addModuleToMainRule(config, '@react-native-community/async-storage');
  addModuleToMainRule(config, 'react-native-vector-icons');
  addModuleToMainRule(config, 'react-native-modal');
  addModuleToMainRule(config, 'react-native-animatable');

  for (const plugin of config.plugins) {
    if (plugin.constructor.name === 'DefinePlugin') {
      let defs = plugin.definitions;
      defs.__DEV__ = env === 'development';
      plugin.definitions = defs;
    }
  }
  return config;
};
