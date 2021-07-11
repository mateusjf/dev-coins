class DAO{
    constructor(){
        this.nome = 'transacoes';
        this.lista = JSON.parse(localStorage.getItem(this.nome)) || [];
    }

    adicionar(objeto){
        let resultado = this.buscar(objeto.id);
        if (resultado === null){
            this.lista.push(objeto);
            localStorage.setItem(this.nome, JSON.stringify(this.lista));
        }
    }

    buscar(chavePrimaria){
        for(let i = 0; i < this.lista.length; i++){
            let objeto = this.lista[i];
            // console.log(objeto._id)
            if (chavePrimaria === objeto._id){
                return objeto;
            }
        }
        return null;
    }

    remover(id){
        let resultado = this.buscar(id);
        if(resultado){
            let indice = this.lista.indexOf(resultado);
            this.lista.splice(indice, 1);
            localStorage.setItem(this.nome, JSON.stringify(this.lista));
        }
    }

    getLista(){
        return this.lista;
    }
}