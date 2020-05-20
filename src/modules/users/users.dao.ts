import * as mongo from 'mongodb';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectDb } from "nest-mongodb";
import { ObjectId } from 'mongodb';
import { User } from '../../models/user.model';

/**
 * TODO: Specify the class.
 */
@Injectable()
export class UsersDao {
    private readonly UsersCollection: mongo.Collection;

    constructor(@InjectDb() private readonly db: mongo.Db) {
        this.UsersCollection = this.db.collection('users');
    } 

    /**
     * Adds a user to the `users` collection.
     * @param {User} userInfo - The information of the user to add.
     * @returns {DAOResponse} Returns either a "success" or an "error" Object.
     */
    async addUser(user: User) {
        try {
            user.createdDate = new Date;
            user.lastUpdate = new Date;
            console.log(user.lastUpdate);
            var dbResponse = await this.UsersCollection.insertOne(user);
            
            return  { success: dbResponse.insertedCount > 0, _id: dbResponse.insertedId, };            
        } catch (e){
            console.error(e);
            return { error: e };
        }

    }

    async bulkUser(users: User[]) {
        try {
            this.UsersCollection.insertMany(users);
        } catch (e) {
            return {error: e};
        }

    }

    async bulkDeleteUser(users: User[]) {
        try {
            this.UsersCollection.deleteMany(users);
        } catch (e) {
            return {error: e};
        }

    }

    /**
     * Deletes a user from the `users` collection.
     * @param {UserId} userId - The id of the user to delete.
     * @returns {DAOResponse} Returns either a "success" or an "error" Object.     
     */
    async deleteUser(userId: string) {
        try {
            return await this.UsersCollection.deleteOne({_id: new ObjectId(userId)});
            
        } catch (e) {
            console.error(e);
            return { error: 'Não foi possível deletar o usuário.'}
        }
    }

    /**
     * Get a user by Id from the `users`collection.
     * @param {UserId} userId - The user id to get.
     * @returns {User} Returns an user from the `users` collection or an "error" Object.
     */
    async getUserById(userId: string) {
        try {
            let user = await this.UsersCollection.findOne({_id: new ObjectId(userId)})
            
            return user;
        } catch (e) {
            return { error: 'Usuário inixistente.' }
        }
    }

    async getUserByUsername(username: string): Promise<User> {
        return await this.UsersCollection.findOne({username: username});        
    }

    /**
     * Update a user from the `users` collection. 
     * @param {User} user - The user id to delete.
     */
    async updateOneUser(user: User) {
        try {            
            return await this.UsersCollection.updateOne(                
                // match by id
                { _id: new ObjectId(user._id)},
                { 
                    $set: {
                        username: user.username,
                        email: user.email,
                        lastUpdate: new Date
                     },                    
                });
        } catch (e) {
            console.error(e);
            return { error: 'Não foi possível excluir o usuário.'}
        }
    }

    /**
     * TODO
     */
    async getAllUsers(): Promise<User[]> {
        try{
            return await this.UsersCollection.find().toArray();
        } catch (e){
            console.error(e);
            throw new HttpException ({status: '', error: ''}, HttpStatus.BAD_REQUEST);
        }
        
    }

     /**
     * TODO
     */
    async getUsersToUpdateIndexedDb(lastUpdate: Date): Promise<User[]> {
        try{
            return await this.UsersCollection.find({'lastUpdate' : { $gt : lastUpdate }}).toArray();
        } catch (e){
            console.error(e);
            throw new HttpException ({status: '', error: ''}, HttpStatus.BAD_REQUEST);
        }
        
    }
}

/**
 * Parameter passed to addUser method.
 * @typedef User
 * @property {string} username
 * @property {string} email
 * @property {string} password
 * @property {Date} createdDate
 * @property {Date} lastUpdate
 */

/**
 * Parameter passed to deleteUser method.
 * @typedef UserId
 * @property {string} userId
 */

/**
 * Success/Error return object.
 * @typedef DAOResponse
 * @property {boolean} [success] - Success
 * @property {string} [error] - Error
 */
