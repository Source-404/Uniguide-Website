const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
const chalk = require("chalk");

const connectionURL = "mongodb://127.0.0.1:27017";
const databaseName = "task-manager";

MongoClient.connect(
  connectionURL,
  { useNewUrlParser: true },
  (error, client) => {
    if (error) {
      return console.log("unable to connect");
    }
    const db = client.db(databaseName);
    console.log(chalk.green.bold("Connection Successful"));

    // db.collection("users")
    //   .deleteMany({
    //     age: 19,
    //   })
    //   .then((result) => {
    //     console.log(result);
    //   })
    //   .catch((error) => {
    //     console.log(error);
    //   });

    db.collection("tasks")
      .deleteOne({
        description: "Take meds",
      })
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);

//create

// db.collection("users").insertOne(
//   {
//     name: "Source",
//     age: 19,
//   },
//   (error, result) => {
//     if (error) {
//       return console.log(chalk.red("Error inserting data"));
//     }
//     console.log(result.ops);
//   }
// );

// db.collection("users").insertMany(
//   [
//     {
//       name: "jen",
//       age: 28,
//     },
//     {
//       name: "Gun",
//       age: 27,
//     },
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log(chalk.red("Error inserting data"));
//     }
//     console.log(result.ops);
//   }
// );

// db.collection("tasks").insertMany(
//   [
//     {
//       description: "Take meds",
//       completed: true,
//     },
//     {
//       description: "Download Songs",
//       completed: false,
//     },
//     {
//       description: "Go running",
//       completed: false,
//     },
//   ],
//   (error, result) => {
//     if (error) {
//       return console.log(chalk.red("Error inserting data"));
//     }
//     console.log(result.ops);
//   }
// );

// Read / find

// db.collection("tasks").findOne(
//   { _id: new mongodb.ObjectID("6072358ca45bca105c57723d") },
//   (error, user) => {
//     if (error) {
//       return console.log("Unable to fetch");
//     }
//     console.log(user);
//   }
// );

// db.collection("tasks")
//   .find({ completed: false })
//   .toArray((error, task) => {
//     console.log(task);
//   });

// update

// db.collection("users").updateOne(
//   {
//     _id: new mongodb.ObjectID("60725ee8b0411e3fe4af3f18"),
//   },
//   {
//     $set: {
//       name: "mike",
//     },
//   }
// ).then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// db.collection("tasks")
//   .updateMany(
//     {
//       completed: false,
//     },
//     {
//       $set: {
//         completed: true,
//       },
//     }
//   )
//   .then((result) => {
//     console.log(result);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
