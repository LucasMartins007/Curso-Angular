package io.github.lucas.clientes.config;

import io.github.lucas.clientes.model.entity.Cliente;
import io.github.lucas.clientes.model.entity.ServicoPrestado;
import io.github.lucas.clientes.model.repository.ClienteRepository;
import io.github.lucas.clientes.model.repository.ServicoPrestadoRepository;
import io.github.lucas.clientes.rest.dto.ServicoPrestadoDTO;
import io.github.lucas.clientes.util.BigDecimalConverter;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.server.ResponseStatusException;

import javax.validation.Valid;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.List;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;

@RestController
@RequestMapping("/api/servicos-prestados")
public class ServicoPrestadoController  {

    @Autowired
    private ClienteRepository clienteRepository;
    
    @Autowired
    private ServicoPrestadoRepository repository;
    
    @Autowired
    private BigDecimalConverter bigDecimalConverter;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public ServicoPrestado salvar( @RequestBody @Valid ServicoPrestadoDTO dto ){
        LocalDate data = LocalDate.parse(dto.getData(), DateTimeFormatter.ofPattern("dd/MM/yyyy"));
        Integer idCliente = dto.getIdCliente();

        Cliente cliente =
                clienteRepository
                        .findById(idCliente)
                        .orElseThrow(() ->
                                new ResponseStatusException(
                                        HttpStatus.BAD_REQUEST, "Cliente inexistente."));


        ServicoPrestado servicoPrestado = new ServicoPrestado();
        servicoPrestado.setDescricao(dto.getDescricao());
        servicoPrestado.setData( data );
        servicoPrestado.setCliente(cliente);
        servicoPrestado.setValor( bigDecimalConverter.converter(dto.getPreco())  );

        return repository.save(servicoPrestado);
    }

    @GetMapping
    public List<ServicoPrestado> pesquisar(
            @RequestParam(value = "nome", required = false, defaultValue = "") String nome,
            @RequestParam(value = "mes", required = false) Integer mes
    ) {
        List<ServicoPrestado> servicos = repository.findByNomeClienteAndMes("%" + nome + "%", mes);
        return servicos;
    }
}
