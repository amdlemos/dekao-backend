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

    async edit(customer: Customer) {
        try {
            return await this.CustomersCollection.updateOne(
                { _id: new ObjectId(customer._id)},
                {
                    $set: {
                       name: customer.name,
                       fantasyName: customer.fantasyName,                       
                       lastUpdate: customer.lastUpdate,
                       email: customer.email,
                       subscription: customer.subscription,
                       phone: customer.phone,                       
                       sellerCode: customer.sellerCode,
                       sellerName: customer.sellerName,
                       'address1th.zipcode': customer.address1th.zipcode,
                       'address1th.street': customer.address1th.street,
                       'address1th.state_code': customer.address1th.state_code,
                       'address1th.number': customer.address1th.number,
                       'address1th.neighborhood': customer.address1th.neighborhood,
                       'address1th.complement': customer.address1th.complement,
                       'address1th.city_code': customer.address1th.city_code,
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