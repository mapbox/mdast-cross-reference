'use strict';

var visit = require('unist-util-visit');
var u = require('unist-builder');

function transformer(tree) {
  var anchors = {};

  function enumerateChild(prefix, child, i) {
    var idx = i + 1;
    child.id = prefix ? prefix + '.' + idx : idx.toString();
    child.children.filter(function(child) {
      return child.type === 'list';
    }).forEach(function(list) {
      list.children.forEach(enumerateChild.bind(null, child.id));
    });
  }

  visit(tree, 'list', function (node) {
    node.children.forEach(enumerateChild.bind(null, ''));
    return false;
  });

  visit(tree, 'listItem', function (node) {
    var id = node.id;
    visit(node, 'html', function (node) {
      var match = node.value.match(/<a\s*name='([^']+)'>/);
      if (match) {
        anchors[match[1]] = id;
      }
    });
  });

  visit(tree, 'link', function (node) {
    if (node.children.length === 0) {
      var anchorNode = anchors[node.href.substring(1)];
      if (anchorNode) {
        node.children = [u('text', '', anchorNode)];
      }
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
