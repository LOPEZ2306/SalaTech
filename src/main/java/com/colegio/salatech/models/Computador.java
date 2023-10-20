package com.colegio.salatech.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name="computadores")
public class Computador {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_computador;

    private String marca;

    private String estado;

}
