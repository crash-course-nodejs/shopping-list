const mongoose = require('mongoose');

const Schema = mongoose.Schema;

//name, date
const ItemSchema = new Schema ({
    name: {
        type: String , 
        required: true
    },
    date: {
        type: Date ,
        defualt: Date.now
    }
});

module.exports = (Item = mongoose.model('item', ItemSchema));