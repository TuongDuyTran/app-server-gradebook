export let Validator = {};

Validator.get = (dataType, value, opts) => {
    let splitData = dataType.split('(');
    let mainType = splitData[0];
    let subOption = splitData[1];
    subOption = subOption !== undefined ? subOption.substring(0, subOption.length - 1).split(',') : [];
    if (Validator[mainType] === undefined) {
        mainType = 'void';
    }
    if (opts === undefined) {
        opts = '';
    }
    return new Validator[mainType](value, subOption, opts);

};

export const CONSTRAINT_ENUM = {
    NOT_NULL: 'NOT_NULL',
    ALLOW_NULL: 'ALLOW_NULL'
};

export class AbstractValidator {
    value = null;
    subClass = null;
    length = null;
    pattern = null;
    default = null;
    opts = undefined;
    error = '';
    constructor(_val, opts, moreOptions) {
        this.value = _val;
        this.subClass = opts !== undefined ? opts[0] : null;
        this.length = opts !== undefined ? opts[1] : null;
        this.pattern = opts !== undefined ? opts[2] : null;
        this.default = opts !== undefined ? opts[3] : null;
        this.opts = moreOptions || null;
    }

    isNull() {
        return this.value === null || this.value === undefined || this.value === 'undefined' || this.value === '';
    }

    constraint_check() {
        if (this.value !== null) {
            if (this.value !== undefined && this.length !== null && this.value.length !== undefined && this.value.length > this.length) {
                this.error = `length required is ${this.length} but '${this.value}' is ${this.value.length}`;
                return false;
            }
            if (this.pattern !== null && (new RegExp(this.pattern, "gm").test(this.value)) === false) {
                this.error = `pattern required is '${this.pattern}' not match '${this.value}'`;
                return false;
            }

            return this._doValid();
        }
        if (this.opts !== null && this.opts.includes(CONSTRAINT_ENUM.NOT_NULL) && this.isNull()) {
            this.error = `not null is required`;
            return false;
        }

        return true;
    }

    _doValid() {
        return true;
    }

    valid() {
        if (this.value === undefined) {
            this.value = null;
        }
        return this.constraint_check();
    }
}