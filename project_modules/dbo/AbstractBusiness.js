class AbstractBusiness{
    constructor() {
        if(this.getModel() === null){
            throw new Error("Business class must implement getModel function");
        }
    }

    getModel(){
        return null;
    }

    getConnect(){
        return AbstractBusiness.connection;
    }

    getTran(){
        return AbstractBusiness.transaction || null;
    }

    beginTran(callback){
        return this.getConnect().transaction(async (tran)=>{
            AbstractBusiness.transaction = tran;
            let result = await callback.call(this, tran);
            if(AbstractBusiness.transaction !== null && AbstractBusiness.transaction !== undefined){
                delete AbstractBusiness.transaction;
            }
            return result;
        })
    }

    buildQueryOption(...opts){
        if(this.getTran() !== null){
            opts.push({
                transaction: this.getTran()
            });
        }
        return opts
    }

    async create(model){

        return await this.getModel().model.create.apply(this.getModel().model, this.buildQueryOption(model));
    }

    async update(model, id){
        let updateModel = {};
        for(let name in model){
            if(name !== this.getModel().id){
                updateModel[name] = model[name];
            }
        }
        return await this.getModel().model.update.apply(this.getModel().model, this.buildQueryOption(updateModel,{
            where: {
                [this.getModel().id]: id
            }
        }));
    }

    async delete(id){
        return await this.getModel().model.destroy.apply(this.getModel().model, this.buildQueryOption({
            where: {
                [this.getModel().id]: id
            }
        }));
    }

    async selectByID(id){
        return await this.getModel().model.findOne({
            where: {
                [this.getModel().id]: id
            },
            raw: true
        });
    }

    async selectBy(where, ...more){
        let opts = {
            where: where,
            raw: true
        };
        if(more !== undefined){
            opts = {...opts, ...more[0]};
            more[0] = opts;
        } else {
            more = [ opts ];
        }
        return await this.getModel().model.findAll.apply(this.getModel().model, this.buildQueryOption.apply(this,more));
    }
}
module.exports = AbstractBusiness;