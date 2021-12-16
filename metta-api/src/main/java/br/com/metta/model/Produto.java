package br.com.metta.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.PrePersist;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table
public class Produto {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	
	@Column(name = "nome_arquivo", length = 255)
	private String nomeArquivo;

	@Column(name = "nome_cliente", length = 255)
	private String nomeCliente;

	@Column(name = "observacao", length = 255)
	private String observacao;

	@Column(name = "tipo_produto", length = 50)
	private String tipoProduto;
	
	@Column(name = "preco", precision = 16, scale = 2)
	private BigDecimal preco;
	
	@Column (name = "dt_entrada", columnDefinition = "DATE")
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataEntrada;

	
	public Produto() {
		super();

	}

	public Produto(String nomeArquivo, String nomeCliente, String observacao,
			String tipoProduto, BigDecimal preco ) {
		super();
		
		this.nomeArquivo = nomeArquivo;
		this.nomeCliente = nomeCliente;
		this.observacao = observacao;
		this.tipoProduto = tipoProduto;
		this.preco = preco;
	}
	
	public Produto(Long id,String nomeArquivo, String nomeCliente, String observacao,
			String tipoProduto, BigDecimal preco, LocalDate dataEntrada) {
		super();
		this.id = id;
		this.nomeArquivo = nomeArquivo;
		this.nomeCliente = nomeCliente;
		this.observacao = observacao;
		this.tipoProduto = tipoProduto;
		this.preco = preco;
		this.dataEntrada = dataEntrada;
	}

	@PrePersist
	public void prePersist() {
		setDataEntrada(LocalDate.now());
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
		return "Produto [id=" + id + ", nomeArquivo=" + nomeArquivo + ", nomeCliente=" + nomeCliente + ", observacao="
				+ observacao + ", tipoProduto=" + tipoProduto + ", preco=" + preco + ", dataEntrada=" + dataEntrada
				+ "]";
	}

	

}
