/*
 * Global setup/hooks for mocha
 */

after(function() {
  if (window.__coverage__) {
    console.log('Found coverage report, writing to coverage/coverage.json');
    var path = require('path');
    var fs = require('fs');
    var coverageDir = path.resolve(process.cwd(), 'coverage');
    if (!fs.existsSync(coverageDir)) {
      fs.mkdirSync(coverageDir);
    }
    fs.writeFileSync(path.resolve(coverageDir, 'coverage.json'), JSON.stringify(window.__coverage__));
  }
});
