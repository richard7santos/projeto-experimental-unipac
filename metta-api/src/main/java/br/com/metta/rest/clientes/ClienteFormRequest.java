package br.com.metta.rest.clientes;

import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.metta.model.Cliente;


public class ClienteFormRequest {

	private Long id;
	private String cpfCnpj;
	private String razaoSocial;
	private String cep;
	private String logradouro;
	private String numero;
	private String complemento;
	private String bairro;
	private String cidade;
	private String estado;
	private String email;
	private String telefone;
	private String telefone2;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataCadastro;
	
	
	
	public ClienteFormRequest() {
		super();
	}
	/**
	 * @param cpfCnpj
	 * @param razaoSocial
	 * @param cep
	 * @param logradouro
	 * @param numero
	 * @param complemento
	 * @param bairro
	 * @param cidade
	 * @param estado
	 * @param telefone
	 * @param telefone2
	 */
	
	
	public ClienteFormRequest(Long id, String cpfCnpj, String razaoSocial, String cep, String logradouro, String numero,
			String complemento, String bairro, String cidade, String estado, String email, String telefone,
			String telefone2, LocalDate dataCadastro) {
		
		super();
		this.id = id;
		this.cpfCnpj = cpfCnpj;
		this.razaoSocial = razaoSocial;
		this.cep = cep;
		this.logradouro = logradouro;
		this.numero = numero;
		this.complemento = complemento;
		this.bairro = bairro;
		this.cidade = cidade;
		this.estado = estado;
		this.email = email;
		this.telefone = telefone;
		this.telefone2 = telefone2;
		this.dataCadastro = dataCadastro;
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
	public String getTelefone2() {
		return telefone2;
	}
	public void setTelefone2(String telefone2) {
		this.telefone2 = telefone2;
	}
	public LocalDate getDataCadastro() {
		return dataCadastro;
	}
	public void setDataCadastro(LocalDate dataCadastro) {
		this.dataCadastro = dataCadastro;
	}
	
	public Cliente toModel() {
		return new Cliente(id, cpfCnpj, razaoSocial, cep, logradouro, numero, complemento, bairro, 
							cidade, estado, email, telefone, telefone2, dataCadastro);
	}
	
	public static ClienteFormRequest fromModel (Cliente cliente) {
		return new ClienteFormRequest (cliente.getId(), cliente.getCpfCnpj(), cliente.getRazaoSocial(),
										cliente.getCep(), cliente.getLogradouro(), cliente.getNumero(),
										cliente.getComplemento(), cliente.getBairro(), cliente.getCidade(),
										cliente.getEstado(), cliente.getEmail(), cliente.getTelefone(),
										cliente.getTelefone2(), cliente.getDataCadastro());
	}
}


