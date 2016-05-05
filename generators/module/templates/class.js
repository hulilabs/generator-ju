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
 * @requires ju-shared/class
 * @requires ju-shared/logger
 * @extends ju-shared/class
 */
define([
        'ju-shared/logger',
        'ju-shared/class'
    ],
    function(
        Logger,
        Class
    ) {

    'use strict';

    var <%= name %> = Class.extend({
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
