package br.com.metta.model.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import br.com.metta.model.Produto;

public interface ProdutoRepository extends JpaRepository<Produto, Long>{
	

}
