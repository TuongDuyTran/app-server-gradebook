import DBO from 'dbo';
import Seeder from '../dboseeds/index.js';
import Migrator from '../dbomigrates/index.js';
import dotenv from 'dotenv';
dotenv.config();
let dbcon = DBO.getConnect();

if (process.argv[3]) {
    let force = process.argv[3]?.includes('/force');
    let seed = process.argv[3]?.includes('/seed');
    let noseed = process.argv[3]?.includes('/noseed');
    let update = process.argv[3]?.includes('/update');
    let nosync = process.argv[3]?.includes('/nosync');
    let drop = process.argv[3]?.includes('/drop');

    (async () => {
        try {
            if (force) {
                await dbcon.sync({ force: force });
            }

            if (update) {
                await Migrator.Up();
            }

            if (seed) {
                await Seeder.UpSeed();
            }

            if (drop) {
                await dbcon.drop();
            }

            console.log('SUCCESS');
            process.exit();
        } catch (e) {
            console.log(e);
            process.exit();
        }
    })();
}

export const onForce = async () => await dbcon.sync({ force: 1 });

export const onUpdate = async () => await await Migrator.Up();

export const onSeed = async () => await await Seeder.UpSeed();

export const onDrop = async () => await await dbcon.drop();