import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class IntegerValidator extends AbstractValidator{

    _doValid() {
        if(isNaN(this.value)){
            this.error = 'Number is required';
            return false;
        } else {
            this.value = parseInt(this.value);
            return true;
        }
    }
}

Validator['int'] = IntegerValidator;