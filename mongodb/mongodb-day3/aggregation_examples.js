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
