const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = process.env.DATABASE_URL;
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
const collectionGameName = "GameData";
const gamecollection = database.collection(collectionGameName);
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
            return true;
        } else {
            console.log("Login fail");
            return false;
        }
    } catch (err) {
        console.error(`Co gi do sai sai: ${err}\n`);
    }
}

async function gameUpload(_gamename,_description, _username, _id, dataurl, imageurl) {
    const recipes = [
        {
            name: _gamename,
            description: _description,
            author: _username,
            id: _id,
            date: new Date(),
            data: dataurl,
            image: imageurl
        },
    ];

    try {
        const insertManyResult = await gamecollection.insertMany(recipes);
        console.log(`${insertManyResult.insertedCount} documents successfully inserted.\n`);
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}

async function playGame(_gamename) {
    var query = { name: _gamename };
    try {
        var queryResult = await gamecollection.find(query).toArray();
        if (queryResult.length == 1) {
            var gameData = queryResult[0].data;
            console.log(gameData);
            return gameData;

        } else {
            console.log("Không tìm thấy dữ liệu của trò chơi.");
        }
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}
async function getUser(_username) {
    var query = { author: _username };
    try {
        var queryResult = await gamecollection.find(query).toArray();
        if (queryResult.length >= 0) {
            console.log(queryResult);
            return queryResult;

        } else {
            console.log("Không tìm thấy dữ liệu của trò chơi.");
        }
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}

async function getUserProfile(_username) {
    var query = { username: _username };
    try {
        var queryResult = await collection.find(query).toArray();
        if (queryResult.length >= 0) {
            console.log(queryResult);
            return queryResult;

        } else {
            console.log("Không tìm thấy dữ liệu của người chơi.");
        }
    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}

async function getGameBox() {
    try {
        var queryResult = await gamecollection.find().toArray();

        var gameData = queryResult;
        console.log(gameData);
        return gameData;

    } catch (err) {
        console.error(`Something went wrong trying to insert the new documents: ${err}\n`);
    }
}

async function updateGameInfo(_gamename, _newname, _description) {
    try {
        await gamecollection.updateOne(
            { id: _gamename },
            {
                $set: { name: _newname, description: _description }
            }

        );
        console.log("Success");
        return true;
    } catch (err) {
        console.error(`Something went wrong trying to update the game information: ${err}`);
        return false;
    }
}
async function deleteGame(_gameid, _author) {
    try {
        const gameToDelete = await gamecollection.findOne({
            id: _gameid,
            author: _author
        });
        if (gameToDelete) {
            // Lưu trữ dữ liệu trước khi xóa
            const gameData = gameToDelete;

            // Thực hiện xóa
            const result = await gamecollection.deleteOne({
                id: _gameid,
                author: _author
            });

            if (result.deletedCount === 1) {
                console.log("Delete Success");
                return gameData;
            } else {
                console.log("Game not found or not authorized to delete.");
                return false;
            }
        } else {
            console.log("Game not found or not authorized to delete.");
            return false;
        }
    }
    catch (err) {
        console.error(`Something went wrong trying to delete the game: ${err}`);
        return false;
    }
}

module.exports = { register, login, gameUpload, playGame, getUser, getGameBox, updateGameInfo, getUserProfile, deleteGame };