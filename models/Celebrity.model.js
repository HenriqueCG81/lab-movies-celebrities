//  Add your code here
const { Schema, model } = require('mongoose');

const celebritySchema = Schema({
  name: String,
  occupation: String,
  catchPhrase: String
});

const Celebrity = model('Celebrity', celebritySchema);
module.exports = Celebrity;
