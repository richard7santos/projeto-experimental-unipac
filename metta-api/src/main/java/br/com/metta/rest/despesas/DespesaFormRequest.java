package br.com.metta.rest.despesas;

import java.math.BigDecimal;
import java.time.LocalDate;

import com.fasterxml.jackson.annotation.JsonFormat;

import br.com.metta.model.Despesa;


public class DespesaFormRequest {

	private Long id;
	private String tipoDespesa;
	private BigDecimal valor;
	private String motivo;
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataDespesa;
	private String responsavel;
	
			
	public DespesaFormRequest() {
		super();
		
	}

	public DespesaFormRequest(Long id, String tipoDespesa, BigDecimal valor, String motivo, 
			LocalDate dataDespesa, String responsavel) {
		
		super();
		this.id = id;
		this.tipoDespesa = tipoDespesa;
		this.valor = valor;
		this.motivo = motivo;
		this.dataDespesa = dataDespesa;
		this.responsavel = responsavel;
		
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}


	public String getTipoDespesa() {
		return tipoDespesa;
	}

	public void setTipoDespesa(String tipoDespesa) {
		this.tipoDespesa = tipoDespesa;
	}


	public BigDecimal getValor() {
		return valor;
	}


	public void setValor(BigDecimal valor) {
		this.valor = valor;
	}


	public String getMotivo() {
		return motivo;
	}


	public void setMotivo(String motivo) {
		this.motivo = motivo;
	}


	public LocalDate getDataDespesa() {
		return dataDespesa;
	}


	public void setDataDespesa(LocalDate dataDespesa) {
		this.dataDespesa = dataDespesa;
	}


	public String getResponsavel() {
		return responsavel;
	}


	public void setResponsavel(String responsavel) {
		this.responsavel = responsavel;
	}


	public Despesa toModel() {
		return new Despesa(id, tipoDespesa, valor, motivo, dataDespesa, responsavel);
	}
	
	public static DespesaFormRequest fromModel (Despesa despesa) {
		return new DespesaFormRequest ( despesa.getId(), despesa.getTipoDespesa(), despesa.getValor(),
				despesa.getMotivo(), despesa.getDataDespesa(), despesa.getResponsavel());
	}
}

