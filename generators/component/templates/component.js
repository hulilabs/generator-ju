/**                   _
 *  _             _ _| |_
 * | |           | |_   _|
 * | |___  _   _ | | |_|
 * | '_  \| | | || | | |
 * | | | || |_| || | | |
 * |_| |_|\___,_||_| |_|
 *
 * (c) Huli Inc
 */

/**
 * @file <%= name %>
 * @requires ju-components/base
 * @requires ju-components/resource/lazy-load-helper<% if (needsFetch) { %>
 * @requires ju-components/data-flow/fetch/binder<% } %><% if (needsSave) { %>
 * @requires ju-components/data-flow/save/binder<% } %>
 *
 * @extends ju-components/base
 */
define([
        'ju-shared/logger',
        'ju-components/base',
        'ju-components/resource/lazy-load-helper'<% if (needsFetch) { %>,
        'ju-components/data-flow/fetch/binder'<% } %><% if (needsSave) { %>,
        'ju-components/data-flow/save/binder'<% } %>
    ],
    function(
        Logger,
        BaseComponent,
        LazyLoadHelper<% if (needsFetch) { %>,
        FetchDataBinder<% } %><% if (needsSave) { %>,
        SaveDataBinder<% } %>
    ) {

    'use strict';

    var MAIN_VIEW = 'REPLACE/THIS/WITH/VIEW/PATH';

    var RESOURCE_MAP = {
        template : [
            MAIN_VIEW
        ],
        cssFile : [
            // 'path/to/css/file'
        ]
    };

    var CHILDREN_DEFINITION = {
        /**
         * example definition
        child_component : {
            component : 'path/to/child/definition',
            insertionPoint : '.selector',
            opts : {
                // component-dependent options
            }
        */
    };

    var <%= name %> = BaseComponent.extend({
        /**
         * Constructor
         *
         * Common place for setting default options, resources, children definition,
         * selectors, variables...
         */
        init : function() {
            this.setOptions({
                // set any default options values here
            });

            this._super.apply(this, arguments);

            this.addResources(RESOURCE_MAP);

            this.setChildrenDefinition(CHILDREN_DEFINITION);
        },

        /**
         * Commonly used to setup the component's markup
         */
        configureComponent : function() {
            // obtains loaded view
            var mainView = LazyLoadHelper.getTemplate(MAIN_VIEW);
            // appends markup to view
            this.appendToView(mainView);
        }<% if (needsSave) { %>,

        setup : function() {

            // to add save behavior to your component:
            // 1. complete the following initialization method
            this.saveDataBehavior = new SaveDataBinder({
                component : this,

                // function to call to save data, like an HTTP proxy method that performs a post
                // saveProxyCallback : // TODO: implement,

                // callback to handle success
                // onComponentSaveSuccess : // TODO: implement,

                // callback to handle error
                // onComponentSaveError : // TODO: implement
            });

            // 2. Provide an object (like a UI element) that triggers save events (see data-flow/events.js, UI events)
            this.saveDataBehavior.setup().linkSaveChangesComponent({
                // saveChangesComponent : // TODO: implement,
            });

            this._super.apply(this, arguments);
        }<% } %><% if (needsFetch) { %>,

        setupCompleted : function() {
            var fetchDataBehavior = new FetchDataBinder({
                component : this,
                // here you need to add the function that will perform the actual fetch
                // you may add a callback of a HTTP proxy or any data provider that you want to implement
                fetchCallback : this._fetchData.bind(this)
            });

            // if you need parameters to be passed to the fetch callback, add them here
            var fetchParameters = {};
            fetchDataBehavior.fetchData(fetchParameters)
            .then(fetchDataBehavior.setData.bind(fetchDataBehavior));
        },

        /**
         * This function performs a dummy data fetch, and you may or may not want to implement
         * the actual function here, as the desired behavior is to obtain data from somewhere
         *
         * My advice is that you take this method as an example and implement it in a helper,
         * like an HTTP proxy, if required
         *
         * @param  {Object}   data            the data you provide each time you call `fetchDataBehavior.fetchData`
         * @param  {Function} successCallback callback to pass the data to
         * @param  {Function} errorCallback   callback to pass any errors that need to be handled
         */
        _fetchData : function(data, successCallback, errorCallback) {
            successCallback({dummyData : 'this is dummy data, so you can see that everything\'s working'});
        },

        setData : function(data) {
            this._super.call(this, data);
            Logger.info('<%= name %> this is the fetched dummy data: ', data);
        }<% } %>
    });

    <%= name %>.classMembers({
        // add 'static' class members here
        // i.e. can be accessed from the class definition without an instance
    });

    return <%= name %>;
});
