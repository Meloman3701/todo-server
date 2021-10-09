const mongoose = require('mongoose');
const { Schema } = mongoose;

const TodoModel = mongoose.model('todoItem', new Schema({ title: String }));

module.exports = TodoModel;
