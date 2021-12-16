package br.com.metta.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.metta.model.Fornecedor;

public interface FornecedorRepository extends JpaRepository<Fornecedor, Long> {

	@Query("select f from Fornecedor f where upper(f.razaoSocial) like upper(:razaoSocial)"
			+ " and f.cpfCnpj like :cpfCnpj ")
	Page<Fornecedor> buscarPorNomeCpf(
			@Param("razaoSocial") String razaoSocial,
			@Param("cpfCnpj") String cpfCnpj,
			Pageable peageble);

}
