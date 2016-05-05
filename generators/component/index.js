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

        this.componentName = null;
        this.componentPath = null;
    },

    prompting : {
        componentName : function() {
            var done = this.async();
            this.prompt([
            {
                type : 'input',
                name : 'name',
                message : 'What\'s the name of the component class?',
                default : 'ComponentName'
            },
            {
                type : 'input',
                name : 'filename',
                message : 'How should we name the file that contains the component?',
                default : 'component-name.js'
            },
            {
                type : 'input',
                name : 'path',
                message : 'Where do you want to create the component? (relative path to this location)'
            },
            {
                type : 'confirm',
                name : 'needsFetch',
                message : 'Does your component need to FETCH data by itself from an external source?',
                default : false
            },
            {
                type : 'confirm',
                name : 'needsSave',
                message : 'Does your component need to SAVE data to external source?',
                default : false
            }
            ], function(answers) {
                this.componentName = answers.name;

                // removes unwanted characters to make sure provided path can be used
                var cleanComponentPath = _cleanComponentPath(answers.path);
                this.componentPath = this.destinationPath(cleanComponentPath + _ensureJsExtension(answers.filename));

                this.needsFetch = answers.needsFetch;
                this.needsSave = answers.needsSave;
              done();
            }.bind(this));
        }
    },

    writing : {
        component : function() {
            // copies the main app skeleton into a folder named this.appname
            log('creating component at ' + this.componentPath);
            this.fs.copyTpl(
                this.templatePath('component.js'),
                this.componentPath,
                { name : this.componentName, needsFetch : this.needsFetch, needsSave : this.needsSave }
            );
        }
    }
});
