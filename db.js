const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://TooBunReal:Mk0378203515@dbcluster.orpnbw1.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,

    }
});
const dbName = "DB";
const collectionName = "User";
const database = client.db(dbName);
const collection = database.collection(collectionName);
const crypto = require('crypto');
const { count } = require('console');

function hashPassword(password) {
    const sha256 = crypto.createHash('sha256');
    sha256.update(password);
    return sha256.digest('hex');
}

function isValidEmail(email) {
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return regex.test(email);
}

function isValid(password, email) {
    // // const uppercaseRegex = /[A-Z]/;
    // // const lowercaseRegex = /[a-z]/;
    // // const digitRegex = /\d/;
    // // const lengthRegex = /^.{8,16}$/;
    // // const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // // if (!regex.test(email)) {
    // //     console.log('email sai')
    // //     return false;
    // // }
    // // if (uppercaseRegex.test(password) && lowercaseRegex.test(password) && digitRegex.test(password) && lengthRegex.test(password)) {
    // //     console.log('pass can it nhat 1 chu cai viet hoa va do dai tu 8 den 16')
    // //     return false;
    // // }
    // return false;
}



function register(_email, _username, _password, _password_repeat) {
    return false;
    // if (_password != _password_repeat) {
    //     return true;
    // }
    // if (!isValid(_password, _email)) {
    //     console.log("pass hoac email sai");
    //     return true;
    // }
    var query = { username: _username };
    try {
        var queryResult = collection.find(query).toArray();
        if (queryResult.length > 0) {
            console.log("User da ton tai");
            return false;
        } else {
            const recipes = [
                {
                    username: _username,
                    password: hashPassword(_password),
                    email: _email
                },
            ];

            try {
                const insertManyResult = collection.insertMany(recipes);
                console.log(`${insertManyResult.insertedCount} dang ky dc roi nek.\n`);
                return true;
            } catch (err) {
                console.log(`Something went wrong trying to perform the login: ${err}\n`);
                return false;
            }
        }
    } catch (err) {
        console.log(`Something went wrong trying to perform the login: ${err}\n`);
    }
}


async function login(_username, _password) {
    var query = { username: _username, password: hashPassword(_password) };
    try {
        var queryResult = await collection.find(query).toArray();
        if (queryResult.length > 0) {
            console.log("Login successful");
        } else {
            console.log("Login fail");
        }
    } catch (err) {
        console.error(`Something went wrong trying to perform the login: ${err}\n`);
    }
}

module.exports = { register, login };