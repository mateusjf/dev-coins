const btnAdicionar = document.querySelector('#button-transacao');
const modal = document.querySelector('.modal');
const btnSalvar = document.querySelector('#salvar');
const btnCancelar = document.querySelector('#cancelar');
const bodyTabela = document.querySelector('table tbody');
const inputs = document.querySelectorAll('input');
const dao = new DAO();

bodyTabela.addEventListener('click', e => {
    let elemento = e.target.parentNode;
    if (elemento.classList[0] === 'remover'){
        let linha = elemento.parentNode.parentNode;
        let id = linha.childNodes[1].textContent;
        dao.remover(id);
        linha.remove();
        carregarValores();
    }
 
}, false);

btnAdicionar.addEventListener('click', () => {
    limparModal();
    modal.classList.add('active');
}, false);

const validaFormulario = () => {
    for(let i = 0; i < inputs.length; i++){
        if(inputs[i].value === ''){
            alert('Não é permitido deixar campos em branco')
            return false;
        }
    }
    return true;
}

btnSalvar.addEventListener('click', () => {
    let valores = [];
    for(let i = 0; i < inputs.length; i++){
        valores.push(inputs[i].value);
    }

    if (validaFormulario()){
        let transacao = new Transacao();
        transacao.id = gerarHash();
        transacao.descricao = valores[0];
        transacao.valor = parseFloat(valores[1]);
        transacao.data = valores[2];
        dao.adicionar(transacao);
        criarLinha(transacao);
        carregarValores();
        modal.classList.remove('active');
    }
}, false);

btnCancelar.addEventListener('click', () => {
    modal.classList.remove('active');
}, false);

const gerarHash = () =>{
    let agora = parseInt(Date.now() / 10000);
    let numeroAleatorio = parseInt(Math.random() * (1000 - 100) + 100);

    return (agora + numeroAleatorio).toString()
}

const criarLinha = (objeto) => {
    let tipo = 'despesa';
    if (objeto._entrada){
        tipo = ''
    }

    let linha = `
    <tr>
    <td>${objeto._id}</td>
    <td>${objeto._descricao}</td>
    <td><span class="${tipo}">${objeto._valor.toLocaleString('pt-br', {maximumFractionDigits: 2, minimumFractionDigits: 2})}</span></td>
    <td>${new Date(objeto._data).toLocaleDateString('pt-br')}</td>
    <td>
        <a class="remover" href="#">
            <img src="img/minus.svg" alt="">
        </a>
    </td>
</tr>`;

    bodyTabela.innerHTML += linha;
}

carregarLista = () => {
    bodyTabela.innerHTML = '';
    let lista = dao.getLista();
    for(let i = 0; i < lista.length; i++){
        criarLinha(lista[i]);
    }
}

carregarValores = () => {
    let cards = document.querySelectorAll('.cards p');

    const lista = dao.getLista();
    const valores = [];

    valores['entrada'] = 0;
    valores['saida'] = 0;
    valores['total'] = 0;

    for(let i = 0; i < lista.length; i++){
        if (lista[i]._entrada)
            valores['entrada'] += lista[i]._valor;
        else
            valores['saida'] += lista[i]._valor;

        valores['total'] += lista[i]._valor;
    }

    cards[0].textContent = `R$ ${valores['entrada'].toLocaleString('pt-br', {maximumFractionDigits: 2, minimumFractionDigits: 2})}`;
    cards[1].textContent = `R$ ${Math.abs(valores['saida']).toLocaleString('pt-br', {maximumFractionDigits: 2, minimumFractionDigits: 2})}`;
    cards[2].textContent = `R$ ${valores['total'].toLocaleString('pt-br', {maximumFractionDigits: 2, minimumFractionDigits: 2})}`;
}

limparModal = () => {
    for(let i = 0; i < inputs.length; i++){
        inputs[i].value = '';
    }
}

carregarLista();
carregarValores();