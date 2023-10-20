package com.colegio.salatech.controllers;

import com.colegio.salatech.models.Computador;
import com.colegio.salatech.repositories.ComputadorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class ComputadorController {

    @Autowired
    private ComputadorRepository computadorRepository;

    @GetMapping("/getComputadores")
    public ResponseEntity<List<Computador>> getComputador(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    ) {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<Computador> pageResult = computadorRepository.findAll(pageable);

        List<Computador> computadores = pageResult.getContent();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Last-Page", String.valueOf(pageResult.getTotalPages())); // Agregamos el encabezado personalizado

        return ResponseEntity.ok().headers(headers).body(computadores);
    }

    @GetMapping("/getComputadorById/{id}")
    public ResponseEntity<?> getComputadorById(
            @PathVariable String id
    ) {
        Computador computador = computadorRepository.findById(Long.parseLong(id)).get();
        return ResponseEntity.ok().body(computador);
    }
}
