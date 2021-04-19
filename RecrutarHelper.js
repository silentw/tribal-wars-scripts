// ==UserScript==
// @name         Tribal Wars - Recrutar Helper
// @namespace    https://github.com/silentw
// @updateURL    https://raw.githubusercontent.com/silentw/tribal-wars-scripts/master/RecrutarHelper.js
// @version      0.2.0
// @description  Helper para a página recrutar
// @author       silentw
// @match        https://*/game.php?village=*&screen=train*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    // production queue
    const $productionQ = jQuery('div.current_prod_wrapper');

    // recruit form
    const $form = jQuery('form#train_form tbody');

    // troops on queue
    const troops = {};

    // gather all the troops on queue
    $productionQ.find('div.unit_sprite').map((i, v) => {
        // extract troop name from icon className
        let troopName = v.className.replace(/\b(?:unit_sprite\w*\s)\b/g, '');
        // extract troop quantity from text
        let troopQuantity = v.parentElement.innerText.match(/\d+/g, '')[0];
        // add or update the number of troops on queue
        troops[troopName] = (troops[troopName] || 0) + ~~troopQuantity;
    });

    // sum the troops on queue to the existing troops
    $form.children('tr[class^=row]').each((i, v) => {
        // table row
        let $tr = jQuery(v);
        // extract troop name from the anchor data
        let troopName = $tr.find('a[data-unit]').data('unit');
        // troop quantities column
        let $troopQuantity = $tr.find('td:eq(2)');
        // extract the total troop quantity from text
        let troopQuantity = ~~$troopQuantity.text().match(/\d+\/\d+/g)[0].split('/')[1];
        // append the total quantity of troop
        $troopQuantity.append(`<div><span class="inactive" style="font-size: 11px;">(${(troops[troopName] || 0) + troopQuantity})</span></div>`);
    });
})();
