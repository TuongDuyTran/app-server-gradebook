import DBO from "dbo";
import pkg from "sequelize";
const { Op } = pkg;
const { dbo, AbstractBusiness } = DBO;
import { Classroom } from "../models/index.js";
import { ClientException, ServerException } from "p_exception";

class ClassroomBusiness extends AbstractBusiness {
    getModel() {
        return {
            model: dbo.Classroom,
            id: Classroom.ID
        };
    }

    async getAll() {
        try {
            return await this.getModel().model.findAll();
        } catch (e) {
            return new ServerException(e.message);
        }
    }

    async createClassroom(name, topic, des, creatorID) {
        try {
            let classroom = dbo.Classroom.build({
                [Classroom.Name]: name,
                [Classroom.Code]: this.#randomCode(),
                [Classroom.Topic]: topic,
                [Classroom.Description]: des,
                [Classroom.CreatorID]: creatorID,
            }).dataValues;
            classroom = await this.create(classroom);
            if (classroom[Classroom.ID] === null || classroom[Classroom.ID] === undefined) {
                throw new ServerException("Can't insert classroom");
            }
            return true;
        } catch (e) {
            return new ServerException(e.message);
        }
    }

    #randomCode() {
        return (Math.random()).toString(36).substring(5);
    }
}

export default new ClassroomBusiness();
