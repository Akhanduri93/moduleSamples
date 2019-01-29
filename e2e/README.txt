Hello.

To run the e2e tests I will leave here a few steps. Since Ngserve is still not working properly this is what you need to do.

WARNING : Since the test use the description to create the screenshots do not use special characters on the titles such as : /,@.

Setup Local Machine:
    1 - npm -g install protractor
    2 - webdriver-manager update

Locally:
    1 - Go to file protractor.conf.js and make sure the base url is https://localhost:4200.
    2 - Go to runnerConfig.json and change runningLocal to true.
    3-  Execute in the command line 'ng e2e'
    4 - THE TEST ARE RUNNING!


To a different URL, not localhost:
    1 - Go to runnerConfig.json and change runningLocal to false. And change the URL to the one you want.
    2 - protractor .\protractor.conf.js
    3 - THE TEST ARE RUNNING!


Debugging:
    1 - const inspector = require('inspector'); on the protractor.config.js and the file you want to use the debugger.
    2 - write 'debugger' where you want to stop the test.
    3 - Execute the following commande to debug: node --inspect-brk .\node_modules\protractor\bin\protractor .\protractor.conf.js
    4 - Open browser on : chrome://inspect/#devices and press inspect.
    5 - F8 to go to the breakpoing/debugger

Reminder:
    1 - The tests when ran localy and on an URL have different behaviours. So test locally first.
    2 - There might be issues running in Pre-prod. Such has user stays loggedIn because the session is saved.
