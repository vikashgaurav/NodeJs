const mongoose = require('mongoose');
const conn = mongoose.createConnection("mongodb://localhost:27017/testDb");;
exports.mongoose = mongoose;
exports.conn = conn;