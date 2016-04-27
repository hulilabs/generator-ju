var generators = require('yeoman-generator');

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
                this.componentPath = this.destinationPath(answers.path + answers.filename);

                this.needsFetch = answers.needsFetch;
                this.needsSave = answers.needsSave;
              done();
            }.bind(this));
        }
    },

    writing : {
        component : function() {
            // copies the main app skeleton into a folder named this.appname
            this.log('JuGenerator: creating component at ' + this.componentPath);
            this.fs.copyTpl(
                this.templatePath('component.js'),
                this.componentPath,
                { name : this.componentName, needsFetch : this.needsFetch, needsSave : this.needsSave }
            );
        }
    }
});
