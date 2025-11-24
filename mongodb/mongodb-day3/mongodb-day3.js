// Question 1
// use ecommerce_db
ecommerce_db >
  db.users.aggregate([
    { $match: { isActive: true } },
    { $count: "totalActiveUsers" },
  ]);
[{ totalActiveUsers: 44984 }];

// Question 2

db.orders.aggregate([
  {
    $group: {
      _id: "$status",
      totalRevenue: { $sum: "$amount" },
    },
  },
  {
    $project: {
      _id: 0,
      status: "$_id",
      totalRevenue: 1,
    },
  },
  {
    $sort: { totalRevenue: -1 },
  },
])[
  ({ totalRevenue: 0, status: "delivered" },
  { totalRevenue: 0, status: "cancelled" },
  { totalRevenue: 0, status: "shipped" },
  { totalRevenue: 0, status: "confirmed" },
  { totalRevenue: 0, status: "pending" })
];

// Question 3
db.products.aggregate([
  { $match: { isAvailable: true } },
  { $sort: { price: -1 } },
  { $limit: 5 },
  { $project: { name: 1, price: 1, categoryId: 1, _id: 0 } },
]);
[
  { name: "LED Lamp Model S366", categoryId: 3, price: 5049 },
  { name: "English Dictionary Model E845", categoryId: 5, price: 5049 },
  { name: "Engine Oil Model L459", categoryId: 6, price: 5049 },
  { name: "Windshield Wipers Model T413", categoryId: 6, price: 5048 },
  { name: "Building Blocks Model N392", categoryId: 8, price: 5048 },
];
// Question 4
db.employees.aggregate([
  {
    $group: {
      _id: "$departmentId",
      avgSalary: { $avg: "$salary" },
      employeeCount: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "departments",
      localField: "_id",
      foreignField: "_id",
      as: "departmentInfo",
    },
  },
  { $unwind: "$departmentInfo" },
  {
    $project: {
      _id: 0,
      departmentName: "$departmentInfo.name",
      avgSalary: 1,
      employeeCount: 1,
    },
  },
]);
[
  {
    avgSalary: 54937.84994861254,
    employeeCount: 973,
    departmentName: "Sales",
  },
  {
    avgSalary: 55086.24615384615,
    employeeCount: 975,
    departmentName: "Marketing",
  },
  {
    avgSalary: 55406.14353612167,
    employeeCount: 1052,
    departmentName: "Information Technology",
  },
  {
    avgSalary: 54450.94783464567,
    employeeCount: 1016,
    departmentName: "Human Resources",
  },
  {
    avgSalary: 55399.57418699187,
    employeeCount: 984,
    departmentName: "Finance",
  },
];
// Question 5
// use ecommerce_db
db.products.aggregate([
  {
    $group: {
      _id: "$categoryId",
      productCount: { $sum: 1 },
    },
  },
  {
    $lookup: {
      from: "categories",
      localField: "_id",
      foreignField: "_id",
      as: "categoryInfo",
    },
  },
  { $unwind: "$categoryInfo" },
  {
    $project: {
      _id: 0,
      categoryName: "$categoryInfo.name",
      productCount: 1,
    },
  },
  { $sort: { productCount: -1 } },
]);
[
  { productCount: 3223, categoryName: "Beauty" },
  { productCount: 3183, categoryName: "Automotive" },
  { productCount: 3147, categoryName: "Sports" },
  { productCount: 3140, categoryName: "Books" },
  { productCount: 3107, categoryName: "Clothing" },
  { productCount: 3106, categoryName: "Home & Garden" },
  { productCount: 3056, categoryName: "Toys" },
  { productCount: 3038, categoryName: "Electronics" },
];
// Question 6
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalOrders: { $sum: 1 },
      totalSpent: { $sum: "$totalAmount" },
      avgOrderValue: { $avg: "$totalAmount" },
    },
  },

  {
    $match: {
      totalOrders: { $gte: 3 },
    },
  },
  {
    $lookup: {
      from: "users",
      localField: "_id",
      foreignField: "_id",
      as: "customerInfo",
    },
  },

  {
    $unwind: "$customerInfo",
  },

  {
    $project: {
      _id: 0,
      customerName: "$customerInfo.fullName",
      totalOrders: 1,
      totalSpent: 1,
      avgOrderValue: 1,
    },
  },
]);

[
  {
    totalOrders: 3,
    totalSpent: 26177,
    avgOrderValue: 8725.666666666666,
    customerName: "Fatma Abdullah",
  },
  {
    totalOrders: 3,
    totalSpent: 23192,
    avgOrderValue: 7730.666666666667,
    customerName: "Fatma Mohamed",
  },
  {
    totalOrders: 3,
    totalSpent: 15693,
    avgOrderValue: 5231,
    customerName: "Hassan Abdullah",
  },
  {
    totalOrders: 3,
    totalSpent: 21783,
    avgOrderValue: 7261,
    customerName: "Ali Elsayed",
  },
  {
    totalOrders: 5,
    totalSpent: 28576,
    avgOrderValue: 5715.2,
    customerName: "Mohamed Abdullah",
  },
  {
    totalOrders: 3,
    totalSpent: 31450,
    avgOrderValue: 10483.333333333334,
    customerName: "Mariam Abdullah",
  },
  {
    totalOrders: 4,
    totalSpent: 20800,
    avgOrderValue: 5200,
    customerName: "Omar Elsayed",
  },
  {
    totalOrders: 3,
    totalSpent: 12835,
    avgOrderValue: 4278.333333333333,
    customerName: "Ali Ali",
  },
  {
    totalOrders: 4,
    totalSpent: 27383,
    avgOrderValue: 6845.75,
    customerName: "Aisha Abdullah",
  },
  {
    totalOrders: 3,
    totalSpent: 13823,
    avgOrderValue: 4607.666666666667,
    customerName: "Fatma Ali",
  },
  {
    totalOrders: 3,
    totalSpent: 26035,
    avgOrderValue: 8678.333333333334,
    customerName: "Zeinab Ahmed",
  },
  {
    totalOrders: 3,
    totalSpent: 31057,
    avgOrderValue: 10352.333333333334,
    customerName: "Mohamed Abdullah",
  },
  {
    totalOrders: 4,
    totalSpent: 28575,
    avgOrderValue: 7143.75,
    customerName: "Abdullah Ali",
  },
  {
    totalOrders: 3,
    totalSpent: 19985,
    avgOrderValue: 6661.666666666667,
    customerName: "Mariam Elsayed",
  },
  {
    totalOrders: 4,
    totalSpent: 19037,
    avgOrderValue: 4759.25,
    customerName: "Omar Abdelrahman",
  },
  {
    totalOrders: 3,
    totalSpent: 12223,
    avgOrderValue: 4074.3333333333335,
    customerName: "Fatma Ibrahim",
  },
  {
    totalOrders: 3,
    totalSpent: 14528,
    avgOrderValue: 4842.666666666667,
    customerName: "Mariam Ali",
  },
  {
    totalOrders: 4,
    totalSpent: 24827,
    avgOrderValue: 6206.75,
    customerName: "Fatma Abdelrahman",
  },
  {
    totalOrders: 3,
    totalSpent: 23475,
    avgOrderValue: 7825,
    customerName: "Mohamed Mohamed",
  },
  {
    totalOrders: 4,
    totalSpent: 20762,
    avgOrderValue: 5190.5,
    customerName: "Mariam Abdelrahman",
  },
];
// Question 7
db.orders.aggregate([
  {
    $match: {
      orderDate: {
        $gte: new Date("2023-01-01T00:00:00Z"),
        $lt: new Date("2024-01-01T00:00:00Z"),
      },
    },
  },
  {
    $group: {
      _id: { $month: "$orderDate" },
      totalRevenue: { $sum: "$totalPrice" },
      orderCount: { $sum: 1 },
    },
  },
  { $sort: { _id: 1 } },
  {
    $project: {
      month: "$_id",
      totalRevenue: 1,
      orderCount: 1,
      _id: 0,
    },
  },
]);

[
  { totalRevenue: 0, orderCount: 1678, month: 1 },
  { totalRevenue: 0, orderCount: 1667, month: 2 },
  { totalRevenue: 0, orderCount: 1661, month: 3 },
  { totalRevenue: 0, orderCount: 1697, month: 4 },
  { totalRevenue: 0, orderCount: 1682, month: 5 },
  { totalRevenue: 0, orderCount: 1622, month: 6 },
  { totalRevenue: 0, orderCount: 1739, month: 7 },
  { totalRevenue: 0, orderCount: 1681, month: 8 },
  { totalRevenue: 0, orderCount: 1667, month: 9 },
  { totalRevenue: 0, orderCount: 1653, month: 10 },
  { totalRevenue: 0, orderCount: 1666, month: 11 },
  { totalRevenue: 0, orderCount: 1588, month: 12 },
];

// Question 8
db.orders.aggregate([
  {
    $unwind: "$items",
  },

  {
    $group: {
      _id: "$items.productId",
      totalQuantity: { $sum: "$items.quantity" },
      totalRevenue: { $sum: "$items.total" },
    },
  },

  {
    $match: {
      totalRevenue: { $gt: 1000 },
    },
  },

  {
    $lookup: {
      from: "products",
      localField: "_id",
      foreignField: "_id",
      as: "productInfo",
    },
  },

  {
    $unwind: "$productInfo",
  },

  {
    $lookup: {
      from: "categories",
      localField: "productInfo.categoryId",
      foreignField: "_id",
      as: "categoryInfo",
    },
  },

  {
    $unwind: "$categoryInfo",
  },

  {
    $project: {
      _id: 0,
      productName: "$productInfo.name",
      categoryName: "$categoryInfo.name",
      totalQuantity: 1,
      totalRevenue: 1,
    },
  },
]);

[
  {
    totalQuantity: 28,
    totalRevenue: 26039,
    productName: "Face Mask Model T834",
    categoryName: "Beauty",
  },
  {
    totalQuantity: 20,
    totalRevenue: 11893,
    productName: "Building Blocks Model D426",
    categoryName: "Toys",
  },
  {
    totalQuantity: 32,
    totalRevenue: 33111,
    productName: "Office Chair Model D966",
    categoryName: "Home & Garden",
  },
  {
    totalQuantity: 12,
    totalRevenue: 16069,
    productName: "Novel Book Model D484",
    categoryName: "Books",
  },
  {
    totalQuantity: 28,
    totalRevenue: 26119,
    productName: "Sports Bag Model U199",
    categoryName: "Sports",
  },
  {
    totalQuantity: 21,
    totalRevenue: 23688,
    productName: "Persian Carpet Model O376",
    categoryName: "Home & Garden",
  },
  {
    totalQuantity: 32,
    totalRevenue: 30457,
    productName: "Samsung Phone Model C83",
    categoryName: "Electronics",
  },
  {
    totalQuantity: 41,
    totalRevenue: 45728,
    productName: "Tennis Racket Model Q25",
    categoryName: "Sports",
  },
  {
    totalQuantity: 30,
    totalRevenue: 34334,
    productName: "Cotton Curtains Model K572",
    categoryName: "Home & Garden",
  },
  {
    totalQuantity: 34,
    totalRevenue: 37678,
    productName: "Cookbook Model D634",
    categoryName: "Books",
  },
  {
    totalQuantity: 38,
    totalRevenue: 38659,
    productName: "Natural Shampoo Model I771",
    categoryName: "Beauty",
  },
  {
    totalQuantity: 21,
    totalRevenue: 22945,
    productName: "Winter Jacket Model R357",
    categoryName: "Clothing",
  },
  {
    totalQuantity: 26,
    totalRevenue: 20233,
    productName: "Science Magazine Model N621",
    categoryName: "Books",
  },
  {
    totalQuantity: 42,
    totalRevenue: 35033,
    productName: "Natural Shampoo Model O270",
    categoryName: "Beauty",
  },
  {
    totalQuantity: 26,
    totalRevenue: 30215,
    productName: "Cookbook Model D59",
    categoryName: "Books",
  },
  {
    totalQuantity: 25,
    totalRevenue: 32584,
    productName: "Barbie Doll Model U670",
    categoryName: "Toys",
  },
  {
    totalQuantity: 18,
    totalRevenue: 20721,
    productName: "Air Filter Model W78",
    categoryName: "Automotive",
  },
  {
    totalQuantity: 25,
    totalRevenue: 25477,
    productName: "Colored Ball Model C719",
    categoryName: "Toys",
  },
  {
    totalQuantity: 31,
    totalRevenue: 32430,
    productName: "Sports Bag Model A168",
    categoryName: "Sports",
  },
  {
    totalQuantity: 26,
    totalRevenue: 28898,
    productName: "LG Monitor Model J11",
    categoryName: "Electronics",
  },
];

// Question 9
// use finance_db
db.transactions.aggregate([
  {
    $lookup: {
      from: "accounts",
      localField: "accountId",
      foreignField: "_id",
      as: "accountInfo",
    },
  },

  {
    $unwind: "$accountInfo",
  },

  {
    $lookup: {
      from: "branches",
      localField: "accountInfo.branchId",
      foreignField: "_id",
      as: "branchInfo",
    },
  },

  {
    $unwind: "$branchInfo",
  },

  {
    $group: {
      _id: "$branchInfo.name",
      transactionCount: { $sum: 1 },
      totalVolume: { $sum: "$amount" },
      avgAmount: { $avg: "$amount" },
    },
  },

  {
    $project: {
      _id: 0,
      branchName: "$_id",
      transactionCount: 1,
      totalVolume: 1,
      avgAmount: 1,
    },
  },
]);

[
  {
    transactionCount: 39282,
    totalVolume: 988999616,
    avgAmount: 25176.916042971334,
    branchName: "Mansoura Branch",
  },
  {
    transactionCount: 39930,
    totalVolume: 1004086923,
    avgAmount: 25146.178888054095,
    branchName: "Giza Branch",
  },
  {
    transactionCount: 42365,
    totalVolume: 1059841503,
    avgAmount: 25016.912616546677,
    branchName: "Assiut Branch",
  },
  {
    transactionCount: 37784,
    totalVolume: 947193567,
    avgAmount: 25068.64193838662,
    branchName: "Alexandria Branch",
  },
  {
    transactionCount: 40639,
    totalVolume: 1024539307,
    avgAmount: 25210.741086148773,
    branchName: "Cairo Main Branch",
  },
];
// Question 10
//  use ecommerce_db
db.orders.aggregate([
  {
    $group: {
      _id: "$userId",
      totalSpent: { $sum: "$totalAmount" },
    },
  },

  {
    $bucket: {
      groupBy: "$totalSpent",
      boundaries: [0, 500, 2000, 5000, Infinity],
      default: "VIP",
      output: {
        customerCount: { $sum: 1 },
      },
    },
  },

  {
    $project: {
      _id: 0,
      customerSegment: "$_id",
      customerCount: 1,
    },
  },
]);

[
  { customerCount: 292, customerSegment: 0 },
  { customerCount: 1758, customerSegment: 500 },
  { customerCount: 4392, customerSegment: 2000 },
  { customerCount: 36848, customerSegment: 5000 }
]
// Question 11
// use hr_db

[
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 14',
    departmentName: 'Information Technology',
    salary: 65060,
    salaryDifference: 9653.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 20',
    departmentName: 'Information Technology',
    salary: 62520,
    salaryDifference: 7113.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 21',
    departmentName: 'Information Technology',
    salary: 61278,
    salaryDifference: 5871.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 27',
    departmentName: 'Information Technology',
    salary: 79681,
    salaryDifference: 24274.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 33',
    departmentName: 'Information Technology',
    salary: 75272,
    salaryDifference: 19865.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 52',
    departmentName: 'Information Technology',
    salary: 70639,
    salaryDifference: 15232.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 53',
    departmentName: 'Information Technology',
    salary: 78154,
    salaryDifference: 22747.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 54',
    departmentName: 'Information Technology',
    salary: 63973,
    salaryDifference: 8566.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 61',
    departmentName: 'Information Technology',
    salary: 59063,
    salaryDifference: 3656.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 75',
    departmentName: 'Information Technology',
    salary: 76043,
    salaryDifference: 20636.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 93',
    departmentName: 'Information Technology',
    salary: 66552,
    salaryDifference: 11145.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 98',
    departmentName: 'Information Technology',
    salary: 55495,
    salaryDifference: 88.85646387832821
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 117',
    departmentName: 'Information Technology',
    salary: 74150,
    salaryDifference: 18743.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 121',
    departmentName: 'Information Technology',
    salary: 67884,
    salaryDifference: 12477.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 127',
    departmentName: 'Information Technology',
    salary: 76243,
    salaryDifference: 20836.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 129',
    departmentName: 'Information Technology',
    salary: 72543,
    salaryDifference: 17136.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 130',
    departmentName: 'Information Technology',
    salary: 79767,
    salaryDifference: 24360.85646387833
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 147',
    departmentName: 'Information Technology',
    salary: 56194,
    salaryDifference: 787.8564638783282
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 150',
    departmentName: 'Information Technology',
    salary: 70902,
    salaryDifference: 15495.856463878328
  },
  {
    deptAvgSalary: 55406.14353612167,
    employeeName: 'Employee 153',
    departmentName: 'Information Technology',
    salary: 76319,
    salaryDifference: 20912.85646387833
  }
]