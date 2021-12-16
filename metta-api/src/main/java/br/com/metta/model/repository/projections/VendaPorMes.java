package br.com.metta.model.repository.projections;

import java.math.BigDecimal;

public interface VendaPorMes {
	Integer getMes();
	BigDecimal getValor();
}