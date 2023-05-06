const express = require("express")
const router = express.Router()

const { sendMail } = require("../controllers/mailControllers")

router.post("/", sendMail)


module.exports = router


/////////

// module.exports = function (user, context, cb) {
//     // Check if this is the user's first login
//     if (context.stats.loginsCount === 1) {
//         const { Pool } = require('pg');
//         const pool = new Pool({
//             connectionString: "postgres://zgoiesyq:hHruht5MAeJcyocTz-gbjm2kltxbPvUu@horton.db.elephantsql.com/zgoiesyq"
//         });


//         const { nickname, email, sub } = user;
//         const role = "user";



//         pool.connect((err, client, release) => {
//             if (err) throw err;
//             client.query('INSERT INTO users (email, name, id) VALUES ($1, $2, $3)', [email, nickname, sub], (err, result) => {
//                 release();
//                 if (err) {
//                     console.error(err);
//                     return cb(err);
//                 }
//                 client.query('INSERT INTO roles (email, role) VALUES ($1, $2)', [email, user], (err, result) => {
//                     release();
//                     if (err) {
//                         console.error(err);
//                         return cb(err);
//                     }
//                     console.log(result.rows);

//                     // Add custom claim to the access token
//                     context.accessToken['https://myapp.com/postgres'] = { read: true };

//                     return cb(null, user, context);
//                 });
//             });
//         })
//     }

//     else {
//         // This is not the user's first login, do nothing
//         cb(null, user, context);
//     }
// }










//  module.exports = function (user, context, cb) {
//      const { Pool } = require('pg');
//      const pool = new Pool({
//          connectionString: "postgres://zgoiesyq:hHruht5MAeJcyocTz-gbjm2kltxbPvUu@horton.db.elephantsql.com/zgoiesyq"
//      });


// const { name, email } = user;
// const role = "user";
// pool.connect((err, client, release) => {
//     if (err) throw err;
//     client.query('INSERT INTO users (email, name) VALUES ($1, $2)', [email, name], (err, result) => {
//         release();
//         if (err) {
//             console.error(err);
//             return cb(err);
//         }
//         console.log(result.rows);

//         // Add custom claim to the access token
//         context.accessToken['https://myapp.com/postgres'] = { read: true };

//         return cb(null, user, context);
//     });
// });
// pool.connect((err, client, release) => {
//     if (err) throw err;
//     client.query('INSERT INTO roles (email, role) VALUES ($1, $2)', [email, role], (err, result) => {
//         release();
//         if (err) {
//             console.error(err);
//             return cb(err);
//         }
//         console.log(result.rows);

//         // Add custom claim to the access token
//         context.accessToken['https://myapp.com/postgres'] = { read: true };

//         return cb(null, user, context);
//     });
// });
// }



// module.exports = function (user, context, cb) {
//     const { Pool } = require('pg');
//     const pool = new Pool({
//         connectionString: "postgres://zgoiesyq:hHruht5MAeJcyocTz-gbjm2kltxbPvUu@horton.db.elephantsql.com/zgoiesyq"
//     });


//     const { name, email } = user;
//     const role = "user";



//     pool.connect((err, client, release) => {
//         if (err) throw err;
//         client.query('INSERT INTO users (email, name) VALUES ($1, $2)', [email, name], (err, result) => {
//             release();
//             if (err) {
//                 console.error(err);
//                 return cb(err);
//             }

//             // Add custom claim to the access token
//             context.accessToken['https://myapp.com/postgres'] = { read: true };

//             return cb(null, user, context);
//         });
//     });
// }
