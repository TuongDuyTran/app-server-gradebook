import { Router } from 'express';
import { validate, handler } from "../../middleware/controller.js";
import { express } from '../../global_class/application.js';
import Buss from '../../client/classroom/business/ClassroomBusiness.js';

let routes = Router();

routes.get('/getAll', validate([]), handler(Buss.getAll.bind(Buss)));

routes.post('/create', validate([
    'body string name',
    'body string topic',
    'body string des',
    'body integer creatorID'
]), handler(Buss.createClassroom.bind(Buss)));

express.use('/api/classroom', routes);