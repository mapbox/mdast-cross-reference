var fs = require('fs');
var crossReference = require('../');
var mdast = require('mdast');
var test = require('tap').test;

test('mdast-cross-reference', function(t) {
  var input = fs.readFileSync(__dirname + '/fixtures/simple.input.md', 'utf8');
  var ast = mdast()
    .use(crossReference)
    .process(input);

  t.end();
});
