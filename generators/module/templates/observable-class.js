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
 * @requires ju-shared/observable-class
 * @requires ju-shared/logger
 * @extends ju-shared/observable-class
 */
define([
        'ju-shared/logger',
        'ju-shared/observable-class'
    ],
    function(
        Logger,
        ObservableClass
    ) {

    'use strict';

    var <%= name %> = ObservableClass.extend({
        /**
         * Constructor
         */
        init : function() {

        }
    });

    <%= name %>.classMembers({
        // add 'static' class members here
        // i.e. can be accessed from the class definition without an instance
    });

    return <%= name %>;
});
