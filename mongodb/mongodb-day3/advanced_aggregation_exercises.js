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
