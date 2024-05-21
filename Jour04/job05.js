const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/LaPlateforme')
  .then(() => console.log('Connected to MongoDB...'))
  .catch(err => console.error('Could not connect to MongoDB...', err));

const yearSchema = new mongoose.Schema({
  year: String
});

const Year = mongoose.model('Year', yearSchema);

const studentSchema = new mongoose.Schema({
  id: Number,
  lastname: String,
  firstname: String,
  students_number: Number,
  year_id: { type: mongoose.Schema.Types.ObjectId, ref: 'Year' }
});

const Student = mongoose.model('Student', studentSchema);

async function fetchStudents() {
  try {
    const students = await Student.find().populate('year_id').exec();
    console.log('Fetched students:', students);
  } catch (err) {
    console.error('Error fetching students:', err);
  } finally {
    mongoose.connection.close();
  }
}

fetchStudents();
