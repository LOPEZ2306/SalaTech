package com.colegio.salatech.repositories;

import com.colegio.salatech.models.Estudiante;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EstudianteRepository extends CrudRepository<Estudiante, Long> {

    Page<Estudiante> findAll(Pageable pageable);

    Estudiante findByIdentificacion(String identificacion);

    Estudiante findByEmail(String email);
}
