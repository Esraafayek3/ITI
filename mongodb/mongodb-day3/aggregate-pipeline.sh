#!/bin/bash
# mongodb_aggregation_course_setup.sh - MongoDB Aggregation Pipeline Course Setup Script

echo "=== MongoDB Aggregation Pipeline Course Setup Script ==="
echo "🎯 Setting up MongoDB Aggregation Pipeline Training Environment"

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
NC='\033[0m' # No Color

# Configuration
CONTAINER_NAME="mongodb-aggregation-course"
PORT="27017"
VOLUME_NAME="mongodb-aggregation-data"

# Function to print colored messages
print_message() {
    local color=$1
    local message=$2
    echo -e "${color}${message}${NC}"
}

# Function to check if Docker is running
check_docker() {
    print_message $BLUE "🔍 Checking Docker status..."
    if ! docker info > /dev/null 2>&1; then
        print_message $RED "❌ Docker is not running. Please start Docker and try again."
        exit 1
    fi
    print_message $GREEN "✅ Docker is running properly"
}

# Function to setup MongoDB container
setup_mongodb() {
    print_message $BLUE "🐳 Setting up MongoDB container..."
    
    # Stop and remove existing container if it exists
    if docker ps -a | grep -q $CONTAINER_NAME; then
        print_message $YELLOW "🔄 Stopping and removing existing container..."
        docker stop $CONTAINER_NAME 2>/dev/null || true
        docker rm $CONTAINER_NAME 2>/dev/null || true
    fi
    
    # Run MongoDB container
    print_message $BLUE "🚀 Starting MongoDB container..."
    docker run --name $CONTAINER_NAME \
        -p $PORT:$PORT \
        -v $VOLUME_NAME:/data/db \
        -d mongo:latest
    
    print_message $YELLOW "⏳ Waiting for MongoDB to start..."
    sleep 15
    
    # Check if MongoDB is running
    if docker ps | grep -q $CONTAINER_NAME; then
        print_message $GREEN "✅ MongoDB container is running successfully"
    else
        print_message $RED "❌ Failed to start MongoDB container"
        exit 1
    fi
}

# Function to create e-commerce data for aggregation training
setup_ecommerce_data() {
    print_message $PURPLE "🏪 Creating E-commerce Database..."
    
    docker exec -i $CONTAINER_NAME mongosh <<'EOF'
use ecommerce_db

print("🗑️ Cleaning existing data...");
db.users.drop();
db.products.drop();
db.orders.drop();
db.categories.drop();
db.reviews.drop();

print("📁 Creating categories data...");
db.categories.insertMany([
    { _id: 1, name: "Electronics", description: "Electronic devices and tech equipment" },
    { _id: 2, name: "Clothing", description: "Men's, women's and children's clothing" },
    { _id: 3, name: "Home & Garden", description: "Home appliances and garden supplies" },
    { _id: 4, name: "Sports", description: "Sports equipment and fitness gear" },
    { _id: 5, name: "Books", description: "Books, magazines and educational materials" },
    { _id: 6, name: "Automotive", description: "Car parts and automotive accessories" },
    { _id: 7, name: "Beauty", description: "Beauty and personal care products" },
    { _id: 8, name: "Toys", description: "Children's toys and games" }
]);

print("👥 Creating users data...");
const cities = ["Cairo", "Alexandria", "Giza", "Sharkia", "Menofia", "Qalyubia", "Beheira", "Gharbia"];
const firstNames = ["Ahmed", "Mohamed", "Ali", "Hassan", "Ibrahim", "Abdullah", "Omar", "Youssef", "Fatma", "Aisha", "Zeinab", "Mariam"];
const lastNames = ["Mohamed", "Ahmed", "Ali", "Hassan", "Ibrahim", "Abdelrahman", "Abdullah", "Elsayed"];

const users = [];
for (let i = 1; i <= 50000; i++) {
    const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
    const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
    
    users.push({
        _id: i,
        firstName: firstName,
        lastName: lastName,
        fullName: `${firstName} ${lastName}`,
        email: `user${i}@example.com`,
        phone: `010${String(Math.floor(Math.random() * 100000000)).padStart(8, '0')}`,
        age: Math.floor(Math.random() * 50) + 18,
        city: cities[Math.floor(Math.random() * cities.length)],
        registrationDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        isActive: Math.random() > 0.1,
        preferences: {
            newsletter: Math.random() > 0.3,
            sms: Math.random() > 0.5,
            language: Math.random() > 0.8 ? "en" : "ar"
        }
    });
    
    if (users.length === 1000) {
        db.users.insertMany(users);
        users.length = 0;
        if (i % 10000 === 0) print(`   📝 Created ${i} users`);
    }
}
if (users.length > 0) db.users.insertMany(users);

print("📦 Creating products data...");
const productNames = {
    1: ["Dell Laptop", "Samsung Phone", "iPad Tablet", "Sony Headphones", "LG Monitor"],
    2: ["Cotton Shirt", "Jeans Pants", "Summer Dress", "Sports Shoes", "Winter Jacket"],
    3: ["Office Chair", "Wooden Table", "LED Lamp", "Persian Carpet", "Cotton Curtains"],
    4: ["Football", "Tennis Racket", "Bicycle", "Running Shoes", "Sports Bag"],
    5: ["Novel Book", "Programming Book", "Science Magazine", "English Dictionary", "Cookbook"],
    6: ["Car Tire", "Engine Oil", "Air Filter", "Car Battery", "Windshield Wipers"],
    7: ["Moisturizer", "Natural Shampoo", "French Perfume", "Lipstick", "Face Mask"],
    8: ["Toy Car", "Barbie Doll", "Building Blocks", "Coloring Book", "Colored Ball"]
};

const products = [];
for (let i = 1; i <= 25000; i++) {
    const categoryId = Math.floor(Math.random() * 8) + 1;
    const categoryProducts = productNames[categoryId];
    const productName = categoryProducts[Math.floor(Math.random() * categoryProducts.length)];
    
    products.push({
        _id: i,
        name: `${productName} Model ${String.fromCharCode(65 + Math.floor(Math.random() * 26))}${Math.floor(Math.random() * 1000)}`,
        categoryId: categoryId,
        price: Math.floor(Math.random() * 5000) + 50,
        originalPrice: Math.floor(Math.random() * 6000) + 100,
        stock: Math.floor(Math.random() * 1000),
        rating: (Math.random() * 2 + 3).toFixed(1),
        reviewCount: Math.floor(Math.random() * 500),
        description: `Detailed description for ${productName}`,
        tags: [`tag${Math.floor(Math.random() * 50)}`, `tag${Math.floor(Math.random() * 50)}`],
        createdAt: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        isAvailable: Math.random() > 0.05
    });
    
    if (products.length === 1000) {
        db.products.insertMany(products);
        products.length = 0;
        if (i % 5000 === 0) print(`   📦 Created ${i} products`);
    }
}
if (products.length > 0) db.products.insertMany(products);

print("🛒 Creating orders data...");
const orderStatuses = ["pending", "confirmed", "shipped", "delivered", "cancelled"];
const paymentMethods = ["cash", "credit_card", "debit_card", "online"];

const orders = [];
for (let i = 1; i <= 100000; i++) {
    const userId = Math.floor(Math.random() * 50000) + 1;
    const orderDate = new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    const itemCount = Math.floor(Math.random() * 5) + 1;
    const items = [];
    let totalAmount = 0;
    
    for (let j = 0; j < itemCount; j++) {
        const productId = Math.floor(Math.random() * 25000) + 1;
        const quantity = Math.floor(Math.random() * 3) + 1;
        const price = Math.floor(Math.random() * 2000) + 100;
        const itemTotal = price * quantity;
        
        items.push({
            productId: productId,
            quantity: quantity,
            price: price,
            total: itemTotal
        });
        
        totalAmount += itemTotal;
    }
    
    orders.push({
        _id: i,
        userId: userId,
        orderDate: orderDate,
        status: orderStatuses[Math.floor(Math.random() * orderStatuses.length)],
        paymentMethod: paymentMethods[Math.floor(Math.random() * paymentMethods.length)],
        items: items,
        totalAmount: totalAmount,
        shippingCost: totalAmount > 500 ? 0 : 30,
        finalAmount: totalAmount + (totalAmount > 500 ? 0 : 30),
        year: orderDate.getFullYear(),
        month: orderDate.getMonth() + 1,
        quarter: Math.ceil((orderDate.getMonth() + 1) / 3),
        region: cities[Math.floor(Math.random() * cities.length)]
    });
    
    if (orders.length === 1000) {
        db.orders.insertMany(orders);
        orders.length = 0;
        if (i % 20000 === 0) print(`   🛒 Created ${i} orders`);
    }
}
if (orders.length > 0) db.orders.insertMany(orders);

print("⭐ Creating reviews data...");
const reviewComments = [
    "Excellent product with high quality",
    "Good price and fast delivery", 
    "Highly recommend this purchase",
    "Quality lower than expected",
    "Excellent customer service",
    "Product as described"
];

const reviews = [];
for (let i = 1; i <= 25000; i++) {
    reviews.push({
        _id: i,
        userId: Math.floor(Math.random() * 50000) + 1,
        productId: Math.floor(Math.random() * 25000) + 1,
        rating: Math.floor(Math.random() * 3) + 3,
        comment: reviewComments[Math.floor(Math.random() * reviewComments.length)],
        reviewDate: new Date(2020 + Math.floor(Math.random() * 5), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        isVerified: Math.random() > 0.2,
        helpfulVotes: Math.floor(Math.random() * 20)
    });
    
    if (reviews.length === 1000) {
        db.reviews.insertMany(reviews);
        reviews.length = 0;
        if (i % 5000 === 0) print(`   ⭐ Created ${i} reviews`);
    }
}
if (reviews.length > 0) db.reviews.insertMany(reviews);

print("🔧 Creating indexes...");
db.users.createIndex({ email: 1 });
db.users.createIndex({ city: 1 });
db.users.createIndex({ age: 1 });
db.products.createIndex({ categoryId: 1 });
db.products.createIndex({ price: 1 });
db.orders.createIndex({ userId: 1 });
db.orders.createIndex({ orderDate: 1 });
db.orders.createIndex({ year: 1, month: 1 });
db.reviews.createIndex({ productId: 1 });
db.reviews.createIndex({ userId: 1 });

print("✅ E-commerce database created successfully");
EOF
}

# Function to create HR data for advanced aggregation
setup_hr_data() {
    print_message $PURPLE "👨‍💼 Creating HR Database..."
    
    docker exec -i $CONTAINER_NAME mongosh <<'EOF'
use hr_db

print("🗑️ Cleaning existing data...");
db.employees.drop();
db.departments.drop();
db.projects.drop();
db.salaries.drop();

print("🏢 Creating departments data...");
db.departments.insertMany([
    { _id: 1, name: "Information Technology", code: "IT", budget: 500000, managerId: null },
    { _id: 2, name: "Human Resources", code: "HR", budget: 200000, managerId: null },
    { _id: 3, name: "Sales", code: "SALES", budget: 300000, managerId: null },
    { _id: 4, name: "Marketing", code: "MKT", budget: 250000, managerId: null },
    { _id: 5, name: "Finance", code: "FIN", budget: 180000, managerId: null }
]);

print("👥 Creating employees data...");
const positions = ["Developer", "Analyst", "Manager", "Assistant", "Specialist", "Team Lead"];
const skills = ["JavaScript", "Python", "Java", "SQL", "React", "Node.js", "MongoDB"];

const employees = [];
for (let i = 1; i <= 5000; i++) {
    employees.push({
        _id: i,
        employeeId: `EMP${String(i).padStart(6, '0')}`,
        name: `Employee ${i}`,
        email: `employee${i}@company.com`,
        departmentId: Math.floor(Math.random() * 5) + 1,
        position: positions[Math.floor(Math.random() * positions.length)],
        salary: Math.floor(Math.random() * 50000) + 30000,
        hireDate: new Date(2015 + Math.floor(Math.random() * 9), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        skills: skills.slice(0, Math.floor(Math.random() * 4) + 1),
        performance: Math.floor(Math.random() * 5) + 1,
        isActive: Math.random() > 0.05
    });
    
    if (employees.length === 500) {
        db.employees.insertMany(employees);
        employees.length = 0;
        if (i % 1000 === 0) print(`   👤 Created ${i} employees`);
    }
}
if (employees.length > 0) db.employees.insertMany(employees);

print("📊 Creating projects data...");
const projects = [];
for (let i = 1; i <= 100; i++) {
    const startDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    const endDate = new Date(startDate.getTime() + (Math.floor(Math.random() * 365) + 30) * 24 * 60 * 60 * 1000);
    
    projects.push({
        _id: i,
        projectId: `PRJ${String(i).padStart(3, '0')}`,
        name: `Project ${i}`,
        departmentId: Math.floor(Math.random() * 5) + 1,
        budget: Math.floor(Math.random() * 100000) + 50000,
        startDate: startDate,
        endDate: endDate,
        status: ["active", "completed", "on-hold"][Math.floor(Math.random() * 3)],
        teamSize: Math.floor(Math.random() * 10) + 3
    });
}
db.projects.insertMany(projects);

print("💰 Creating salary data...");
const salaries = [];
for (let empId = 1; empId <= 5000; empId++) {
    for (let month = 1; month <= 12; month++) {
        const baseSalary = Math.floor(Math.random() * 50000) + 30000;
        salaries.push({
            employeeId: empId,
            year: 2023,
            month: month,
            baseSalary: baseSalary,
            bonus: Math.floor(Math.random() * 5000),
            deductions: Math.floor(Math.random() * 2000),
            totalSalary: baseSalary + Math.floor(Math.random() * 5000) - Math.floor(Math.random() * 2000)
        });
    }
    
    if (salaries.length >= 1000) {
        db.salaries.insertMany(salaries);
        salaries.length = 0;
        if (empId % 500 === 0) print(`   💵 Created salaries for ${empId} employees`);
    }
}
if (salaries.length > 0) db.salaries.insertMany(salaries);

print("🔧 Creating HR indexes...");
db.employees.createIndex({ departmentId: 1 });
db.employees.createIndex({ salary: 1 });
db.employees.createIndex({ hireDate: 1 });
db.salaries.createIndex({ employeeId: 1, year: 1, month: 1 });
db.projects.createIndex({ departmentId: 1 });

print("✅ HR database created successfully");
EOF
}

# Function to create financial data
setup_financial_data() {
    print_message $PURPLE "💳 Creating Financial Database..."
    
    docker exec -i $CONTAINER_NAME mongosh <<'EOF'
use finance_db

print("🗑️ Cleaning existing data...");
db.transactions.drop();
db.accounts.drop();
db.branches.drop();

print("🏦 Creating branches data...");
db.branches.insertMany([
    { _id: 1, name: "Cairo Main Branch", city: "Cairo", region: "Greater Cairo" },
    { _id: 2, name: "Alexandria Branch", city: "Alexandria", region: "North Coast" },
    { _id: 3, name: "Giza Branch", city: "Giza", region: "Greater Cairo" },
    { _id: 4, name: "Mansoura Branch", city: "Mansoura", region: "Delta" },
    { _id: 5, name: "Assiut Branch", city: "Assiut", region: "Upper Egypt" }
]);

print("💳 Creating accounts data...");
const accountTypes = ["savings", "current", "business", "investment"];
const accounts = [];
for (let i = 1; i <= 10000; i++) {
    accounts.push({
        _id: i,
        accountNumber: `ACC${String(i).padStart(8, '0')}`,
        customerName: `Customer ${i}`,
        accountType: accountTypes[Math.floor(Math.random() * accountTypes.length)],
        branchId: Math.floor(Math.random() * 5) + 1,
        balance: Math.floor(Math.random() * 1000000) + 1000,
        openDate: new Date(2018 + Math.floor(Math.random() * 6), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
        isActive: Math.random() > 0.02
    });
    
    if (accounts.length === 1000) {
        db.accounts.insertMany(accounts);
        accounts.length = 0;
        if (i % 2000 === 0) print(`   💳 Created ${i} accounts`);
    }
}
if (accounts.length > 0) db.accounts.insertMany(accounts);

print("💰 Creating financial transactions...");
const transactionTypes = ["deposit", "withdrawal", "transfer", "payment"];
const transactions = [];
for (let i = 1; i <= 200000; i++) {
    const transactionDate = new Date(2020 + Math.floor(Math.random() * 4), Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1);
    
    transactions.push({
        _id: i,
        transactionId: `TXN${String(i).padStart(10, '0')}`,
        accountId: Math.floor(Math.random() * 10000) + 1,
        type: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
        amount: Math.floor(Math.random() * 50000) + 100,
        transactionDate: transactionDate,
        description: `Transaction ${i}`,
        year: transactionDate.getFullYear(),
        month: transactionDate.getMonth() + 1,
        quarter: Math.ceil((transactionDate.getMonth() + 1) / 3)
    });
    
    if (transactions.length === 2000) {
        db.transactions.insertMany(transactions);
        transactions.length = 0;
        if (i % 40000 === 0) print(`   💸 Created ${i} transactions`);
    }
}
if (transactions.length > 0) db.transactions.insertMany(transactions);

print("🔧 Creating financial indexes...");
db.accounts.createIndex({ branchId: 1 });
db.accounts.createIndex({ accountType: 1 });
db.transactions.createIndex({ accountId: 1 });
db.transactions.createIndex({ transactionDate: 1 });
db.transactions.createIndex({ year: 1, month: 1 });

print("✅ Financial database created successfully");
EOF
}

# Function to create aggregation examples
create_aggregation_examples() {
    print_message $BLUE "📝 Creating Aggregation Pipeline Examples..."
    
    cat > aggregation_examples.js << 'EOF'
// Comprehensive Aggregation Pipeline Examples
// For use with generated training data

print("=== Comprehensive Aggregation Pipeline Examples ===\n");

// Part 1: E-commerce Examples
use ecommerce_db;

print("🏪 === E-commerce Examples ===");

print("\n1. Top 5 customers by spending:");
db.orders.aggregate([
    { $group: {
        _id: "$userId",
        totalSpent: { $sum: "$finalAmount" },
        orderCount: { $sum: 1 }
    }},
    { $lookup: {
        from: "users",
        localField: "_id", 
        foreignField: "_id",
        as: "userInfo"
    }},
    { $project: {
        customerName: { $arrayElemAt: ["$userInfo.fullName", 0] },
        totalSpent: { $round: ["$totalSpent", 2] },
        orderCount: 1
    }},
    { $sort: { totalSpent: -1 } },
    { $limit: 5 }
]).forEach(printjson);

print("\n2. Monthly sales for 2023:");
db.orders.aggregate([
    { $match: { year: 2023 } },
    { $group: {
        _id: { month: "$month" },
        totalSales: { $sum: "$finalAmount" },
        orderCount: { $sum: 1 }
    }},
    { $sort: { "_id.month": 1 } }
]).forEach(printjson);

print("\n3. Category performance:");
db.orders.aggregate([
    { $unwind: "$items" },
    { $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id", 
        as: "productInfo"
    }},
    { $lookup: {
        from: "categories",
        localField: "productInfo.categoryId",
        foreignField: "_id",
        as: "categoryInfo"
    }},
    { $group: {
        _id: { $arrayElemAt: ["$categoryInfo.name", 0] },
        totalRevenue: { $sum: "$items.total" },
        itemsSold: { $sum: "$items.quantity" }
    }},
    { $sort: { totalRevenue: -1 } }
]).forEach(printjson);

// Part 2: HR Examples  
use hr_db;

print("\n👨‍💼 === HR Examples ===");

print("\n4. Average salary by department:");
db.employees.aggregate([
    { $lookup: {
        from: "departments",
        localField: "departmentId",
        foreignField: "_id",
        as: "deptInfo"
    }},
    { $group: {
        _id: { $arrayElemAt: ["$deptInfo.name", 0] },
        avgSalary: { $avg: "$salary" },
        employeeCount: { $sum: 1 }
    }},
    { $project: {
        department: "$_id",
        avgSalary: { $round: ["$avgSalary", 2] },
        employeeCount: 1,
        _id: 0
    }},
    { $sort: { avgSalary: -1 } }
]).forEach(printjson);

print("\n5. Performance analysis:");
db.employees.aggregate([
    { $group: {
        _id: "$performance",
        count: { $sum: 1 },
        avgSalary: { $avg: "$salary" }
    }},
    { $sort: { _id: 1 } }
]).forEach(printjson);

print("\n6. New hires (last 6 months):");
db.employees.aggregate([
    { $match: { 
        hireDate: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 6)) }
    }},
    { $lookup: {
        from: "departments",
        localField: "departmentId", 
        foreignField: "_id",
        as: "deptInfo"
    }},
    { $group: {
        _id: { $arrayElemAt: ["$deptInfo.name", 0] },
        newHires: { $sum: 1 },
        avgSalary: { $avg: "$salary" }
    }},
    { $sort: { newHires: -1 } }
]).forEach(printjson);

// Part 3: Financial Examples
use finance_db;

print("\n💳 === Financial Examples ===");

print("\n7. Total transactions by branch:");
db.transactions.aggregate([
    { $lookup: {
        from: "accounts",
        localField: "accountId",
        foreignField: "_id",
        as: "accountInfo"
    }},
    { $lookup: {
        from: "branches", 
        localField: "accountInfo.branchId",
        foreignField: "_id",
        as: "branchInfo"
    }},
    { $group: {
        _id: { $arrayElemAt: ["$branchInfo.name", 0] },
        totalTransactions: { $sum: 1 },
        totalAmount: { $sum: "$amount" },
        avgTransaction: { $avg: "$amount" }
    }},
    { $project: {
        branch: "$_id",
        totalTransactions: 1,
        totalAmount: { $round: ["$totalAmount", 2] },
        avgTransaction: { $round: ["$avgTransaction", 2] },
        _id: 0
    }},
    { $sort: { totalAmount: -1 } }
]).forEach(printjson);

print("\n8. Transaction type analysis:");
db.transactions.aggregate([
    { $group: {
        _id: "$type",
        count: { $sum: 1 },
        totalAmount: { $sum: "$amount" },
        avgAmount: { $avg: "$amount" }
    }},
    { $project: {
        transactionType: "$_id",
        count: 1,
        totalAmount: { $round: ["$totalAmount", 2] },
        avgAmount: { $round: ["$avgAmount", 2] },
        _id: 0
    }},
    { $sort: { totalAmount: -1 } }
]).forEach(printjson);

print("\n9. Monthly transaction trend (2023):");
db.transactions.aggregate([
    { $match: { year: 2023 } },
    { $group: {
        _id: { month: "$month" },
        transactionCount: { $sum: 1 },
        totalVolume: { $sum: "$amount" }
    }},
    { $sort: { "_id.month": 1 } },
    { $project: {
        month: "$_id.month",
        transactionCount: 1,
        totalVolume: { $round: ["$totalVolume", 2] },
        _id: 0
    }}
]).forEach(printjson);

// Advanced examples across databases
print("\n🔥 === Advanced Examples ===");

use ecommerce_db;

print("\n10. Customer RFM Analysis (Recency, Frequency, Monetary):");
db.orders.aggregate([
    { $group: {
        _id: "$userId",
        lastOrderDate: { $max: "$orderDate" },
        orderFrequency: { $sum: 1 },
        monetaryValue: { $sum: "$finalAmount" }
    }},
    { $addFields: {
        recency: { $divide: [{ $subtract: [new Date(), "$lastOrderDate"] }, 1000 * 60 * 60 * 24] },
        recencyScore: {
            $switch: {
                branches: [
                    { case: { $lte: ["$recency", 30] }, then: 5 },
                    { case: { $lte: ["$recency", 60] }, then: 4 },
                    { case: { $lte: ["$recency", 90] }, then: 3 },
                    { case: { $lte: ["$recency", 180] }, then: 2 }
                ],
                default: 1
            }
        },
        frequencyScore: {
            $switch: {
                branches: [
                    { case: { $gte: ["$orderFrequency", 15] }, then: 5 },
                    { case: { $gte: ["$orderFrequency", 10] }, then: 4 },
                    { case: { $gte: ["$orderFrequency", 7] }, then: 3 },
                    { case: { $gte: ["$orderFrequency", 3] }, then: 2 }
                ],
                default: 1
            }
        },
        monetaryScore: {
            $switch: {
                branches: [
                    { case: { $gte: ["$monetaryValue", 10000] }, then: 5 },
                    { case: { $gte: ["$monetaryValue", 5000] }, then: 4 },
                    { case: { $gte: ["$monetaryValue", 2000] }, then: 3 },
                    { case: { $gte: ["$monetaryValue", 500] }, then: 2 }
                ],
                default: 1
            }
        }
    }},
    { $addFields: {
        customerSegment: {
            $switch: {
                branches: [
                    { case: { $and: [{ $gte: ["$recencyScore", 4] }, { $gte: ["$frequencyScore", 4] }, { $gte: ["$monetaryScore", 4] }] }, then: "Champions" },
                    { case: { $and: [{ $gte: ["$recencyScore", 3] }, { $gte: ["$frequencyScore", 3] }, { $gte: ["$monetaryScore", 3] }] }, then: "Loyal Customers" },
                    { case: { $gte: ["$recencyScore", 4] }, then: "New Customers" },
                    { case: { $lte: ["$recencyScore", 2] }, then: "At Risk" }
                ],
                default: "Others"
            }
        }
    }},
    { $group: {
        _id: "$customerSegment",
        customerCount: { $sum: 1 },
        avgMonetaryValue: { $avg: "$monetaryValue" }
    }},
    { $sort: { customerCount: -1 } }
]).forEach(printjson);

print("\n11. Seasonal performance analysis:");
db.orders.aggregate([
    { $addFields: {
        dayOfWeek: { $dayOfWeek: "$orderDate" },
        season: {
            $switch: {
                branches: [
                    { case: { $in: ["$month", [12, 1, 2]] }, then: "Winter" },
                    { case: { $in: ["$month", [3, 4, 5]] }, then: "Spring" },
                    { case: { $in: ["$month", [6, 7, 8]] }, then: "Summer" },
                    { case: { $in: ["$month", [9, 10, 11]] }, then: "Fall" }
                ]
            }
        }
    }},
    { $group: {
        _id: { season: "$season", dayOfWeek: "$dayOfWeek" },
        orderCount: { $sum: 1 },
        totalSales: { $sum: "$finalAmount" },
        avgOrderValue: { $avg: "$finalAmount" }
    }},
    { $sort: { "_id.season": 1, "_id.dayOfWeek": 1 } },
    { $project: {
        season: "$_id.season",
        dayOfWeek: "$_id.dayOfWeek",
        orderCount: 1,
        totalSales: { $round: ["$totalSales", 2] },
        avgOrderValue: { $round: ["$avgOrderValue", 2] },
        _id: 0
    }}
]).forEach(printjson);

print("\n🎉 Aggregation Pipeline examples completed");
print("💡 You can run more queries using:");
print("docker exec -it mongodb-aggregation-course mongosh");
EOF

    cat > advanced_aggregation_exercises.js << 'EOF'
// Advanced Aggregation Pipeline Exercises
// For students to practice

print("=== Advanced Exercises for Students ===\n");

print("📋 Exercises to solve:");
print("1. Find top 3 best-selling products in each category");
print("2. Calculate monthly sales growth rate");
print("3. Find customers who haven't purchased in 3+ months");
print("4. Calculate average order value by region");
print("5. Find employees earning above their department average");

print("\n🔍 Exercise Solutions:");

use ecommerce_db;

print("\n✅ Solution 1: Top 3 best-selling products per category");
db.orders.aggregate([
    { $unwind: "$items" },
    { $lookup: {
        from: "products",
        localField: "items.productId",
        foreignField: "_id",
        as: "productInfo"
    }},
    { $lookup: {
        from: "categories", 
        localField: "productInfo.categoryId",
        foreignField: "_id",
        as: "categoryInfo"
    }},
    { $group: {
        _id: {
            categoryId: { $arrayElemAt: ["$productInfo.categoryId", 0] },
            productId: "$items.productId"
        },
        categoryName: { $first: { $arrayElemAt: ["$categoryInfo.name", 0] } },
        productName: { $first: { $arrayElemAt: ["$productInfo.name", 0] } },
        totalQuantity: { $sum: "$items.quantity" },
        totalRevenue: { $sum: "$items.total" }
    }},
    { $sort: { "_id.categoryId": 1, totalQuantity: -1 } },
    { $group: {
        _id: "$_id.categoryId",
        categoryName: { $first: "$categoryName" },
        topProducts: { $push: {
            productName: "$productName",
            totalQuantity: "$totalQuantity",
            totalRevenue: "$totalRevenue"
        }}
    }},
    { $project: {
        categoryName: 1,
        topProducts: { $slice: ["$topProducts", 3] },
        _id: 0
    }}
]).forEach(printjson);

print("\n✅ Solution 2: Monthly sales growth rate");
db.orders.aggregate([
    { $match: { year: { $in: [2022, 2023] } } },
    { $group: {
        _id: { year: "$year", month: "$month" },
        totalSales: { $sum: "$finalAmount" }
    }},
    { $sort: { "_id.year": 1, "_id.month": 1 } },
    { $setWindowFields: {
        sortBy: { "_id.year": 1, "_id.month": 1 },
        output: {
            previousMonthSales: { $shift: { output: "$totalSales", by: -1 } }
        }
    }},
    { $addFields: {
        growthRate: {
            $cond: {
                if: { $ne: ["$previousMonthSales", null] },
                then: { $multiply: [{ $divide: [{ $subtract: ["$totalSales", "$previousMonthSales"] }, "$previousMonthSales"] }, 100] },
                else: null
            }
        }
    }},
    { $project: {
        year: "$_id.year",
        month: "$_id.month", 
        totalSales: { $round: ["$totalSales", 2] },
        growthRate: { $round: ["$growthRate", 2] },
        _id: 0
    }}
]).forEach(printjson);

print("\n✅ Solution 3: Inactive customers (3+ months)");
const threeMonthsAgo = new Date();
threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3);

db.orders.aggregate([
    { $group: {
        _id: "$userId",
        lastOrderDate: { $max: "$orderDate" },
        totalOrders: { $sum: 1 },
        totalSpent: { $sum: "$finalAmount" }
    }},
    { $match: { lastOrderDate: { $lt: threeMonthsAgo } } },
    { $lookup: {
        from: "users",
        localField: "_id",
        foreignField: "_id", 
        as: "userInfo"
    }},
    { $project: {
        customerName: { $arrayElemAt: ["$userInfo.fullName", 0] },
        customerEmail: { $arrayElemAt: ["$userInfo.email", 0] },
        lastOrderDate: 1,
        totalOrders: 1,
        totalSpent: { $round: ["$totalSpent", 2] },
        daysSinceLastOrder: { $round: [{ $divide: [{ $subtract: [new Date(), "$lastOrderDate"] }, 1000 * 60 * 60 * 24] }] },
        _id: 0
    }},
    { $sort: { daysSinceLastOrder: -1 } },
    { $limit: 10 }
]).forEach(printjson);

print("\n✅ Solution 4: Average order value by region");
db.orders.aggregate([
    { $group: {
        _id: "$region",
        avgOrderValue: { $avg: "$finalAmount" },
        totalOrders: { $sum: 1 },
        totalRevenue: { $sum: "$finalAmount" }
    }},
    { $project: {
        region: "$_id",
        avgOrderValue: { $round: ["$avgOrderValue", 2] },
        totalOrders: 1,
        totalRevenue: { $round: ["$totalRevenue", 2] },
        _id: 0
    }},
    { $sort: { avgOrderValue: -1 } }
]).forEach(printjson);

use hr_db;

print("\n✅ Solution 5: Employees earning above department average");
db.employees.aggregate([
    { $lookup: {
        from: "departments",
        localField: "departmentId",
        foreignField: "_id",
        as: "deptInfo"
    }},
    { $group: {
        _id: "$departmentId",
        deptName: { $first: { $arrayElemAt: ["$deptInfo.name", 0] } },
        avgDeptSalary: { $avg: "$salary" },
        employees: { $push: {
            name: "$name",
            salary: "$salary",
            position: "$position"
        }}
    }},
    { $unwind: "$employees" },
    { $match: { $expr: { $gt: ["$employees.salary", "$avgDeptSalary"] } } },
    { $project: {
        department: "$deptName",
        employeeName: "$employees.name",
        position: "$employees.position",
        salary: "$employees.salary",
        deptAvgSalary: { $round: ["$avgDeptSalary", 2] },
        salaryDifference: { $round: [{ $subtract: ["$employees.salary", "$avgDeptSalary"] }, 2] },
        _id: 0
    }},
    { $sort: { salaryDifference: -1 } },
    { $limit: 15 }
]).forEach(printjson);

print("\n🎓 Additional exercises for students:");
print("6. Calculate most used payment methods by age group");
print("7. Find products with conflicting reviews (high variance)");
print("8. Calculate employee retention rate by department");
print("9. Find peak sales hours during the day");
print("10. Calculate customer retention rate monthly");

print("\n💡 Tips for solving:");
print("• Use $lookup to join collections");
print("• Use $unwind to deconstruct arrays");  
print("• Use $addFields for new calculations");
print("• Use $setWindowFields for time-based comparisons");
print("• Use $group with various statistical operations");
EOF

    print_message $GREEN "✅ Aggregation examples and exercises created"
}

# Function to show connection info and usage
show_info() {
    print_message $GREEN "\n🎉 === MongoDB Aggregation Pipeline Course Setup Complete! ==="
    echo ""
    print_message $BLUE "📊 Generated Data Statistics:"
    print_message $YELLOW "  🏪 E-commerce Database:"
    print_message $YELLOW "     • 50,000 users"
    print_message $YELLOW "     • 25,000 products"
    print_message $YELLOW "     • 100,000 orders"
    print_message $YELLOW "     • 25,000 reviews"
    print_message $YELLOW "     • 8 categories"
    echo ""
    print_message $YELLOW "  👨‍💼 HR Database:"
    print_message $YELLOW "     • 5,000 employees"
    print_message $YELLOW "     • 5 departments"
    print_message $YELLOW "     • 100 projects"
    print_message $YELLOW "     • 60,000 monthly salaries"
    echo ""
    print_message $YELLOW "  💳 Financial Database:"
    print_message $YELLOW "     • 10,000 accounts"
    print_message $YELLOW "     • 200,000 transactions"
    print_message $YELLOW "     • 5 branches"
    echo ""
    print_message $BLUE "🔗 Connection Information:"
    print_message $YELLOW "  • Container: $CONTAINER_NAME"
    print_message $YELLOW "  • Port: $PORT"
    print_message $YELLOW "  • Direct connection: localhost:$PORT"
    echo ""
    print_message $BLUE "🚀 Getting Started:"
    print_message $GREEN "  # Connect to MongoDB"
    print_message $YELLOW "  docker exec -it $CONTAINER_NAME mongosh"
    echo ""
    print_message $GREEN "  # Run basic examples"
    print_message $YELLOW "  docker exec -i $CONTAINER_NAME mongosh < aggregation_examples.js"
    echo ""
    print_message $GREEN "  # Run advanced exercises"
    print_message $YELLOW "  docker exec -i $CONTAINER_NAME mongosh < advanced_aggregation_exercises.js"
    echo ""
    print_message $BLUE "📚 Available Databases:"
    print_message $YELLOW "  • ecommerce_db - E-commerce data"
    print_message $YELLOW "  • hr_db - Human Resources data"
    print_message $YELLOW "  • finance_db - Financial data"
    echo ""
    print_message $PURPLE "🎯 Course Content:"
    print_message $YELLOW "  📊 Basic Pipeline: match, group, sort, limit"
    print_message $YELLOW "  🔗 Joining: lookup, unwind"
    print_message $YELLOW "  📈 Analysis: addFields, project"
    print_message $YELLOW "  🧮 Advanced: setWindowFields, switch, facet"
    print_message $YELLOW "  📋 Practical exercises with comprehensive solutions"
    echo ""
    print_message $BLUE "📝 Files Created:"
    print_message $YELLOW "  • aggregation_examples.js - Basic to intermediate examples"
    print_message $YELLOW "  • advanced_aggregation_exercises.js - Advanced exercises with solutions"
    echo ""
    print_message $GREEN "✨ Course is ready for training! Happy learning! ✨"
}

# Main execution
main() {
    print_message $BLUE "🚀 Starting MongoDB Aggregation Pipeline Course setup..."
    
    check_docker
    setup_mongodb
    setup_ecommerce_data
    setup_hr_data
    setup_financial_data
    create_aggregation_examples
    show_info
}

# Run main function
main