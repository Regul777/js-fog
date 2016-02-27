js-fox
=============

JavaScript Obfuscator via js-fox [jsfoxguard.com](
http://jsfoxguard.com/).

---

### Command-line tool:

```
npm install -g js-fox
echo 'var a="test";' | jsfox
var _9g=['\x74\x65\x73\x74'];var a=_9g[0];
```

### npm package:

```
npm install js-fox --save
var jsFox = require('js-obfuscator');
jsFox (<string> jsSourceCode [, <object> options ] )
Returns: a Q promise.
```

## Grunt

```shell
npm install js-fox --save-dev
```

```js
grunt.loadNpmTasks('jsfox');
```

## Options (bold values are default)

- `stringsEncoding`: [__`escape-chars-x`__ | `null`] 
- `replaceProperties`: [__`true`__ | `false`]
- `detachStrings`: [__`true`__ | `false`]
- `compact`: [__`true`__ | `false`]
- `concurrency`: [__`2`__ | Range `1 - 99`] (for Grunt plugin only)


## Command Help

```
jsfox -h
Usage: jsfox [OPTIONS] [FILES]

Obfuscate JavaScript files via jsfoxguard.com
Read from STDIN if no files specified.

Default Options:
  -o stringsEncoding=[escape-chars-x|false]
  -o replaceProperties=true
  -o detachStrings=true

```

## Examples

### Grunt

```js
grunt.initConfig({
  clean: {
    output: 'test/output'
  },
  jsfox: {
    test: {
      options: {
        concurrency: 2,
        stringsEncoding: 'escape-chars-x',
        replaceProperties: true,
        detachStrings: true,
        compact: true
      },
      files: {
        'test/output/test.js': [
          'test/testfile.js',
          'test/bind.js',
          'test/reduce.js'
        ]
      }
    }
  }
});
```

### Call

```js
var jsFox = require('js-fox');

var script = 'var a="test";';

jsFox(script, {
  compact: false
}).then(function(obfuscated) {
  console.log(obfuscated);
}, function(err) {
  console.error(err);
});

/*
var _9j = ['\x74\x65\x73\x74'];
var a = _9j[0];
*/
```