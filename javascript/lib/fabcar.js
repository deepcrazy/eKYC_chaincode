/*
 * SPDX-License-Identifier: Apache-2.0
 */

'use strict';

const { Contract } = require('fabric-contract-api');

class FabCar extends Contract {

    async initLedger(ctx) {
        console.info('============= START : Initialize Ledger ===========');
        const users = [
            {
                firstName: 'Alice',
                lastName: 'Mckay',
                DOB: 312921208077,
                income: 3000,
                passport: 987654,
            },
            {
                firstName: 'Bob',
                lastName: 'Kein',
                DOB: 312921201213,
                income: 2000,
                passport: 832654,
            },
        ];
        // const cars = [
        //     {
        //         color: 'blue',
        //         make: 'Toyota',
        //         model: 'Prius',
        //         owner: 'Tomoko',
        //     },
        //     {
        //         color: 'red',
        //         make: 'Ford',
        //         model: 'Mustang',
        //         owner: 'Brad',
        //     },
        //     {
        //         color: 'green',
        //         make: 'Hyundai',
        //         model: 'Tucson',
        //         owner: 'Jin Soo',
        //     },
        //     {
        //         color: 'yellow',
        //         make: 'Volkswagen',
        //         model: 'Passat',
        //         owner: 'Max',
        //     },
        //     {
        //         color: 'black',
        //         make: 'Tesla',
        //         model: 'S',
        //         owner: 'Adriana',
        //     },
        //     {
        //         color: 'purple',
        //         make: 'Peugeot',
        //         model: '205',
        //         owner: 'Michel',
        //     },
        //     {
        //         color: 'white',
        //         make: 'Chery',
        //         model: 'S22L',
        //         owner: 'Aarav',
        //     },
        //     {
        //         color: 'violet',
        //         make: 'Fiat',
        //         model: 'Punto',
        //         owner: 'Pari',
        //     },
        //     {
        //         color: 'indigo',
        //         make: 'Tata',
        //         model: 'Nano',
        //         owner: 'Valeria',
        //     },
        //     {
        //         color: 'brown',
        //         make: 'Holden',
        //         model: 'Barina',
        //         owner: 'Shotaro',
        //     },
        //     {
        //         color: 'green',
        //         make: 'Audi',
        //         model: 'A4',
        //         owner: 'Deepanshu',
        //     },
        // ];

        for (let i = 0; i < users.length; i++) {
            users[i].docType = 'user';
            // await ctx.stub.putState('USER' + i, Buffer.from(JSON.stringify(users[i])));
            await ctx.stub.putState((i+1).toString(), Buffer.from(JSON.stringify(users[i])));
            console.info('Added <--> ', users[i]);
        }
        console.info('============= END : Initialize Ledger ===========');
    }

    async getData(ctx, userId) {
        const userAsBytes = await ctx.stub.getState(userId);    //  get the user from the chaincode state
        if (!userAsBytes || userAsBytes.length === 0) {
            throw new Error(`UserID: ${userId} does not exist.`);
        }
        console.log(userAsBytes.toString());
        return userAsBytes.toString();
    }

    // async queryCar(ctx, carNumber) {
    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     console.log(carAsBytes.toString());
    //     return carAsBytes.toString();
    // }

    async inputData(ctx, userId, userDetails) {
        console.log('============= START : Save User Data =========');
        // users.push({userId : user});
        const user = {
            docType: 'user',
            userDetails,
        };
        await ctx.stub.putState(userId, Buffer.from(JSON.stringify(user)));
        console.log('======== END : User Data Stored ===========');
    }

    async approveCompany(ctx, userId, companyId) {
        console.log('======== START : Approve company for user data access ==========');
        let indexName = 'company~user';
        let companyUserIndexKey = await ctx.stub.createCompositeKey(indexName, [companyId.toString(), userId.toString()]);
        if (!companyUserIndexKey) {
            throw new Error(' Failed to create the createCompositeKey');
        }

        console.log(companyUserIndexKey);

        //  Note - passing a 'nil' value will effectively delete the key from state, therefore we pass null character as value
        await ctx.stub.putState(companyUserIndexKey, Buffer.from('\u0000'));
        console.log('======== END : Relation of approved companies for users stored =========');
    }

    async saveCompany(ctx, companyId) {
        console.log('=========== START : Save Company Data ===========');

        const company = {
            docType: 'company',
            companyId,
        };
        await ctx.stub.putState(companyId, Buffer.from(JSON.stringify(company)));
        console.log('======== END : Company Id Stored ==========');
    }

    // async createCar(ctx, carNumber, make, model, color, owner) {
    //     console.info('============= START : Create Car ===========');

    //     const car = {
    //         color,
    //         docType: 'car',
    //         make,
    //         model,
    //         owner,
    //     };

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : Create Car ===========');
    // }

    async getCompanies(ctx) {
        const startKey = '1';
        const endKey = '999';

        const iterator = await ctx.stub.getStateByRange(startKey, endKey);

        const allResults = [];
        while (true) {
            const res = await iterator.next();
            console.log(`Response: ${res}`);

            if (res.value && res.value.value.toString()) {
                console.log(`Response value: ${res.value.value.toString('utf8')}`);
                console.log(`DocType value: ${res.value.value.toString('utf8').docType}`);
                // console.log(res.value.value.toString('utf8'));
                // '{"docType":"user","userDetails":"{firstName:xPaul,lastName:xTest,DOB:238232,income:3121,passport:1232131}"}'.split(',')[0].includes('\"docType\":\"user\"')

                for (let i=0; i < res.value.value.toString('utf8').split(',').length; i++) {

                    if (res.value.value.toString('utf8').split(',')[i].includes('"docType":"company"')) {
                        const Key = res.value.key;
                        console.log(`Key: ${Key}`);
                        let Record;
                        try {
                            Record = JSON.parse(res.value.value.toString('utf8'));
                        } catch (err) {
                            console.log(err);
                            Record = res.value.value.toString('utf8');
                        }
                        allResults.push({ Key, Record });
                        break;
                    }
                }
            }
            if (res.done) {
                console.log('end of data');
                await iterator.close();
                console.info(allResults);
                return JSON.stringify(allResults);
            }
        }
    }

    async getRelations(ctx, company) {
        // const startKey = '0';
        // const endKey = '999';

        let coloredMarbleResultsIterator = await ctx.stub.getStateByPartialCompositeKey('company~user', [company.toString()]);

        let relations = [];
        while (true) {
            // let Record;
            let responseRange = await coloredMarbleResultsIterator.next();
            if (!responseRange || !responseRange.value || !responseRange.value.key) {
                console.log('end of data');
                console.log(`Relations: ${relations}`);
                return JSON.stringify(relations);
            }

            console.log(`response range: ${responseRange.value.key}`);
            console.log(`response range string: ${responseRange.value.key.toString('utf8')}`);
            let objectType;
            let attributes;
            ({
                objectType,
                attributes
            } = await ctx.stub.splitCompositeKey(responseRange.value.key));

            let companyId = attributes[0];
            let userId = attributes[1];
            console.log(`Index Type: ${objectType}`);
            // Record = responseRange.value.key.toString('utf8');
            relations.push({companyId, userId});

            // if (responseRange.done) {
            //     return;
            // }
        }

    }

    // async queryAllCars(ctx) {
    //     const startKey = 'CAR0';
    //     const endKey = 'CAR999';

    //     const iterator = await ctx.stub.getStateByRange(startKey, endKey);

    //     const allResults = [];
    //     while (true) {
    //         const res = await iterator.next();

    //         if (res.value && res.value.value.toString()) {
    //             console.log(res.value.value.toString('utf8'));

    //             const Key = res.value.key;
    //             let Record;
    //             try {
    //                 Record = JSON.parse(res.value.value.toString('utf8'));
    //             } catch (err) {
    //                 console.log(err);
    //                 Record = res.value.value.toString('utf8');
    //             }
    //             allResults.push({ Key, Record });
    //         }
    //         if (res.done) {
    //             console.log('end of data');
    //             await iterator.close();
    //             console.info(allResults);
    //             return JSON.stringify(allResults);
    //         }
    //     }
    // }

    // async changeCarOwner(ctx, carNumber, newOwner) {
    //     console.info('============= START : changeCarOwner ===========');

    //     const carAsBytes = await ctx.stub.getState(carNumber); // get the car from chaincode state
    //     if (!carAsBytes || carAsBytes.length === 0) {
    //         throw new Error(`${carNumber} does not exist`);
    //     }
    //     const car = JSON.parse(carAsBytes.toString());
    //     car.owner = newOwner;

    //     await ctx.stub.putState(carNumber, Buffer.from(JSON.stringify(car)));
    //     console.info('============= END : changeCarOwner ===========');
    // }

}

module.exports = FabCar;
