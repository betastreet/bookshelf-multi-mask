# bookshelf-multi-mask
[![Version](https://badge.fury.io/js/bookshelf-multi-mask.svg)](http://badge.fury.io/js/bookshelf-multi-mask)
[![Downloads](http://img.shields.io/npm/dm/bookshelf-multi-mask.svg)](https://www.npmjs.com/package/bookshelf-multi-mask)

This [Bookshelf.js](https://github.com/tgriesser/bookshelf) plugin enables you to define masks on your models and serialize to JSON based on its fields using the [json-mask](https://github.com/nemtsov/json-mask) API. It is based on [bookshelf-mask](https://github.com/seegno/bookshelf-mask), but it allows you to specify an array of scopes instead of just one. This is useful for ACL where a user may be part of multiple groups/roles.

### Installation & Usage

Usage is the same as the plugin this module is based on: [bookshelf-mask](https://github.com/seegno/bookshelf-mask).

The only difference is using arrays when using the mask method:

```javascript
model.mask(['custom', 'admin']);
```
