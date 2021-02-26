// ==UserScript==
// @name         Tribal Wars - Otimizador Busca Minuciosa
// @namespace    https://github.com/silentw
// @updateURL    https://raw.githubusercontent.com/silentw/tribal-wars-scripts/master/BuscaMinuciosa.js
// @version      0.1
// @description  Otimizar a busca minuciosa
// @author       silentw
// @match        https://*/game.php?village=*&screen=place&mode=scavenge*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    window.addEventListener('load', () => {
        const that = this;
        const $ = window.jQuery;
        const $document = $(document);

        // scavenge time options
        const scavengeTimeOptions = [
            { timeToCollect: '30m', capacity: [3000, 1000, 500, 430] },
            { timeToCollect: '1h', capacity: [4200, 1700, 870, 580] },
            { timeToCollect: '1h30', capacity: [10000, 4000, 2000, 1330] },
            { timeToCollect: '2h', capacity: [17500, 7000, 3490, 2330] },
            { timeToCollect: '3h', capacity: [24840, 9970, 4999, 3330] },
            { timeToCollect: '5h', capacity: [85000, 34000, 17000, 11330] },
            { timeToCollect: '8h', capacity: [135000, 54000, 27000, 18000] },
            { timeToCollect: '10h', capacity: [170000, 68000, 34000, 22660] },
            { timeToCollect: '11h', capacity: [200000, 79000, 39400, 26240] },
            { timeToCollect: '12h', capacity: [225000, 84600, 42800, 28240] },
            { timeToCollect: '14h', capacity: [255000, 99900, 50800, 34100] },
            { timeToCollect: '15h', capacity: [273000, 108800, 54400, 36160] },
            { timeToCollect: '16h', capacity: [273000, 113789, 56910, 37920] },
            { timeToCollect: '22h', capacity: [360000, 151450, 75770, 50490] },
            { timeToCollect: '23h', capacity: [400000, 183000, 91515, 61015] }
        ];

        // create UI scavenge time options
        const $scavengeOptions = $.find('div.scavenge-option');
        $scavengeOptions.forEach((e, i) =>
            $(e).append(`<div class="title" style="margin-bottom:40px;height:auto;">${scavengeTimeOptions.map(c => `<a href="javascript:void(0)" data-capacity="${c.capacity[i]}">(${c.timeToCollect})</a>`).join('<br />')}</div>`)
        );

        // create click handler
        $document.on('click', 'div.scavenge-option a[data-capacity]', (e) => calculate.call(that, $(e.target).data('capacity')));

        // units configurations
        const units = [
            { unit: 'spear', capacity: 25 },
            { unit: 'sword', capacity: 15 },
            { unit: 'axe', capacity: 10 },
            { unit: 'archer', capacity: 10 },
            { unit: 'light', capacity: 80 },
            { unit: 'marcher', capacity: 50 },
            { unit: 'heavy', capacity: 50 }
        ];

        const $candidates = $document.find('table.candidate-squad-widget');
        const getUnitCount = (unit) => ~~$candidates.find('a.units-entry-all').filter((i, e) => e.dataset.unit == unit)[0].innerText.match(/\d+/g).join('') || 0;
        const setUnitValue = (unit, value) => $candidates.find(`input[name="${unit}"]`).trigger('focus').trigger('keydown').val(value).trigger('keyup').trigger('change');
        const calculate = (capacityGoal) => {
            for (let unit of units) {
                let unitsAvailable = getUnitCount(unit.unit);

                if (unitsAvailable > 0) {
                    if (unitsAvailable * unit.capacity > capacityGoal) {
                        setUnitValue.call(that, unit.unit, Math.floor(capacityGoal / unit.capacity));
                        break;
                    }
                    else {
                        setUnitValue.call(that, unit.unit, unitsAvailable);
                        capacityGoal -= Math.floor(unitsAvailable * unit.capacity);
                    }
                }
            };
        };
    });
})();