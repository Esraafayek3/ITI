#!/bin/bash
# mongodb_index_demo.sh - Script to create 1M records for MongoDB indexing demonstration

echo "=== MongoDB Index Performance Demo Setup ==="

# Configuration
TOTAL_RECORDS=1000000
BATCH_SIZE=10000
CONTAINER_NAME="mongodb-course"
DATABASE_NAME="index_demo_db"

# Function to check if Docker container is running
check_container() {
    if ! docker ps | grep -q "$CONTAINER_NAME"; then
        echo "Error: MongoDB container '$CONTAINER_NAME' is not running."
        echo "Please start the container first or update CONTAINER_NAME variable."
        exit 1
    fi
    echo "✓ MongoDB container '$CONTAINER_NAME' is running"
}

# Function to test MongoDB connection within container
test_connection() {
    echo "Testing MongoDB connection..."
    if docker exec "$CONTAINER_NAME" mongosh --eval "db.adminCommand('ping')" > /dev/null 2>&1; then
        echo "✓ Successfully connected to MongoDB"
    else
        echo "✗ Failed to connect to MongoDB"
        exit 1
    fi
}

# Function to create user profiles collection (1M records)
create_user_profiles() {
    echo "Creating user profiles collection with $TOTAL_RECORDS records..."
    echo "This will take several minutes - please be patient..."
    
    local start_time=$(date +%s)
    
    docker exec -i "$CONTAINER_NAME" mongosh <<EOF
use $DATABASE_NAME

// Clear existing data
db.user_profiles.deleteMany({})

// Arrays for generating realistic data
const firstNames = ['Ahmed', 'Mohamed', 'Fatma', 'Aisha', 'Omar', 'Ali', 'Sara', 'Nour', 'Khaled', 'Layla', 'Hassan', 'Mariam', 'Youssef', 'Hala', 'Mostafa', 'Dina', 'Amr', 'Rana', 'Mahmoud', 'Yasmin', 'Ibrahim', 'Mona', 'Tarek', 'Reem', 'Adel']
const lastNames = ['Mohamed', 'Ahmed', 'Ali', 'Hassan', 'Ibrahim', 'Mahmoud', 'Salem', 'Farouk', 'Nasser', 'Rashid', 'Mansour', 'Khalil', 'Saeed', 'Gaber', 'Helmy', 'Fouad', 'Zaki', 'Hafez', 'Shehab', 'Kamal']
const cities = ['Cairo', 'Alexandria', 'Giza', 'Shubra El Kheima', 'Port Said', 'Suez', 'Luxor', 'Mansoura', 'El Mahalla El Kubra', 'Tanta', 'Asyut', 'Ismailia', 'Fayyum', 'Zagazig', 'Aswan', 'Damietta', 'Damanhur', 'Minya', 'Beni Suef', 'Qena']
const departments = ['Engineering', 'Medicine', 'Business', 'Arts', 'Science', 'Law', 'Education', 'Agriculture', 'Pharmacy', 'Dentistry']
const companies = ['Vodafone Egypt', 'Orange Egypt', 'CIB Bank', 'NBE', 'ALEXBANK', 'Banque Misr', 'Fawry', 'Swvl', 'Vezeeta', 'Careem', 'Uber Egypt', 'Jumia Egypt', 'Amazon Egypt', 'Google Egypt', 'Microsoft Egypt', 'IBM Egypt', 'Oracle Egypt', 'SAP Egypt', 'Accenture', 'Deloitte Egypt']
const jobTitles = ['Software Engineer', 'Data Analyst', 'Project Manager', 'Marketing Specialist', 'Sales Representative', 'HR Specialist', 'Financial Analyst', 'Operations Manager', 'Product Manager', 'DevOps Engineer', 'UX Designer', 'Business Analyst', 'Quality Assurance', 'System Administrator', 'Database Administrator']

const batchSize = $BATCH_SIZE
const totalRecords = $TOTAL_RECORDS
let insertedCount = 0

print("Starting bulk insertion...")

while (insertedCount < totalRecords) {
    const batch = []
    const currentBatchSize = Math.min(batchSize, totalRecords - insertedCount)
    
    for (let i = 0; i < currentBatchSize; i++) {
        const userId = insertedCount + i + 1
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)]
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)]
        const birthYear = 1970 + Math.floor(Math.random() * 35) // Ages 18-53
        const registrationYear = 2015 + Math.floor(Math.random() * 9) // 2015-2023
        const salary = 5000 + Math.floor(Math.random() * 45000) // 5K-50K EGP
        
        batch.push({
            userId: userId,
            username: "user" + String(userId).padStart(7, '0'),
            email: firstName.toLowerCase() + "." + lastName.toLowerCase() + userId + "@email.com",
            firstName: firstName,
            lastName: lastName,
            fullName: firstName + " " + lastName,
            age: new Date().getFullYear() - birthYear,
            dateOfBirth: new Date(birthYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            city: cities[Math.floor(Math.random() * cities.length)],
            phoneNumber: "+2010" + String(Math.floor(Math.random() * 90000000) + 10000000),
            registrationDate: new Date(registrationYear, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            lastLoginDate: new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
            isActive: Math.random() > 0.15, // 85% active users
            accountType: Math.random() > 0.3 ? "premium" : "basic", // 70% premium
            department: departments[Math.floor(Math.random() * departments.length)],
            company: companies[Math.floor(Math.random() * companies.length)],
            jobTitle: jobTitles[Math.floor(Math.random() * jobTitles.length)],
            salary: salary,
            score: Math.floor(Math.random() * 1000), // 0-999 score for ranking
            preferences: {
                language: Math.random() > 0.3 ? "Arabic" : "English",
                notifications: Math.random() > 0.2,
                newsletter: Math.random() > 0.4
            },
            metadata: {
                ipAddress: "192.168." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255),
                userAgent: "Mozilla/5.0 (compatible; Demo/1.0)",
                referralSource: ["Google", "Facebook", "Direct", "Email", "Advertisement"][Math.floor(Math.random() * 5)],
                deviceType: ["Desktop", "Mobile", "Tablet"][Math.floor(Math.random() * 3)]
            }
        })
    }
    
    // Insert batch
    db.user_profiles.insertMany(batch, { ordered: false })
    insertedCount += currentBatchSize
    
    // Progress update every 50K records
    if (insertedCount % 50000 === 0 || insertedCount === totalRecords) {
        print("Inserted " + insertedCount + " / " + totalRecords + " records (" + Math.round((insertedCount/totalRecords)*100) + "%)")
    }
}

print("✓ Successfully created " + db.user_profiles.countDocuments() + " user profiles")
EOF

    local end_time=$(date +%s)
    local duration=$((end_time - start_time))
    echo "Data insertion completed in $duration seconds"
}

# Function to create transaction logs collection (additional 500K records)
create_transaction_logs() {
    echo "Creating transaction logs collection with 500,000 records..."
    
    docker exec -i "$CONTAINER_NAME" mongosh <<EOF
use $DATABASE_NAME

// Clear existing transaction data
db.transaction_logs.deleteMany({})

const transactionTypes = ['login', 'logout', 'purchase', 'view_profile', 'update_profile', 'search', 'download', 'upload', 'payment', 'refund']
const statusTypes = ['success', 'failed', 'pending', 'cancelled']
const batchSize = 5000
const totalTransactions = 500000
let insertedCount = 0

print("Creating transaction logs...")

while (insertedCount < totalTransactions) {
    const batch = []
    const currentBatchSize = Math.min(batchSize, totalTransactions - insertedCount)
    
    for (let i = 0; i < currentBatchSize; i++) {
        const transactionId = insertedCount + i + 1
        const userId = Math.floor(Math.random() * $TOTAL_RECORDS) + 1 // Reference to user_profiles
        const transactionDate = new Date(2023, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1, Math.floor(Math.random() * 24), Math.floor(Math.random() * 60))
        
        batch.push({
            transactionId: "TXN" + String(transactionId).padStart(8, '0'),
            userId: userId,
            transactionType: transactionTypes[Math.floor(Math.random() * transactionTypes.length)],
            status: statusTypes[Math.floor(Math.random() * statusTypes.length)],
            amount: Math.random() > 0.7 ? Math.floor(Math.random() * 1000) + 10 : 0, // 30% have amounts
            timestamp: transactionDate,
            duration: Math.floor(Math.random() * 300) + 1, // 1-300 seconds
            ipAddress: "10.0." + Math.floor(Math.random() * 255) + "." + Math.floor(Math.random() * 255),
            sessionId: "sess_" + Math.random().toString(36).substring(2, 15),
            year: transactionDate.getFullYear(),
            month: transactionDate.getMonth() + 1,
            day: transactionDate.getDate(),
            hour: transactionDate.getHours()
        })
    }
    
    db.transaction_logs.insertMany(batch, { ordered: false })
    insertedCount += currentBatchSize
    
    if (insertedCount % 25000 === 0 || insertedCount === totalTransactions) {
        print("Inserted " + insertedCount + " / " + totalTransactions + " transactions (" + Math.round((insertedCount/totalTransactions)*100) + "%)")
    }
}

print("✓ Successfully created " + db.transaction_logs.countDocuments() + " transaction logs")
EOF
}

# Function to show progress and statistics
show_statistics() {
    echo "Generating database statistics..."
    
    docker exec -i "$CONTAINER_NAME" mongosh <<EOF
use $DATABASE_NAME

print("=== DATABASE STATISTICS ===")
print("Database: " + db.getName())
print("")

print("Collections:")
db.getCollectionNames().forEach(function(collection) {
    const count = db.getCollection(collection).countDocuments()
    const stats = db.getCollection(collection).stats()
    const sizeMB = Math.round(stats.size/1024/1024)
    const avgSize = Math.round(stats.avgObjSize)
    print("- " + collection + ": " + count + " documents (" + sizeMB + " MB, avg " + avgSize + " bytes/doc)")
})

print("")
const dbStats = db.stats()
print("Total Database Size: " + Math.round(dbStats.dataSize/1024/1024) + " MB")
print("Storage Size: " + Math.round(dbStats.storageSize/1024/1024) + " MB")
print("Total Indexes Size: " + Math.round(dbStats.indexSize/1024/1024) + " MB")
print("")

print("Sample Documents:")
print("User Profile:")
printjson(db.user_profiles.findOne())
print("")
print("Transaction Log:")
printjson(db.transaction_logs.findOne())
EOF
}

# Main execution function
main() {
    local start_time=$(date +%s)
    
    echo "Starting MongoDB Index Performance Demo Setup..."
    echo "Target: $TOTAL_RECORDS user profiles + 500K transaction logs"
    echo "Container: $CONTAINER_NAME"
    echo "Database: $DATABASE_NAME"
    echo ""
    
    check_container
    test_connection
    create_user_profiles
    create_transaction_logs
    show_statistics
    
    local end_time=$(date +%s)
    local total_duration=$((end_time - start_time))
    local minutes=$((total_duration / 60))
    local seconds=$((total_duration % 60))
    
    echo ""
    echo "=== SETUP COMPLETE ==="
    echo "Total execution time: ${minutes}m ${seconds}s"
    echo ""
    echo "Database created: $DATABASE_NAME"
    echo "Collections:"
    echo "- user_profiles: ~1,000,000 documents"
    echo "- transaction_logs: ~500,000 documents"
    echo ""
    echo "To connect to the database:"
    echo "docker exec -it $CONTAINER_NAME mongosh"
    echo "use $DATABASE_NAME"
    echo ""
    echo "Ready for indexing demonstration!"
}

# Run the main function
main "$@"