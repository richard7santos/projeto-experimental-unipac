package br.com.metta.rest.fornecedor;


import br.com.metta.model.Fornecedor;


public class FornecedorFormRequest {

	private Long id;
	private String cpfCnpj;
	private String razaoSocial;
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
	
	
	
	
	public FornecedorFormRequest() {
		super();
	}
		
	public FornecedorFormRequest(Long id, String cpfCnpj, String razaoSocial,String produtoServico, String cep, String logradouro, String numero,
			String complemento, String bairro, String cidade, String estado, String email, String telefone,
			String observacao) {
		
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

	public Fornecedor toModel() {
		return new Fornecedor(id, cpfCnpj, razaoSocial, produtoServico, cep, logradouro, numero, complemento, bairro, 
							cidade, estado, email, telefone, observacao);
	}
	
	public static FornecedorFormRequest fromModel (Fornecedor fornecedor) {
		return new FornecedorFormRequest (fornecedor.getId(), fornecedor.getCpfCnpj(), fornecedor.getRazaoSocial(),
				fornecedor.getProdutoServico(),fornecedor.getCep(), fornecedor.getLogradouro(), fornecedor.getNumero(),
				fornecedor.getComplemento(), fornecedor.getBairro(), fornecedor.getCidade(),
				fornecedor.getEstado(), fornecedor.getEmail(), fornecedor.getTelefone(),
				fornecedor.getObservacao());
	}
}


