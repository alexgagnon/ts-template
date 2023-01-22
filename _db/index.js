const Engine = require('tingodb')();

var db = new Engine.Db('/some/local/path', {});
var collection = db.collection("batch_document_insert_collection_safe");