'use strict';

var visit = require('unist-util-visit');

function transformer(tree) {
  var definitions = {};

  visit(tree, 'html', function (node, index, parent) {
    var match = node.value.match(/<a\s*name='([^']+)'>/);
    if (match) {
      // here we'll determine what this would be called numerically,
      // and put it in an object for later
      console.log(match[1]);
    }
  });

  visit(tree, 'link', function (node, index, parent) {
    if (node.children.length === 1 &&
        node.children[0].value === 'AUTO') {
      console.log(node);
    }
  });
}

/**
 * Attacher.
 *
 * @return {function(node)}
 */
function attacher() {
  return transformer;
}

/*
 * Expose.
 */

module.exports = attacher;
