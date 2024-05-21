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

async function insertData() {
  try {
    await Student.deleteMany({});
    await Year.deleteMany({});

    const years = await Year.insertMany([
      { year: 'Bachelor 1' },
      { year: 'Bachelor 2' },
      { year: 'Bachelor 3' }
    ]);

    const students = [
      { id: 1, lastname: 'LeBricoleur', firstname: 'Bob', students_number: 12345, year_id: years[0]._id },
      { id: 2, lastname: 'Doe', firstname: 'John', students_number: 23456, year_id: years[1]._id },
      { id: 3, lastname: 'Dupont', firstname: 'Marine', students_number: 34567, year_id: years[2]._id }
    ];

    await Student.insertMany(students);
    console.log('Students and years added successfully');
  } catch (err) {
    console.error('Error adding students and years', err);
  } finally {
    mongoose.connection.close();
  }
}

insertData();
