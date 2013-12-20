[![build status](https://secure.travis-ci.org/toddself/backbone-nestedjson.png)](http://travis-ci.org/toddself/backbone-nestedjson)

#Backbone-NestedJSON
A simple replacement for `#toJSON` that can handle nested Backbone models.

#Usage
`npm install -S backbone-nestedjson`

```javascript
var Backbone = require('backbone');
var toJSON = require('backboned-nestedjson');
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

tm.toJSON()
{
  foo: 'bar',
  boo: ['a','b'],
  baz: {
    back: 'front'
  },
  test: {
    hello: 'goodbye'
  }
};
```