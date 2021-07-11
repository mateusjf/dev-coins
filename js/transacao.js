class Transacao{
    constructor(){
        this._id;
        this._descricao;
        this._valor;
        this._data;
        this._entrada = false;
    }

    get id(){
        return this._id;
    }

    set id(chavePrimaria){
        this._id = chavePrimaria;
    }

    get descricao(){
        return this._descricao;
    }

    set descricao(texto){
        this._descricao = texto;
    }

    get valor(){
        return this._valor;
    }

    set valor(valor){
        this._valor = valor;
    }

    get data(){
        return this._data;
    }

    set data(data){
        this._data = data;
        this._setEntrada();
    }

    get entrada(){
        return this._entrada;
    }

    _setEntrada(){
        if (this.valor >= 0)
            this._entrada = true;
        else
            this._entrada = false;
    }
}