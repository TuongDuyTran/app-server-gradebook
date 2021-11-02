import { AbstractValidator, Validator } from "../global_class/abstractValidator.js";

export class AttachmentValidator extends AbstractValidator{

    _doValid() {
        return true;
    }
}

Validator['attachment'] = AttachmentValidator;