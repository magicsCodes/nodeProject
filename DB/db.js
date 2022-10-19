const MongoClient = require('mongodb').MongoClient;

class DataBase{
    connection
 constructor(){

 }
    async connect(){
        const url = "mongodb://localhost:27017"

        const client = new MongoClient(url);
        let connected = await client.connect();
        this.connection= connected.db('213255300')
        console.log('DB is Connected!!');
    }

    getConnection(){
        return this.connection;
    }
}

 module.exports= new DataBase();
