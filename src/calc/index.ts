// When using this library in the browser, a bundler like Webpack should be
// used to encapsulate the various interdependencies between internal packages.
// However, if you are requiring contents of this package in HTML <script>
// tags, the following loading order is required:
//
//   - util.js
//   - stats.js
//
//   - data/species.js
//   - data/types.js
//   - data/natures.js
//   - data/abilities.js
//   - data/moves.js
//   - data/items.js
//
//   - pokemon.js
//   - field.js
//   - move.js
//
//   - mechanics/util.js
//   - mechanics/gen8.js
//   - mechanics/gen7.js
//   - mechanics/gen6.js
//   - mechanics/gen5.js
//   - mechanics/gen4.js
//   - mechanics/gen3.js
//   - mechanics/gen2.js
//   - mechanics/gen1.js
//
//   - calc.js
//   - desc.js
//   - result.ts
//
//   - index.js
//
// Furthermore, before anything is loaded, the following is required:
//
// <script type="text/javascript">
//        var calc = exports = {};
//        function require() { return exports; };
//    </script>

// If we're not being used as a module we're just going to rely on globals and
// that the correct loading order being followed.

export {calculate} from '@/calc/calc';
export {Generation} from '@/calc/gen';
export {Pokemon} from '@/calc/pokemon';
export {Move} from '@/calc/move';
export {Field, Side} from '@/calc/field';
export {Result} from '@/calc/result';

export {ABILITIES} from '@/calc/data/abilities';
export {ITEMS, MEGA_STONES} from '@/calc/data/items';
export {MOVES} from '@/calc/data/moves';
export {SPECIES} from '@/calc/data/species';
export {NATURES} from '@/calc/data/natures';
export {TYPE_CHART} from '@/calc/data/types';
export {STATS, StatsTable, Stat, calcStat} from '@/calc/stats';

