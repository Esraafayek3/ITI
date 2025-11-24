#!/bin/bash
# setup_mongodb.sh - Script to setup MongoDB with Docker and sample data

echo "=== MongoDB Course Setup Script ==="

# Function to check if Docker is running
check_docker() {
    if ! docker info > /dev/null 2>&1; then
        echo "Error: Docker is not running. Please start Docker and try again."
        exit 1
    fi
}

# Function to setup MongoDB container
setup_mongodb() {
    echo "Setting up MongoDB container..."
    
    # Stop and remove existing container if it exists
    docker stop mongodb-course 2>/dev/null || true
    docker rm mongodb-course 2>/dev/null || true
    
    # Run MongoDB container
    docker run --name mongodb-course \
        -p 27017:27017 \
        -v mongodb-course-data:/data/db \
        -d mongo:latest
    
    echo "Waiting for MongoDB to start..."
    sleep 10
    
    # Check if MongoDB is running
    if docker ps | grep -q mongodb-course; then
        echo "✓ MongoDB container is running successfully"
    else
        echo "✗ Failed to start MongoDB container"
        exit 1
    fi
}

# Function to create sample data for Day 1 (Library Management)
setup_day1_data() {
    echo "Creating Day 1 sample data (Library Management)..."
    
    docker exec -i mongodb-course mongosh <<EOF
use library_db

// Clear existing data
db.books.deleteMany({})
db.authors.deleteMany({})
db.members.deleteMany({})

// Insert sample books
db.books.insertMany([
    {
        title: "Learning JavaScript Programming",
        author: "Ahmed Mohamed",
        isbn: "978-123456789",
        price: 50,
        publishYear: 2023,
        categories: ["Technology", "Programming", "JavaScript"],
        inStock: true,
        copies: 5
    },
    {
        title: "Database Fundamentals",
        author: "Fatma Ahmed",
        isbn: "978-987654321",
        price: 75,
        publishYear: 2022,
        categories: ["Database", "Technology"],
        inStock: true,
        copies: 3
    },
    {
        title: "Modern Web Development",
        author: "Khaled Salem",
        isbn: "978-456123789",
        price: 60,
        publishYear: 2023,
        categories: ["Web", "Technology", "HTML", "CSS"],
        inStock: false,
        copies: 0
    },
    {
        title: "Artificial Intelligence and Machine Learning",
        author: "Sarah Hassan",
        isbn: "978-789456123",
        price: 90,
        publishYear: 2023,
        categories: ["AI", "Machine Learning", "Technology"],
        inStock: true,
        copies: 2
    },
    {
        title: "Cybersecurity Essentials",
        author: "Mohamed Ali",
        isbn: "978-321654987",
        price: 80,
        publishYear: 2022,
        categories: ["Cybersecurity", "Technology"],
        inStock: true,
        copies: 4
    }
])

// Insert sample authors
db.authors.insertMany([
    {
        name: "Ahmed Mohamed",
        email: "ahmed@example.com",
        specialization: ["JavaScript", "Web Development"],
        booksCount: 1
    },
    {
        name: "Fatma Ahmed",
        email: "fatma@example.com",
        specialization: ["Database", "SQL"],
        booksCount: 1
    },
    {
        name: "Khaled Salem",
        email: "khaled@example.com",
        specialization: ["Web Development", "Design"],
        booksCount: 1
    }
])

// Insert sample members
db.members.insertMany([
    {
        name: "Omar Hesham",
        email: "omar@student.com",
        membershipDate: new Date("2023-01-15"),
        membershipType: "student",
        borrowedBooks: [],
        isActive: true
    },
    {
        name: "Nour Eldeen",
        email: "nour@teacher.com",
        membershipDate: new Date("2022-09-01"),
        membershipType: "teacher",
        borrowedBooks: ["978-123456789"],
        isActive: true
    },
    {
        name: "Layla Mahmoud",
        email: "layla@student.com",
        membershipDate: new Date("2023-03-20"),
        membershipType: "student",
        borrowedBooks: [],
        isActive: false
    }
])

print("✓ Day 1 sample data created successfully")
EOF
}

# Function to create sample data for Day 2 (Student Management with Performance Focus)
setup_day2_data() {
    echo "Creating Day 2 sample data (Student Management)..."
    
    docker exec -i mongodb-course mongosh <<EOF
use student_db

// Clear existing data
db.students.deleteMany({})
db.courses.deleteMany({})
db.enrollments.deleteMany({})

// Insert large number of students for index performance testing
print("Inserting students data...")
var students = []
for (let i = 1; i <= 10000; i++) {
    students.push({
        studentId: "STD" + String(i).padStart(6, '0'),
        name: "Student " + i,
        email: "student" + i + "@iti.edu.eg",
        age: Math.floor(Math.random() * 10) + 18,
        gpa: Math.round((Math.random() * 3 + 1) * 100) / 100,
        department: ["Computer Science", "Information Systems", "Software Engineering"][Math.floor(Math.random() * 3)],
        enrollmentDate: new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        isActive: Math.random() > 0.1
    })
    
    if (students.length === 1000) {
        db.students.insertMany(students)
        students = []
        print("Inserted " + i + " students...")
    }
}
if (students.length > 0) {
    db.students.insertMany(students)
}

// Insert courses
db.courses.insertMany([
    {
        courseId: "CS101",
        name: "Introduction to Programming",
        credits: 3,
        department: "Computer Science",
        instructor: "Dr. Ahmed Mohamed"
    },
    {
        courseId: "CS201",
        name: "Data Structures",
        credits: 4,
        department: "Computer Science",
        instructor: "Dr. Fatma Ali"
    },
    {
        courseId: "IS301",
        name: "Database Systems",
        credits: 3,
        department: "Information Systems",
        instructor: "Dr. Khaled Salem"
    },
    {
        courseId: "SE401",
        name: "Software Engineering",
        credits: 4,
        department: "Software Engineering",
        instructor: "Dr. Sarah Hassan"
    }
])

// Insert enrollments
print("Creating enrollments...")
var enrollments = []
var students_cursor = db.students.find().limit(5000)
students_cursor.forEach(function(student) {
    var numCourses = Math.floor(Math.random() * 4) + 1
    var courses = ["CS101", "CS201", "IS301", "SE401"]
    for (let i = 0; i < numCourses; i++) {
        enrollments.push({
            studentId: student.studentId,
            courseId: courses[Math.floor(Math.random() * courses.length)],
            semester: "Fall 2023",
            grade: ["A", "B", "C", "D", "F"][Math.floor(Math.random() * 5)]
        })
    }
    
    if (enrollments.length >= 1000) {
        db.enrollments.insertMany(enrollments)
        enrollments = []
    }
})
if (enrollments.length > 0) {
    db.enrollments.insertMany(enrollments)
}

print("✓ Day 2 sample data created successfully")
EOF
}

# Function to create sample data for Day 3 (Sales Analytics)
setup_day3_data() {
    echo "Creating Day 3 sample data (Sales Analytics)..."
    
    docker exec -i mongodb-course mongosh <<EOF
use sales_db

// Clear existing data
db.sales.deleteMany({})
db.products.deleteMany({})
db.customers.deleteMany({})

// Insert products
db.products.insertMany([
    {
        productId: "P001",
        name: "Dell Laptop",
        category: "Electronics",
        price: 1500,
        cost: 1200,
        brand: "Dell"
    },
    {
        productId: "P002", 
        name: "Wireless Mouse",
        category: "Accessories",
        price: 25,
        cost: 18,
        brand: "Logitech"
    },
    {
        productId: "P003",
        name: "24-inch LED Monitor",
        category: "Electronics", 
        price: 300,
        cost: 220,
        brand: "Samsung"
    },
    {
        productId: "P004",
        name: "Mechanical Keyboard",
        category: "Accessories",
        price: 120,
        cost: 80,
        brand: "Corsair"
    },
    {
        productId: "P005",
        name: "Smartphone",
        category: "Electronics",
        price: 800,
        cost: 600,
        brand: "Samsung"
    }
])

// Insert customers
db.customers.insertMany([
    {
        customerId: "C001",
        name: "Ahmed Mohamed",
        email: "ahmed@email.com",
        city: "Cairo",
        country: "Egypt",
        registrationDate: new Date("2022-01-15")
    },
    {
        customerId: "C002",
        name: "Fatma Ali",
        email: "fatma@email.com", 
        city: "Alexandria",
        country: "Egypt",
        registrationDate: new Date("2022-03-20")
    },
    {
        customerId: "C003",
        name: "Khaled Salem",
        email: "khaled@email.com",
        city: "Giza", 
        country: "Egypt",
        registrationDate: new Date("2022-06-10")
    },
    {
        customerId: "C004",
        name: "Sarah Hassan",
        email: "sara@email.com",
        city: "Mansoura",
        country: "Egypt", 
        registrationDate: new Date("2022-08-05")
    }
])

// Insert sales data
print("Creating sales transactions...")
var sales = []
var products = ["P001", "P002", "P003", "P004", "P005"]
var customers = ["C001", "C002", "C003", "C004"]
var productPrices = {"P001": 1500, "P002": 25, "P003": 300, "P004": 120, "P005": 800}

for (let i = 1; i <= 1000; i++) {
    var saleDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1)
    var productId = products[Math.floor(Math.random() * products.length)]
    var customerId = customers[Math.floor(Math.random() * customers.length)]
    var quantity = Math.floor(Math.random() * 5) + 1
    var price = productPrices[productId]
    
    sales.push({
        saleId: "S" + String(i).padStart(6, '0'),
        productId: productId,
        customerId: customerId,
        quantity: quantity,
        unitPrice: price,
        totalAmount: price * quantity,
        saleDate: saleDate,
        month: saleDate.getMonth() + 1,
        year: saleDate.getFullYear(),
        quarter: Math.floor(saleDate.getMonth() / 3) + 1
    })
    
    if (sales.length === 100) {
        db.sales.insertMany(sales)
        sales = []
        if (i % 200 === 0) {
            print("Inserted " + i + " sales records...")
        }
    }
}
if (sales.length > 0) {
    db.sales.insertMany(sales)
}

print("✓ Day 3 sample data created successfully")
EOF
}

# Main execution
main() {
    echo "Starting MongoDB course setup..."
    
    check_docker
    setup_mongodb
    setup_day1_data
    setup_day2_data  
    setup_day3_data
    
    echo ""
    echo "=== Setup Complete! ==="
    echo "MongoDB is running on: localhost:27017"
    echo "Container name: mongodb-course"
    echo ""
    echo "To connect to MongoDB shell:"
    echo "docker exec -it mongodb-course mongosh"
    echo ""
    echo "Databases created:"
    echo "- library_db (Day 1 - Library Management)"
    echo "- student_db (Day 2 - Student Management with 10,000+ records)"
    echo "- sales_db (Day 3 - Sales Analytics with 1,000+ transactions)"
    echo ""
    echo "Ready for the course! 🚀"
}

# Run main function
main