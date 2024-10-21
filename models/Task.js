const mongoose = require('mongoose');
const moment = require('moment');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  status: {
    type: String,
    enum: ['pending', 'in-progress', 'completed'],
    default: 'pending'
  },
  dueDate: {
    type: Date,
    required: true
  }
}, { timestamps: true });

// Format the dueDate when converting to JSON or object
TaskSchema.set('toJSON', {
  transform: (doc, ret) => {
    ret.dueDate = moment(ret.dueDate).format('DD-MM-YYYY');
    return ret;
  }
});

TaskSchema.set('toObject', {
  transform: (doc, ret) => {
    ret.dueDate = moment(ret.dueDate).format('DD-MM-YYYY');
    return ret;
  }
});

module.exports = mongoose.model('Task', TaskSchema);
