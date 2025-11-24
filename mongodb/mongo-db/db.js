// task1
// PS C:\Users\esraa> docker ps
// PS C:\Users\esraa> docker exec -it mongodb-course mongosh
// test> use library_db
// switched to db library_db


// task 2
db.books.insertMany([
  {
    title: "Introduction to Algorithms",
    author: "Dr. Mohamed Ahmed",
    isbn: "978-111222333",
    price: 85,
    publishYear: 2023,
    categories: ["algorithms", "computer science"],
    language: "Arabic",
    pages: 450,
    inStock: true
  },
  {
    title: "Computer Networks",
    author: "Dr. Sara Mahmoud",
    isbn: "978-444555666",
    price: 70,
    publishYear: 2022,
    categories: ["networks", "technology"],
    language: "Arabic",
    pages: 380,
    inStock: false
  },
  {
    title: "Information Security",
    author: "Dr. Khaled Abdullah",
    isbn: "978-777888999",
    price: 95,
    publishYear: 2023,
    categories: ["security", "technology"],
    language: "Arabic",
    pages: 520,
    inStock: true
  }
])

library_db> db.books.find().pretty()

library_db> db.books.countDocuments({inStock: true})

// task 3
library_db> db.books.find({author: "Dr. Mohamed Ahmed"})

library_db> db.books.find({price: {$gt: 80}})

library_db> db.books.find({categories: "technology"})

library_db> db.books.find({publishYear: 2023}, {title: 1, author: 1})

library_db> db.books.find({pages: {$gt: 400}})

library_db> db.books.find({publishYear: {$gte: 2022, $lte: 2023}})


library_db> db.books.aggregate([{$group: {_id: "$author", count: {$sum: 1}}}])

// task 4

library-db> db.books.updateMany({}, {$mul: {price: 1.1}})

library-db> db.books.updateOne({title: "Computer Networks"}, {$set: {inStock: true}})

library-db> db.books.updateMany({price: {$gt: 90}}, {$set: {discount: true}})

library-db> db.books.updateOne({title: "Introduction to Algorithms"}, {$push: {categories: "reference"}})

library-db> db.books.updateMany({}, {$pull: {categories: "networks"}})

library-db> db.books.updateOne({title: "Information Security"}, {$set: {pages: 550}})

// task5
library-db>db.members.insertMany([
  {
    name: "Ahmed Mohamed Ali",
    email: "ahmed.ali@student.iti.gov.eg",
    membershipType: "student",
    joinDate: new Date("2023-09-01"),
    borrowedBooks: [],
    maxBooksAllowed: 3,
    isActive: true
  },
  {
    name: "Fatma Hassan Mahmoud",
    email: "fatma.hassan@teacher.iti.gov.eg",
    membershipType: "teacher",
    joinDate: new Date("2022-01-15"),
    borrowedBooks: ["978-111222333"],
    maxBooksAllowed: 5,
    isActive: true
  },
  {
    name: "Omar Khaled Salem",
    email: "omar.salem@student.iti.gov.eg",
    membershipType: "student",
    joinDate: new Date("2023-03-10"),
    borrowedBooks: ["978-444555666", "978-777888999"],
    maxBooksAllowed: 3,
    isActive: false
  }
])


library-db> db.members.find({membershipType: "student", isActive: true})

  
library-db> db.members.find({borrowedBooks: {$exists: true, $not: {$size: 0}}})

library-db> db.members.find({membershipType: "teacher", maxBooksAllowed: {$gt: 3}})

library-db> db.members.updateOne(
  {name: "Omar Khaled Salem"},
  {$set: {isActive: true}}
)

library-db> db.members.updateOne(
  {name: "Ahmed Mohamed Ali"},
  {$push: {borrowedBooks: "978-777888999"}}
)


// task 6

db.books.find({title: /^Computer/})

db.members.find({email: /student\.iti\.gov\.eg$/})

db.books.find({categories: {$all: ["technology", "security"]}})

db.members.find({
  joinDate: {
    $gte: new Date("2023-01-01"),
    $lte: new Date("2023-12-31")
  }
})

db.books.find({$or: [{price: {$gt: 90}}, {inStock: false}]})

db.books.find({categories: {$ne: "algorithms"}})
