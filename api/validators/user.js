'use strict';

let mustache = require('mustache');

module.exports = (user, res) => {
    let output = mustache.render("{{title}} spends {{calc}}", {
        title: "Joe",
        calc: 3,
    });
    return {output: output};
}

