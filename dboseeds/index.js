import "./seeds.js";
import SeedClassroom from "./classroom/Classroom.js";

export default {
    UpSeed: (models) => {
        return Promise.all([
            SeedClassroom()
        ]);
    }
};