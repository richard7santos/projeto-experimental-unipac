package br.com.metta.rest.fornecedor;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import br.com.metta.model.Fornecedor;
import br.com.metta.model.repository.FornecedorRepository;

@RestController
@RequestMapping("/api/fornecedor")
@CrossOrigin("*")
public class FornecedorController {

	@Autowired
	private FornecedorRepository repository;

	@PostMapping
	public ResponseEntity salvar(@RequestBody FornecedorFormRequest request) {
		Fornecedor fornecedor = request.toModel();
		repository.save(fornecedor);
		return ResponseEntity.ok(FornecedorFormRequest.fromModel(fornecedor));

	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(
						@PathVariable Long id, 
						@RequestBody FornecedorFormRequest request) {

		Optional<Fornecedor> fornecedorExistente = repository.findById(id);
		if (fornecedorExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		Fornecedor fornecedor = request.toModel();
		fornecedor.setId(id);
		repository.save(fornecedor);
		return ResponseEntity.noContent().build();
	}

	@GetMapping("{id}")
	public ResponseEntity<FornecedorFormRequest> getById(@PathVariable Long id) {
		return repository.findById(id)
				.map(FornecedorFormRequest::fromModel)
				.map(fornecedorFR -> ResponseEntity.ok(fornecedorFR))
				.orElseGet(() -> ResponseEntity.notFound().build());
	}

	@DeleteMapping("{id}")
	public ResponseEntity<Object> delete(@PathVariable Long id) {
		return repository
				.findById(id)
				.map(fornecedor -> {
					repository.delete(fornecedor);
					return ResponseEntity.noContent().build();
				})
				.orElseGet(() -> ResponseEntity.notFound().build());
	}
	
	@GetMapping
	public Page<FornecedorFormRequest> getLista( 
			@RequestParam(value = "razaoSocial", required = false, defaultValue = "") String razaoSocial, 
			@RequestParam(value ="cpfCnpj", required = false, defaultValue = "") String cpfCnpj,
			Pageable pageable
			){
		return repository
				.buscarPorNomeCpf("%" + razaoSocial + "%", "%" + cpfCnpj + "%" , pageable)
				.map(FornecedorFormRequest::fromModel);
	} 
}
