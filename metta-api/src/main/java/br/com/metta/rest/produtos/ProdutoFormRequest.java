package br.com.metta.rest.produtos;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.metta.model.Produto;

public class ProdutoFormRequest {
	private Long id;
	private String nomeArquivo;
	private String nomeCliente;
	private String observacao;
	private String tipoProduto;
	private BigDecimal preco;
	
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataEntrada;

	
	public ProdutoFormRequest() {
		super();

	}

	public ProdutoFormRequest(Long id, String nomeArquivo, String nomeCliente, String observacao,
			String tipoProduto,BigDecimal preco, LocalDate dataEntrada) {
		super();
		this.id = id;
		this.nomeArquivo = nomeArquivo;
		this.nomeCliente = nomeCliente;
		this.observacao = observacao;
		this.tipoProduto = tipoProduto;
		this.preco = preco;
		this.dataEntrada = dataEntrada;
	}

	public Produto toModel() {
		return new Produto(id, nomeArquivo, nomeCliente, observacao, tipoProduto, preco,dataEntrada);
	}

	public static ProdutoFormRequest fromModel(Produto produto) {
		return new ProdutoFormRequest(
				produto.getId(), 
				produto.getNomeArquivo(), 
				produto.getNomeCliente(),
				produto.getObservacao(), 
				produto.getTipoProduto(),
				produto.getPreco(),
				produto.getDataEntrada());

	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public LocalDate getDataEntrada() {
		return dataEntrada;
	}

	public void setDataEntrada(LocalDate dataEntrada) {
		this.dataEntrada = dataEntrada;
	}

	public String getNomeArquivo() {
		return nomeArquivo;
	}

	public void setNomeArquivo(String nomeArquivo) {
		this.nomeArquivo = nomeArquivo;
	}

	public String getNomeCliente() {
		return nomeCliente;
	}

	public void setNomeCliente(String nomeCliente) {
		this.nomeCliente = nomeCliente;
	}

	public String getObservacao() {
		return observacao;
	}

	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}

	public String getTipoProduto() {
		return tipoProduto;
	}

	public void setTipoProduto(String tipoProduto) {
		this.tipoProduto = tipoProduto;
	}

	public BigDecimal getPreco() {
		return preco;
	}

	public void setPreco(BigDecimal preco) {
		this.preco = preco;
	}

	@Override
	public String toString() {
		return "ProdutoFormRequest [id=" + id + ", nomeArquivo=" + nomeArquivo + ", nomeCliente=" + nomeCliente
				+ ", observacao=" + observacao + ", tipoProduto=" + tipoProduto + ", preco=" + preco + ", dataEntrada="
				+ dataEntrada + "]";
	}

	

	

}
