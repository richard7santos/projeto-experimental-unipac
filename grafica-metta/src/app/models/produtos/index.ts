export interface Produto{
    id?: string;
    dataEntrada : string;
	nomeArquivo : string;
	nomeCliente : string;
	observacao : string;
	tipoProduto : string;
	preco? : number;
}