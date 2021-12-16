package br.com.metta.model.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import br.com.metta.model.Cliente;

public interface ClienteRepository extends JpaRepository<Cliente, Long> {

	@Query("select c from Cliente c where upper(c.razaoSocial) like upper(:razaoSocial)"
			+ " and c.cpfCnpj like :cpfCnpj ")
	Page<Cliente> buscarPorNomeCpf(
			@Param("razaoSocial") String razaoSocial,
			@Param("cpfCnpj") String cpfCnpj,
			Pageable peageble);
}
