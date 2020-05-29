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
export class AddressDao {
    private readonly StetesCollection: mongo.Collection;

    constructor(@InjectDb() private readonly db: mongo.Db) {
        this.StetesCollection = this.db.collection('states');
    }

    async getStates(): Promise<any[]> {
        try {
            return await this.StetesCollection.find().project({ state_code: 1, state_name: 1, _id: 0 }).toArray();
        } catch (e) {
            console.error(e);
            throw new HttpException(e, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    async getCitiesByState(stateCode): Promise<any[]> {
        console.log('Get cities by state code: ', typeof stateCode);
        try {
            return await
                this.StetesCollection.find({ state_code: Number.parseInt(stateCode)  })
                    .project({ 'cities.ibge_code': 1, 'cities.city_name': 1, _id: 0 })
                    .toArray();
        } catch (e) {
            console.error(e);
            throw new HttpException(e,HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}