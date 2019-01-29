const {
  exec
} = require('child_process');

const locale = process.env.LOCALE;
const environment = process.env.ENVIRONMENT;
var buildCommand;

if (locale && environment) {
  buildCommand = 'ng build -c=' + environment + '-' + locale;
}

if (buildCommand) {

  console.log(buildCommand);

  exec(buildCommand, {
    maxBuffer: 1024 * 500
  }, (err, stdout, stderr) => {
    if (err) {
      // node couldn't execute the command
      console.log(`error: ${err}`);
      return;
    }

    // the *entire* stdout and stderr (buffered)
    console.log(`stdout: ${stdout}`);
    console.log(`stderr: ${stderr}`);
  });
}
