var generators = require('yeoman-generator'),
    log = require('../logger');

module.exports = generators.Base.extend({

    constructor : function () {
        generators.Base.apply(this, arguments);
    },

    prompting : {
        appName : function() {
            var done = this.async();
            this.prompt({
              type : 'input',
              name : 'name',
              message : 'What\'s your app name?',
              default : 'ju-app'
            }, function(answers) {
                this.appname = answers.name;
              done();
            }.bind(this));
        }
    },

    writing : {
        app : function() {
            // copies the main app skeleton into a folder named this.appname
            log('copying app skeleton into ' + this.destinationPath(this.appname));
            this.directory('base-skeleton', this.appname);

            // sets destination root to the provided app name
            // @notice from now on, the destination root points to a folder named as stated in this.appname
            // @see prompting.appName
            this.destinationRoot(this.appname);
        }
    },

    install : {
        ju : function() {
            log('installing bower dependencies');
            log('reading bower file from ' + this.destinationPath('resource/'));
            this.bowerInstall(null, {cwd : this.destinationPath('resource/')});
        }
    },

    end : {
        nextSteps : function() {
            this.log();
            this.log();
            log('DONE');
            log('you may want to take a look into:');
            log('generated component: ' + this.destinationPath('public/js/app/modules/landing/component.js'));
            log('available routes: ' + this.destinationPath('public/js/app/routes.js'));
            log('app boostrap: ' + this.destinationPath('public/js/app/bootstrap.js'));
        }
    }
});
