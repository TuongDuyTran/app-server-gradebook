import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

export class StringValidator extends AbstractValidator{

    _doValid() {
        if(this.value !== null) {
            this.value = htmlEntities(this.value);
        }
        return true;
    }
}

Validator['string'] = StringValidator;