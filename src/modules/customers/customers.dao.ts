import * as mongo from 'mongodb';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectDb } from 'nest-mongodb';
import { ObjectId } from 'mongodb';
import { Customer } from 'src/models/customer.model';

/**
 * TODO: Specify the class.
 */
@Injectable()
export class CustomersDao {   
    private readonly CustomersCollection: mongo.Collection;

    constructor(@InjectDb() private readonly db: mongo.Db) {
        this.CustomersCollection = this.db.collection('customers');
    } 

     /**
     * Adds a customer to the `customers` collection.
     * @param {Customer} customerInfo - The information of the customer to add.
     * @returns {DAOResponse} Returns either a "success" or an "error" Object.
     */
    async add(customer: Customer) {
        try {
            customer.createdDate = new Date;
            customer.lastUpdate = new Date;
            
            var dbResponse = await this.CustomersCollection.insertOne(customer);
            
            return  { success: dbResponse.insertedCount > 0, _id: dbResponse.insertedId, };            
        } catch (e){
            console.error(e);
            return { error: e };
        }

    }

    async getAll(): Promise<Customer[]> {
        try{
            return await this.CustomersCollection.find().toArray();
        }catch (e){
            console.error(e);
            throw new HttpException ({status: '', error: ''}, HttpStatus.BAD_REQUEST);
        }
    }

    async edit(customer: Customer) {
        try {
            return await this.CustomersCollection.updateOne(
                { _id: new ObjectId(customer._id)},
                {
                    $set: {
                        // TODO: implementar edit
                    }
                }
            )

        } catch (e) {
            console.error(e);
            return { error: 'Não foi possível excluir o usuário.'}
        }        
        throw new Error("Method not implemented.");
    }    
}