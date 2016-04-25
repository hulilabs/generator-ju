var generators = require('yeoman-generator');

module.exports = generators.Base.extend({
    
    constructor : function () {
        generators.Base.apply(this, arguments);
    },

    prompting : {
        appName : function (argument) {
            var done = this.async();
            this.prompt({
              type    : 'input',
              name    : 'name',
              message : 'What\'s your app name?',
              default : 'ju-app'
            }, function (answers) {
                this.appname = answers.name;
              done();
            }.bind(this));
        }
    },

    writing : {
        app : function () {
            // copies the main app skeleton into a folder named this.appname
            console.log('JuGenerator: copying app skeleton into ' + this.destinationPath(this.appname));
            this.directory('base-skeleton', this.appname);

            // sets destination root to the provided app name
            // @notice from now on, the destination root points to a folder named as stated in this.appname
            // @see prompting.appName
            this.destinationRoot(this.appname);
        }
    },

    install : {
        ju : function () {
            console.log('JuGenerator: installing bower dependencies');
            console.log('JuGenerator: reading bower file from ' + this.destinationPath('resource/'));
            this.bowerInstall(null, {cwd : this.destinationPath('resource/')});
        }
    }
});
