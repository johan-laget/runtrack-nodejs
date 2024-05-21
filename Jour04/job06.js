const readline = require('readline');
const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema);

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.question('Enter student number to filter: ', (studentNumber) => {
  Student.find({ students_number: { $gt: Number(studentNumber) } }, (err, students) => {
    if (err) {
      console.error(err);
    } else {
      console.log(students);
    }
    rl.close();
  });
});
