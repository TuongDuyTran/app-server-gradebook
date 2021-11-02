import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class BooleanValidator extends AbstractValidator{

    _doValid() {
        if(this.value === undefined){
            this.error = 'boolean is required undefined received ';
            return this.isNull();
        }
        this.value = (typeof this.value === 'string')?this.value.toLowerCase():this.value;
        if(["true","false","0","1", true, false, 0, 1].includes(this.value)){
            this.value = (["true", "1", 1, true].includes(this.value));
            return true;
        } else {
            this.error = 'boolean is required';
            return false;
        }
    }
}

Validator['bool'] = BooleanValidator;