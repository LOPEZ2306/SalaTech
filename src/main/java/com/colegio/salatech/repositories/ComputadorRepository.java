package com.colegio.salatech.repositories;

import com.colegio.salatech.models.Computador;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ComputadorRepository extends CrudRepository<Computador, Long> {

    Page<Computador> findAll(Pageable pageable);
}
