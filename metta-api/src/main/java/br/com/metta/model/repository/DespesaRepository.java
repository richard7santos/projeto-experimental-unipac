package br.com.metta.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.metta.model.Despesa;

public interface DespesaRepository extends JpaRepository<Despesa, Long> {

	@Query("select d from Despesa d where d.dataDespesa like :dataDespesa "
			)
	Page<Despesa> buscarPorTipoData(
			@Param("dataDespesa") String dataDespesa,
			Pageable peageble);
}
