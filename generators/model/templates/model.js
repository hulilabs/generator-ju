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
 */
define([
        'ju-shared/logger',
        'ju-model/model'<% if (needsAjax) { %>,
        'ju-model/adapter/ajax/provider'<% } %><% if (needsWebStorage) { %>,
        'ju-model/adapter/web-storage/provider'<% } %>
    ],
    function(
        Logger,
        model<% if (needsAjax) { %>,
        AjaxProvider<% } %><% if (needsWebStorage) { %>,
        WebStorageProvider<% } %>
    ) {

    'use strict';

    var MODEL_NAME = '<%= name %>',
        MODEL_VERSION = 1;<% if (needsAjax) { %>

    var AJAX_FETCH_ENDPOINT = 'REPLACE/WITH/ENDPOINT',
        AJAX_SAVE_ENDPOINT = 'REPLACE/WITH/ENDPOINT';

    var ajaxProvider = new AjaxProvider({
        fetch : {
            endpoint : AJAX_FETCH_ENDPOINT
            // you can also define a callback to obtain the endpoint
            // will receive the endpoint string above and the data to save
            // getEndpoint : function() {}
        },
        save : {
            endpoint : AJAX_SAVE_ENDPOINT
            // you can also define a callback to obtain the endpoint
            // will receive the endpoint string above and the data to save
            // getEndpoint : function() {}
        }
    });<% } %><% if (needsWebStorage) { %>

    var STORAGE_KEY = 'REPLACE_WITH_COMMON_KEY_FOR_WEB_STORAGE',
        STORAGE_VERSION = 1; // REPLACE WITH COMMON VERSION FOR WEB STORAGE

    var webStorageProvider = new WebStorageProvider({
        // this model's name
        name : MODEL_NAME,
        // this modeĺ's version
        version : MODEL_VERSION,
        // storage metadata
        // where to store all the model keys
        storageKey : STORAGE_KEY,
        storageVersion : STORAGE_VERSION
    });<% } %>

    // obtains base model definition
    // it uses the model name and the schema to generate a model
    var <%= name %> = model(MODEL_NAME, {idField : 'REPLACE_WITH_ID_FIELD'});<% if (needsAjax) { %>

    // adds ajax handler for fetch
    model(<%= name %>).at(model.API.FETCH).use(ajaxProvider.fetch.bind(ajaxProvider));
    // adds ajax handler for save
    model(<%= name %>).at(model.API.SAVE).use(ajaxProvider.save.bind(ajaxProvider));<% } %>

    return <%= name %>;
});
