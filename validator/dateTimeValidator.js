import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class DateTimeValidator extends AbstractValidator {
    _doValid() {
        if (this.value !== null) {
            let parseValue = new Date(Date.parse(this.value));
            if (parseValue.toDateString() !== 'Invalid Date') {
                this.value = parseValue;
                return true;
            }
        }


        this.error = 'date format is not valid YYYY-MM-DD HH:MM:SS is required';
        return false;
    }
}

Validator['datetime'] = DateTimeValidator;