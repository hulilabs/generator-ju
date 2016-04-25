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

require([
            'jquery',
            'ju-shared/logger',
            'ju-mvc/history',
            'ju-mvc/page-manager',
            'app/routes'
        ],
        function(
                    $,
                    Logger,
                    History,
                    PageManager
                )
{
    'use strict';

    /**
     * Initialization function
     */
    var init = function()
    {
        var matchedUrl = History.start();
        if (!matchedUrl) {
            log('No tab loaded by default, we will load the first available...');

            PageManager.navigateToRoute('nihao');
        }
    };

    // Application bootstrap
    $(init);

});