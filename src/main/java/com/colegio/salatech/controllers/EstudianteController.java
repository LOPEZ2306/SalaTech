package com.colegio.salatech.controllers;

import com.colegio.salatech.models.Estudiante;
import com.colegio.salatech.repositories.EstudianteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
public class EstudianteController {

    @Autowired
    private EstudianteRepository estudianteRepository;

    @GetMapping("/getEstudiantes")
    public ResponseEntity<List<Estudiante>> getEstudiantes(
            @RequestParam(defaultValue = "1") int page,
            @RequestParam(defaultValue = "6") int pageSize
    )  {
        Pageable pageable = PageRequest.of(page - 1, pageSize);
        Page<Estudiante> pageResult = estudianteRepository.findAll(pageable);

        List<Estudiante> estudiantes = pageResult.getContent();
        HttpHeaders headers = new HttpHeaders();
        headers.add("X-Last-Page", String.valueOf(pageResult.getTotalPages())); // Agregamos el encabezado personalizado

        return ResponseEntity.ok().headers(headers).body(estudiantes);
    }

    @GetMapping("/getEstudianteByIdentificacion/{identificacion}")
    public ResponseEntity<?> getEstudianteByIdentificacion(
            @PathVariable String identificacion
    )  {
        Estudiante estudiante = estudianteRepository.findByIdentificacion(identificacion);
        return ResponseEntity.ok().body(estudiante);
    }

    @PostMapping("/createEstudiante")
    public ResponseEntity<?> createEstudiante(
            @RequestBody Estudiante estudiante
    ) {
        Estudiante estudianteCreated = estudianteRepository.save(estudiante);
        return ResponseEntity.ok().body(estudianteCreated);
    }

    @PutMapping("/updateEstudiante/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id, @RequestBody Estudiante estudiante) {

        Optional<Estudiante> estudianteEntityOptional = estudianteRepository.findById(id);

        if (estudianteEntityOptional.isPresent()) {
            Estudiante estudianteEntity = estudianteEntityOptional.get();
            estudianteEntity.setIdentificacion(estudiante.getIdentificacion());
            estudianteEntity.setNombres(estudiante.getNombres());
            estudianteEntity.setGrupo(estudiante.getGrupo());
            estudianteEntity.setEmail(estudiante.getEmail() );

            estudianteRepository.save(estudianteEntity);

            return ResponseEntity.ok().body(estudianteEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @DeleteMapping("/deleteEstudiante/{id}")
    public ResponseEntity<?> deleteEstudiante(@PathVariable Long id) {
        Optional<Estudiante> estudianteEntityOptional = estudianteRepository.findById(id);

        if (estudianteEntityOptional.isPresent()) {
            estudianteRepository.deleteById(id);
            return ResponseEntity.ok().build();
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Estudiante estudiante) {
        Estudiante estudianteEntity = estudianteRepository.findByEmail(estudiante.getEmail());

        if (estudianteEntity != null && estudianteEntity.getContrasena().equals(estudiante.getContrasena())) {
            return ResponseEntity.ok().body(estudianteEntity);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping("/getEstudianteById/{id}")
    public ResponseEntity<?> getEstudianteById(
            @PathVariable Long id
    )  {

        Optional<Estudiante> estudiante = estudianteRepository.findById(id);
        return ResponseEntity.ok().body(estudiante);
    }
}