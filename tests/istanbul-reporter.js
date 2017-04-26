const istanbulAPI = require('istanbul-api');
const libCoverage = require('istanbul-lib-coverage');
var path = require('path');
var fs = require('fs');

function Istanbul(runner) {
  runner.on('end', () => {
    console.log('[runner end] outputing to reporter...');
    const mainReporter = istanbulAPI.createReporter();
    const coverageMap = libCoverage.createCoverageMap();

    coverageMap.merge(global.__coverage__ || {});
    // coverageMap.merge(window.__coverage__ || {});
    fs.writeFileSync(path.resolve(process.cwd(), 'coverage/coverage.json'), JSON.stringify(global.__coverage__));

    mainReporter.addAll(['text', 'html']);
    mainReporter.write(coverageMap, {});
  });
}


module.exports = Istanbul;
