'use strict';

var Backbone = require('backbone');
var test = require('tap').test;
var toJSON = require('./index');

var expected = {
  foo: 'bar',
  boo: ['a','b'],
  baz: {
    back: 'front'
  },
  test: {
    hello: 'goodbye'
  }
};

test('should enumerate nested objects', function(t){
  var TestModel = Backbone.Model.extend();
  TestModel.prototype.toJSON = toJSON;
  var tm = new TestModel();

  tm.set({
    foo: 'bar',
    boo: ['a','b'],
    baz: new TestModel({back: 'front'}),
    test: {
      hello: 'goodbye'
    }
  });

  t.deepEqual(tm.toJSON(), expected, 'should match expected');
  t.end();
});