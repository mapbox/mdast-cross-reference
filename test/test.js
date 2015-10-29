var fs = require('fs');
var crossReference = require('../');
var mdast = require('mdast');
var test = require('tap').test;

test('mdast-cross-reference', function(t) {
  var input = fs.readFileSync(__dirname + '/fixtures/simple.input.md', 'utf8');
  var output = mdast()
    .use(crossReference)
    .process(input);

  if (process.env.UPDATE) {
    fs.writeFileSync(__dirname + '/fixtures/simple.output.md', output);
  }

  t.equal(output, fs.readFileSync(__dirname + '/fixtures/simple.output.md', 'utf8'));

  t.end();
});
