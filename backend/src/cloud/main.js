const _ = require("lodash");



Parse.Cloud.define("test", async (request) => {
    let words = ['sky', 'wood', 'forest', 'falcon',
    'pear', 'ocean', 'universe'];

    let fel = _.first(words);
    let lel = _.last(words);

    console.log(`First element: ${fel}`);
    console.log(`Last element: ${lel}`);
    return {
        fel,
        lel
    }
});