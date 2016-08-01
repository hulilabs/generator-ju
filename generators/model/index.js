var _s = require('underscore.string'),
    generators = require('yeoman-generator'),
    log = require('../../common/logger');

// TODO: duplicated methods on module generator

/**
 * 1.Trims the `componentPath` string
 * 2.Removes leading /
 * 3.Adds / to the end (if not provided)
 * @param  {String} componentPath processed string
 * @return {String}               [description]
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
    },

    prompting : {
        moduleName : function() {
            var done = this.async();
            this.prompt([
            {
                type : 'input',
                name : 'name',
                message : 'What\'s the name of the model?',
                default : 'AModelModel'
            },
            {
                type : 'input',
                name : 'filename',
                message : 'How should we name the file that contains the model?',
                default : 'model.js'
            },
            {
                type : 'input',
                name : 'path',
                message : 'Where do you want to create the model? (relative path to this location)'
            },
            {
                type : 'checkbox',
                message : 'Select the data providers you want to add',
                name : 'adapters',
                choices : [
                    {
                        name : 'AJAX for HTTP requests',
                        value : 'ajax'
                    },
                    {
                        name : 'WebStorage for storing simple data objects in the browser',
                        value : 'webstorage'
                    }
                ]
            }
            ], function(answers) {
                this.moduleName = answers.name;

                // removes unwanted characters to make sure provided path can be used
                var cleanComponentPath = _cleanComponentPath(answers.path);
                this.modulePath = this.destinationPath(cleanComponentPath + _ensureJsExtension(answers.filename));

                this.needsAjax = (answers.adapters.indexOf('ajax') > -1);
                this.needsWebStorage = (answers.adapters.indexOf('webstorage') > -1);
              done();
            }.bind(this));
        }
    },

    writing : {
        module : function() {
            // creates the new module at the defined location
            log('creating model at ' + this.modulePath);
            this.fs.copyTpl(
                this.templatePath('model.js'),
                this.modulePath,
                { name : this.moduleName, needsAjax : this.needsAjax, needsWebStorage : this.needsWebStorage }
            );
        }
    }
});
