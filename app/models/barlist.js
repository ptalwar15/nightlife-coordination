// load mongoose since we need it to define a model
    var mongoose = require('mongoose');

    module.exports = mongoose.model('BarList', {
        location : String,
        businesses: [{
            _id: String,
            name: String,
            review: String,
            img: String,
            url: String,
            mobile_url: String,
            subscribers:[{
                type: mongoose.Schema.Types.ObjectId, ref: 'User'
            }]
        }]
    });