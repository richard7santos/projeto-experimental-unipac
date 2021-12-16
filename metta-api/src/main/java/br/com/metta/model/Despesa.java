package br.com.metta.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;


import com.fasterxml.jackson.annotation.JsonFormat;


@Entity
@Table (name = "despesa")
public class Despesa {
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	@Column (name = "tipo_despesa")
	private String tipoDespesa;
		
	@Column(name = "valor", precision = 16, scale = 2)
	private BigDecimal valor;
	
	private String motivo;
	
	@Column (name = "data_despesa", columnDefinition = "DATE")
	@JsonFormat(pattern = "dd/MM/yyyy")
	private LocalDate dataDespesa;
	private String responsavel;
	
	
	public Despesa() {
		super();
				
	}

	public Despesa(Long id, String tipoDespesa, BigDecimal valor, String motivo, LocalDate dataDespesa, String responsavel) {
		super();
		
		this.id = id;
		this.tipoDespesa = tipoDespesa;
		this.valor = valor;
		this.motivo = motivo;
		this.dataDespesa = dataDespesa;
		this.responsavel = responsavel;
	}

	public Despesa(String tipoDespesa, BigDecimal valor, String motivo, LocalDate dataDespesa,
			String responsavel) {
		super();
		
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

	@Override
	public String toString() {
		return "Despesa [id=" + id + ", tipoDespesa=" + tipoDespesa + ", valor=" + valor + ", motivo=" + motivo
				+ ", dataDespesa=" + dataDespesa + ", responsavel=" + responsavel + "]";
	}

		}

	
	
	

	
