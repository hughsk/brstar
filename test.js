var brstar = require('./')
var test   = require('tape')
var bl     = require('bl')
var fs     = require('fs')

var fixtures = {
    basic: __dirname + '/fixtures/basic.js'
  , uppercase: __dirname + '/fixtures/uppercase.js'
}

test('brstar', function(t) {
  t.plan(4)

  fs.createReadStream(fixtures.basic)
    .pipe(brstar(fixtures.basic, {
      brstar: [ fixtures.uppercase ]
    }))
    .pipe(bl(function(err, contents) {
      t.ifError(err, 'no error')
      contents = String(contents)
      t.notEqual(
          contents.indexOf('HELLO WORLD')
        , -1
        , 'replaced with uppercase'
      )
    }))

  fs.createReadStream(fixtures.basic)
    .pipe(brstar(fixtures.basic))
    .pipe(bl(function(err, contents) {
      t.ifError(err, 'no error')
      contents = String(contents)
      t.notEqual(
          contents.indexOf('HELLO WORLD')
        , -1
        , 'did not replace when not specified in config'
      )
    }))
})
