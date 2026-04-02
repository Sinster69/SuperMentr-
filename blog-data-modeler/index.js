const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb://testuser:test123@ac-4828zwr-shard-00-00.tq2xaoj.mongodb.net:27017,ac-4828zwr-shard-00-01.tq2xaoj.mongodb.net:27017,ac-4828zwr-shard-00-02.tq2xaoj.mongodb.net:27017/blogDB?ssl=true&replicaSet=atlas-mutfgo-shard-0&authSource=admin&retryWrites=true&w=majority")
  .then(async () => {
    console.log("✅ MongoDB Connected");

    // Insert sample user
    await User.create({
      username: "pranav",
      email: "pranav@test.com",
      password: "1234"
    });

    console.log("✅ Sample data inserted");

    process.exit();
  })
  .catch(err => console.log(err));