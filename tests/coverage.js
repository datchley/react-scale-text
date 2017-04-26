import Module from 'module';

const originalRequire = Module.prototype.require;

Module.prototype.require = function fancyCoverageRequireHack(moduleName, ...args) {
  try {
    if (/src\//.test(moduleName)) {
      console.log('[replacing] coverage file:', moduleName.replace('src/','cov/'));
    }
    return originalRequire.call(this, moduleName.replace('src/', 'cov/'), ...args);
  }
  catch (e) {
    return originalRequire.call(this, moduleName, ...args);
  }
};
