package br.com.metta.model;


import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


@Entity
@Table (name = "fornecedor")
public class Fornecedor {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "cpf_cnpj")
	private String cpfCnpj;
	
	@Column (name = "razao_social")
	private String razaoSocial;
	
	@Column (name = "produto_servico")
	private String produtoServico;
	private String cep;
	private String logradouro;
	private String numero;
	private String complemento;
	private String bairro;
	private String cidade;
	private String estado;
	private String email;
	private String telefone;
	private String observacao;
	
	
	public Fornecedor() {
		super();
	}


	public Fornecedor(Long id, String cpfCnpj, String razaoSocial, String produtoServico, String cep, String logradouro,
			String numero, String complemento, String bairro, String cidade, String estado, String email,
			String telefone, String observacao) {
		super();
		this.id = id;
		this.cpfCnpj = cpfCnpj;
		this.razaoSocial = razaoSocial;
		this.produtoServico = produtoServico;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.email = email;
		this.telefone = telefone;
		this.observacao = observacao;
	}


	public Fornecedor(String cpfCnpj, String razaoSocial, String produtoServico, String cep, String logradouro,
			String numero, String complemento, String bairro, String cidade, String estado, String email,
			String telefone, String observacao) {
		super();
		this.cpfCnpj = cpfCnpj;
		this.razaoSocial = razaoSocial;
		this.produtoServico = produtoServico;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.email = email;
		this.telefone = telefone;
		this.observacao = observacao;
	}


	public Long getId() {
		return id;
	}


	public void setId(Long id) {
		this.id = id;
	}


	public String getCpfCnpj() {
		return cpfCnpj;
	}


	public void setCpfCnpj(String cpfCnpj) {
		this.cpfCnpj = cpfCnpj;
	}


	public String getRazaoSocial() {
		return razaoSocial;
	}


	public void setRazaoSocial(String razaoSocial) {
		this.razaoSocial = razaoSocial;
	}


	public String getProdutoServico() {
		return produtoServico;
	}


	public void setProdutoServico(String produtoServico) {
		this.produtoServico = produtoServico;
	}


	public String getCep() {
		return cep;
	}


	public void setCep(String cep) {
		this.cep = cep;
	}


	public String getLogradouro() {
		return logradouro;
	}


	public void setLogradouro(String logradouro) {
		this.logradouro = logradouro;
	}


	public String getNumero() {
		return numero;
	}


	public void setNumero(String numero) {
		this.numero = numero;
	}


	public String getComplemento() {
		return complemento;
	}


	public void setComplemento(String complemento) {
		this.complemento = complemento;
	}


	public String getBairro() {
		return bairro;
	}


	public void setBairro(String bairro) {
		this.bairro = bairro;
	}


	public String getCidade() {
		return cidade;
	}


	public void setCidade(String cidade) {
		this.cidade = cidade;
	}


	public String getEstado() {
		return estado;
	}


	public void setEstado(String estado) {
		this.estado = estado;
	}


	public String getEmail() {
		return email;
	}


	public void setEmail(String email) {
		this.email = email;
	}


	public String getTelefone() {
		return telefone;
	}


	public void setTelefone(String telefone) {
		this.telefone = telefone;
	}


	public String getObservacao() {
		return observacao;
	}


	public void setObservacao(String observacao) {
		this.observacao = observacao;
	}


	@Override
	public String toString() {
		return "Fornecedor [id=" + id + ", cpfCnpj=" + cpfCnpj + ", razaoSocial=" + razaoSocial + ", produtoServico="
				+ produtoServico + ", cep=" + cep + ", logradouro=" + logradouro + ", numero=" + numero
				+ ", complemento=" + complemento + ", bairro=" + bairro + ", cidade=" + cidade + ", estado=" + estado
				+ ", email=" + email + ", telefone=" + telefone + ", observacao=" + observacao + "]";
	}
	
	
}

	
	
	

	
