import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class ArrayValidator extends AbstractValidator{
    _doValid() {
        if(Array.isArray(this.value) === false){
            return false;
        }

        for (let i = 0; i < this.value.length; i++){
            let item = this.value[i];
            if(this.subClass !== undefined && this.subClass !== null){
                let itemValid = new Validator[this.subClass](item);
                let result = itemValid.valid();
                this.error = `${itemValid.error} in item[${i}]`;
                if(result === false){
                    return false;
                }
            }
        }

        return true;
    }

    isNull() {
        return super.isNull() || (Array.isArray(this.value) && this.value.length === 0);
    }
}

Validator['array'] = ArrayValidator;