import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { MongooseModuleOptions, MongooseOptionsFactory } from "@nestjs/mongoose";

@Injectable()
export class MongooseConfigService implements MongooseOptionsFactory{
    constructor(private config:ConfigService){}
    createMongooseOptions(): Promise<MongooseModuleOptions> | MongooseModuleOptions {
        const username=this.config.get('db_username');
        const password=this.config.get('db_password');
        const dbname=this.config.get('db_name');

        if(!username || !password || !dbname){
            throw new Error('Missing database config');
        }

        const uri=`mongodb+srv://${username}:${password}@cluster0.pmpvie3.mongodb.net/${dbname}`;

        console.log('database connected');
        return {uri};
        
    }
}