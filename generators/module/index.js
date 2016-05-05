var _s = require('underscore.string'),
    generators = require('yeoman-generator'),
    log = require('../../common/logger');

/**
 * 1.Trims the `componentPath` string
 * 2.Removes leading /
 * 3.Adds / to the end (if not provided)
 * @param  {String} componentPath processed string
 * @return {String}
 */
var _cleanComponentPath = function(componentPath) {
    // empty string, does nothing
    if (componentPath.length === 0) {
        return componentPath;
    }

    var cleanComponentPath = _s.trim(componentPath);
    // prevents leading /
    if (_s.startsWith(cleanComponentPath, '/')) {
        cleanComponentPath = cleanComponentPath.substring(1);
    }

    if (!_s.endsWith(cleanComponentPath, '/')) {
        cleanComponentPath += '/';
    }

    return cleanComponentPath;
};

var _ensureJsExtension = function(filename) {
    var processedFilename = _s.trim(filename);

    if (!_s.endsWith(processedFilename, '.js')) {
        processedFilename += '.js';
    }

    return processedFilename;
};

module.exports = generators.Base.extend({

    constructor : function() {
        generators.Base.apply(this, arguments);

        this.moduleName = null;
        this.modulePath = null;
        this.moduleType = null;
    },

    prompting : {
        moduleName : function() {
            var done = this.async();
            this.prompt([
            {
                type : 'list',
                name : 'moduleType',
                message : 'What kind of module do you want to create?',
                choices : ['module', 'class', 'observable-class'],
                default : 1
            },
            {
                type : 'input',
                name : 'name',
                message : 'What\'s the name of the module object?',
                default : 'ClassyModuleName'
            },
            {
                type : 'input',
                name : 'filename',
                message : 'How should we name the file that contains the module?',
                default : 'classy-module.js'
            },
            {
                type : 'input',
                name : 'path',
                message : 'Where do you want to create the module? (relative path to this location)'
            }
            ], function(answers) {
                this.moduleType = answers.moduleType;
                this.moduleName = answers.name;

                // removes unwanted characters to make sure provided path can be used
                var cleanComponentPath = _cleanComponentPath(answers.path);
                this.modulePath = this.destinationPath(cleanComponentPath + _ensureJsExtension(answers.filename));

              done();
            }.bind(this));
        }
    },

    writing : {
        module : function() {
            // copies the module into this.modulePath/this.moduleName
            log('creating ' + this.moduleType + ' at ' + this.modulePath);
            this.fs.copyTpl(
                this.templatePath(this.moduleType + '.js'),
                this.modulePath,
                { name : this.moduleName }
            );
        }
    }
});
