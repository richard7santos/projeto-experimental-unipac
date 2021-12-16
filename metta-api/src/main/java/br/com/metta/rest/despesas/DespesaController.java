package br.com.metta.rest.despesas;

import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
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
import org.springframework.web.server.ResponseStatusException;

import br.com.metta.model.Despesa;
import br.com.metta.model.repository.DespesaRepository;
import br.com.metta.service.RelatorioDespesasService;
import br.com.metta.util.DateUtils;

@RestController
@RequestMapping("/api/despesas")
@CrossOrigin("*")
public class DespesaController {

	@Autowired
	private DespesaRepository repository;
	private RelatorioDespesasService RelatorioDespesasService;

	@GetMapping
	public List<DespesaFormRequest> getLista() {
		return repository.findAll().stream()
				.map(DespesaFormRequest::fromModel)
				.collect(Collectors.toList());
	}
	
	@GetMapping("/relatorio-despesas")
	public ResponseEntity<byte[]> relatorioDespesas(
			
			@RequestParam(value = "inicio", required= false, defaultValue = "") String inicio,
			@RequestParam(value = "fim", required= false, defaultValue = "") String fim
	){
		Date dataInicio = DateUtils.fromString(inicio);
		Date dataFim = DateUtils.fromString(fim, true);
		
		if(dataInicio == null) {
			dataInicio = DateUtils.DATA_INICIO_PADRAO;
		}
		
		if(dataFim == null) {
			dataFim = DateUtils.hoje(true);
		}
				
		var relatorioGerado = RelatorioDespesasService.gerarRelatorio(dataInicio, dataFim);
		var headers = new HttpHeaders();
		var fileName = "relatorio-despesas.pdf";
		headers.setContentDispositionFormData("inline; filename=\"" +fileName+ "\"", fileName);
		headers.setCacheControl("must-revalidate, post-check=0, pre-check=0");
		var responseEntity = new ResponseEntity<>(relatorioGerado, headers, HttpStatus.OK);
		return responseEntity;
	}

	
	@GetMapping("{id}")
	public ResponseEntity<DespesaFormRequest> getById(@PathVariable Long id) {
		Optional<Despesa> despesaExistente = repository.findById(id);
		if (despesaExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		
		var despesa = despesaExistente.map ( DespesaFormRequest::fromModel).get();
		return ResponseEntity.ok(despesa);
	}

	@PostMapping
	public DespesaFormRequest salvar(@RequestBody DespesaFormRequest despesa) {
		Despesa entidadeDespesa = despesa.toModel();
		repository.save(entidadeDespesa);
		return DespesaFormRequest.fromModel(entidadeDespesa);
	
	}

	@PutMapping("{id}")
	public ResponseEntity<Void> atualizar(@PathVariable Long id, @RequestBody DespesaFormRequest despesa) {
		Optional<Despesa> despesaExistente = repository.findById(id);
		if (despesaExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		Despesa entidade = despesa.toModel();
		entidade.setId(id);
		repository.save(entidade);
		return ResponseEntity.ok().build();
	}
	
	@DeleteMapping("{id}")
	public ResponseEntity<Void> deletar(@PathVariable Long id){
		Optional<Despesa> despesaExistente = repository.findById(id);
		
		if (despesaExistente.isEmpty()) {
			return ResponseEntity.notFound().build();
		}
		repository.delete(despesaExistente.get());
		return ResponseEntity.noContent().build();
	}
}
