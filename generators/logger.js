var colors = require('colors/safe');

module.exports = function(textToLog) {
    console.log(colors.inverse(' JuGenerator: ') + ' ' + textToLog);
};
