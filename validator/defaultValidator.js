import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class DefaultValidator extends AbstractValidator{

}

Validator['void'] = DefaultValidator;