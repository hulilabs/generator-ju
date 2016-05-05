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
 * @requires ju-shared/logger
 *
 * @extends ju-shared/class
 */
define([
        'ju-shared/logger'
    ],
    function(
        Logger
    ) {

    'use strict';

    /**
     * Constructor, prototype based class
     */
    var <%= name %> = function() {
    };

    <%= name %>.prototype = {
        // instance methods can be defined here as:
        // someFunction : function() {}
    };

    // you can define static properties like <%= name %>.property = someValue
    // it will work pretty similar to Class' `classMembers`

    return <%= name %>;
});
