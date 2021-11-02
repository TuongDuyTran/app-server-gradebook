import DBO from 'dbo';
import { Classroom } from "../../client/classroom/models/index.js";
const { dbo } = DBO;

export default () => {
    return dbo.Classroom.bulkCreate([ // Returning and thus passing a Promise here
        {
            [Classroom.Name]: '[CQ] PTUDWNC - 18_3',
            [Classroom.Code]: 'olvqkoz',
            [Classroom.Topic]: 'PTUDWNC',
            [Classroom.Description]: 'test thoi ne ahihi',
            [Classroom.CreatorID]: 1,
        },
        {
            [Classroom.Name]: 'KHTN-AV4-20S7_1',
            [Classroom.Code]: 'dbzefsx',
            [Classroom.Topic]: 'ENGLISH 4',
            [Classroom.Description]: 'test thoi ne ahihi 1',
            [Classroom.CreatorID]: 2
        },
        {
            [Classroom.Name]: 'VTP1B (HK2, 2020)',
            [Classroom.Code]: 'gkes2kt',
            [Classroom.Topic]: 'VTP1B',
            [Classroom.Description]: 'test thoi ne ahihi 2',
            [Classroom.CreatorID]: 1
        }
    ]);
}