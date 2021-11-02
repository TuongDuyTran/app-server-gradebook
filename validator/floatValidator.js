import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class FloatValidator extends AbstractValidator{

    _doValid() {
        if(isNaN(this.value)){
            this.error = 'Float is required';
            return false;
        } else {
            this.value = parseFloat(this.value);
            return true;
        }
    }
}

Validator['float'] = FloatValidator;