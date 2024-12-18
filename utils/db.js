import { env } from 'process';
import { MongoClient, ObjectId } from 'mongodb';

export class DBClient {
    constructor() {
        const host = env.DB_PORT ? env.DB_PORT : '127.0.0.1';
        const port = env.DB_HOST ? env.DB_HOST : 27017;
        const database = env.DB_DATABASE ? env.DB_DATABASE : 'files_manager';
        this.myClient = new MongoClient(`mongodb://${host}:${port}/${database}`);
        this.myClient.connect();
        this.users = this.client.db().collection('users');
        this.files = this.client.db().collection('files');
    }

    isAlive() {
        return this.myClient.isConnected();
    }

    async nbUsers() {
        /* returns number of documents in the collection users */
        const myDB = this.myClient.db();
        const myCollection = myDB.collection('users');
        return myCollection.countDocuments();
    }

    async nbFiles() {
        /* returns number of documents in the collection files */
        const myDB = this.myClient.db();
        const myCollection = myDB.collection('files');
        return myCollection.countDocuments();
    }
}

const dbClient = new DBClient();

export default dbClient;
