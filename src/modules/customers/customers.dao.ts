import * as mongo from 'mongodb';
import { Injectable, HttpException, HttpStatus } from "@nestjs/common";
import { InjectDb } from 'nest-mongodb';
import { ObjectId } from 'mongodb';
import { Customer } from 'src/models/customer.model';
import { STATUS_CODES } from 'http';

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
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }

    }

    async getAll(): Promise<Customer[]> {
        try{
            return await this.CustomersCollection.find().toArray();
        }catch (e){
            console.error(e);
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getById(id): Promise<Customer>{
        try{
            return await this.CustomersCollection.findOne({_id: new ObjectId(id)})
        }catch(e){
            console.error(e);
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async edit(customer: Customer) {
        try {
            return await this.CustomersCollection.updateOne(
                { _id: new ObjectId(customer._id)},
                {
                    $set: {
                       name: customer.name,
                       fantasyName: customer.fantasyName,                       
                       lastUpdate: new Date,
                       email: customer.email,
                       subscription: customer.subscription,
                       phone: customer.phone,                       
                       sellerCode: customer.sellerCode,
                       sellerName: customer.sellerName,
                       'address.zipcode': customer.address.zipcode,
                       'address.street': customer.address.street,
                       'address.state_code': customer.address.state_code,
                       'address.number': customer.address.number,
                       'address.neighborhood': customer.address.neighborhood,
                       'address.complement': customer.address.complement,
                       'address.city_code': customer.address.city_code,
                    }
                }
            )

        } catch (e) {
            console.error(e);

            throw new HttpException('Não foi possível editar o usuário.',HttpStatus.INTERNAL_SERVER_ERROR);            
        }                
    }    

     /**
     * Deletes a customer from the `customers` collection.
     * @param {CustomerId} userId - The id of the user to delete.
     * @returns {DAOResponse} Returns either a "success" or an "error" Object.     
     */
    async delete(customerId: string) {
        try {
            return await this.CustomersCollection.deleteOne({_id: new ObjectId(customerId)});
            
        } catch (e) {
            console.error(e);
            throw new HttpException('Não foi possível excluir o usuário.',HttpStatus.INTERNAL_SERVER_ERROR);                        
        }
    }

}