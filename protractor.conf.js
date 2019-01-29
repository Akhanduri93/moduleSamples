// Protractor configuration file, see link for more information
// https://github.com/angular/protractor/blob/master/lib/config.ts

const { SpecReporter } = require('jasmine-spec-reporter');
const fs = require('fs');
// const inspector = require('inspector');
exports.config = {
  allScriptsTimeout: 11000,
  local: true,
  specs: [
    './e2e/welcomePage.e2e-spec.ts',
   //'./e2e/LoginTestSuite/*.e2e-spec.ts',
    //'./e2e/**/*.e2e-spec.ts'
  ],
  multiCapabilities: [{
     'browserName': 'chrome'
   },
  , {
     'browserName': 'firefox'
  }],
  capabilities: {
    'browserName': 'internet explorer'
  },
  directConnect: true,
  baseUrl: 'http://localhost:4200/',
  framework: 'jasmine',
  jasmineNodeOpts: {
    showColors: true,
    defaultTimeoutInterval: 30000,
    print: function () { }
  },
  onPrepare() {
    require('ts-node').register({
      project: 'e2e/tsconfig.e2e.json'
    });
    jasmine.getEnv().addReporter(new SpecReporter({ spec: { displayStacktrace: true } }));
    jasmine.getEnv().addReporter({
      specDone: function (result) {
        if (result.failedExpectations.length > 0) {
          browser.takeScreenshot().then(function (png) {
            var stream = new fs.createWriteStream('./e2e/screenshots/' + result.description + "-" + new Date().toDateString() + '.png');
            stream.write(new Buffer(png, 'base64'));
            stream.end();
          });
        }
      }
    });
  }
};
