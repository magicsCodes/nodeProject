const mongoose= require('mongoose')

const server='localhost:27017'
const database='213255300'

class Database {
    constructor(){
        this._connect()
    }
    async _connect(){
        await mongoose.connect(`mongodb://${server}/${database}`)
        console.log("db is connected succesfully")
    }
}


module.exports=new Database()