module.exports = function () {
    var mongoose = require('mongoose');
    var WebsiteSchema = mongoose.Schema({
        _user:  {type: mongoose.Schema.Types.ObjectId, ref:"UserModel"},
        name: String,
        description: String,
        dateCreated: Date
    }, {collection: 'webdev.website'});
    return WebsiteSchema;
};
