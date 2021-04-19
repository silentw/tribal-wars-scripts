// ==UserScript==
// @name         Tribal Wars - Recrutar Helper
// @namespace    https://github.com/silentw
// @updateURL    https://raw.githubusercontent.com/silentw/tribal-wars-scripts/master/RecrutarHelper.js
// @version      0.1.0
// @description  Helper para a página recrutar
// @author       silentw
// @match        https://*/game.php?village=*&screen=train*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const $productionQ = jQuery('div.current_prod_wrapper');
    const $form = jQuery('form#train_form tbody');

    const troops = {};

    $productionQ.find('div.unit_sprite').map((i, v) => {
        let troopName = v.className.replace(/\b(?:unit_sprite\w*\s)\b/g, '');
        let troopQuantity = v.parentElement.innerText.match(/\d+/g, '')[0];

        troops[troopName] = (troops[troopName] || 0) + ~~troopQuantity;
    });

    $form.children('tr[class^=row]').each((i, v) => {
        let $tr = jQuery(v);
        let troopName = $tr.find('a[data-unit]').data('unit');
        let $troopQuantity = $tr.find('td:eq(2)');
        let troopQuantity = ~~$troopQuantity.text().split('/')[1];

        $troopQuantity.append(`<br /><span class="inactive" style="font-size: 11px;">(${(troops[troopName] || 0) + troopQuantity})</span>`);
    });
})();
