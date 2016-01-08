# remark-cross-reference

A poor man's [LaTeX cross-referencing system](https://en.wikibooks.org/wiki/LaTeX/Labels_and_Cross-referencing) in Markdown.

This detects `<a name='foo'></a>` anchors and references to them like
`[](#foo)`, and rewrites them to numbered section references.

Rewrites

```md
1.  Foo bar
    1.  <a name='baz'></a> Baz
2.  <a name='bar'></a>This refers to [](#baz)
3.  And this refers to [](#bar)
```

To

```md
1.  Foo bar
    1.  <a name='baz'></a> Baz
2.  <a name='bar'></a>This refers to [1.1](#baz)
3.  And this refers to [2](#bar)
```
