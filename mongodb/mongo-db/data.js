// task1
db.students.countDocuments();

db.students.findOne();

db.students.getIndexes();

db.students.aggregate([{ $group: { _id: "$department", count: { $sum: 1 } } }]);

db.students.aggregate([
  {
    $group: {
      _id: null,
      minAge: { $min: "$age" },
      maxAge: { $max: "$age" },
      avgAge: { $avg: "$age" },
    },
  },
]);

db.students.aggregate([
  {
    $bucketAuto: {
      groupBy: "$gpa",
      buckets: 4,
    },
  },
]);

// Task 2: Performance
// search by student ID

db.students.find({studentId: "STD005000"}).toArray()
db.students.find({ studentId: 500 }).explain("executionStats");

//  search by category 

db.students.find({department: "Computer Science"}).toArray()
db.students.find({ department: "Computer Science" }).explain("executionStats");

// search by GPA
db.students.find({gpa: {$gt: 3.5}}).toArray()
db.students.find({ gpa: { $gte: 3 } }).explain("executionStats");

//  sort by gpa 

db.students.find().sort({gpa: -1}).limit(100).toArray()
db.students.find().sort({ gpa: -1 }).limit(100).explain("executionStats");

// complex
db.students.find({department: "Computer Science", age: {$gte: 20}, gpa: {$gt: 3.0}}).sort({gpa:-1})
db.students.find().sort({ gpa: -1 }).limit(10).explain("executionStats");

// createIndex Task 3
// 1)
db.students.createIndex({ studentId: 1 }, { unique: true });
db.students.createIndex({ department: 1 });
db.students.createIndex({ gpa: -1 });
db.students.createIndex({ department: 1, gpa: -1 });
// 2)
db.students.createIndex({ department: 1, gpa: -1 });
db.students.createIndex({ department: 1, gpa: -1, age: 1 });

db.students.createIndex({ department: 1, active: 1 });

// task4
db.students.find({ studentId: "STD00500" }).explain("executionStats");
db.students.find({ department: "Computer Science" }).explain("executionStats");
db.students.find({ gpa: { $gte: 3.0 } }).explain("executionStats");
db.students.find().sort({ gpa: -1 }).limit(10).explain("executionStats");
db.students
  .find({
    department: "Computer Science",
    age: { $gte: 20 },
    gpa: { $gt: 3.0 },
  })
  .sort({ gpa: -1 })
  .limit(10)
  .explain("executionStats");
