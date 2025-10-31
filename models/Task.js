const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
},
  title: {
    type: String,
     required: true
},
  description: String,
  datetime: Date,
  deadline: Date,
  priority: {
    type: String,
    enum: ['low', 'medium', 'high'],
    default: 'medium'
 },
  completed: {
    type: Boolean,
     default: false
    },
},
{
     timestamps: true
}
);

module.exports = mongoose.model('Task', TaskSchema);
