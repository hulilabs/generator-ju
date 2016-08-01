var _s = require('underscore.string'),
    generators = require('yeoman-generator'),
    log = require('../../common/logger');

// TODO: duplicated methods on component generator

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

var _ensureExtension = function(filename, extension) {
    var processedFilename = _s.trim(filename);

    if (!_s.endsWith(processedFilename, extension)) {
        processedFilename += extension;
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
                name : 'filename',
                message : 'What\'s the name of the file?',
                default : 'README.md'
            },
            {
                type : 'input',
                name : 'path',
                message : 'Where do you want to create the readme? (relative path to this location)'
            },
            {
                type : 'checkbox',
                message : 'Select the sections you want to add',
                name : 'sections',
                choices : [
                    {
                        name : 'Getting started/Installation/Requirements',
                        checked : true,
                        value : 'addGettingStarted'
                    },
                    {
                        name : 'Modules',
                        value : 'addModules'
                    },
                    {
                        name : 'API reference/How to use',
                        checked : true,
                        value : 'addApiReference'
                    },
                    {
                        name : 'Troubleshooting',
                        value : 'addTroubleshooting'
                    },
                    {
                        name : 'FAQ',
                        value : 'addFaq'
                    },
                    {
                        name : 'References',
                        checked : true,
                        value : 'addReferences'
                    },
                    {
                        name : 'License',
                        value : 'addLicense'
                    }
                ]
            }
            ], function(answers) {
                this.moduleName = answers.name;

                // removes unwanted characters to make sure provided path can be used
                var cleanComponentPath = _cleanComponentPath(answers.path);
                this.modulePath = this.destinationPath(cleanComponentPath + _ensureExtension(answers.filename, '.md'));

                // adds only the required sections
                this.addGettingStarted = (answers.sections.indexOf('addGettingStarted') > -1);
                this.addModules = (answers.sections.indexOf('addModules') > -1);
                this.addApiReference = (answers.sections.indexOf('addApiReference') > -1);
                this.addTroubleshooting = (answers.sections.indexOf('addTroubleshooting') > -1);
                this.addFaq = (answers.sections.indexOf('addFaq') > -1);
                this.addReferences = (answers.sections.indexOf('addReferences') > -1);
                this.addLicense = (answers.sections.indexOf('addLicense') > -1);

              done();
            }.bind(this));
        }
    },

    writing : {
        module : function() {
            // copies the module into this.modulePath/this.moduleName
            log('creating README at ' + this.modulePath);
            this.fs.copyTpl(
                this.templatePath('readme.md'),
                this.modulePath,
                {
                    name : this.moduleName,
                    addGettingStarted : this.addGettingStarted,
                    addModules : this.addModules,
                    addApiReference : this.addApiReference,
                    addTroubleshooting : this.addTroubleshooting,
                    addFaq : this.addFaq,
                    addReferences : this.addReferences,
                    addLicense : this.addLicense
                }
            );
        }
    }
});
