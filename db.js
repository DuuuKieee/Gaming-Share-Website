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
const passport = require('passport');
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

function isValidPassword(password, email) {
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const digitRegex = /\d/;
    const lengthRegex = /^.{8,16}$/;
    const regex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    if (uppercaseRegex.test(password) && lowercaseRegex.test(password) && digitRegex.test(password) && lengthRegex.test(password)) {
        console.log('pass can it nhat 1 chu cai viet hoa va do dai tu 8 den 16')
        return false;
    }
}



async function register(_email, _username, _password, _password_repeat) {
    if (_password != _password_repeat) {
        console.log("pass khong giong nhau");
        return false;
    }
    if (isValidEmail(_email) === false) {
        return false;
    }
    if (isValidPassword(_password === false)) {
        console.log("pass sai");
        return false;
    }
    var query = { username: _username };
    try {
        var queryResult = await collection.find(query).toArray();
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
                const insertManyResult = await collection.insertMany(recipes);
                console.log(`${insertManyResult.insertedCount} Register successful.\n`);
                return true;
            } catch (err) {
                console.log(`Co gi do sai sai: ${err}\n`);
                return false;
            }
        }
    } catch (err) {
        console.log(`Co gi do sai sai ${err}\n`);
    }
}


async function login(_username, _password) {
    var query = { username: _username, password: hashPassword(_password) };
    try {
        var queryResult = await collection.find(query).toArray();
        if (queryResult.length > 0) {
            console.log("Login successful");
            // passport.serializeUser((user, done) => {
            //     done(null, user);
            //     isAuthenticated() === true;
            // });
            return true;
        } else {
            console.log("Login fail");
            return false;
        }
    } catch (err) {
        console.error(`Co gi do sai sai: ${err}\n`);
    }
}

module.exports = { register, login };