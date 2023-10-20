package com.colegio.salatech.models;

import jakarta.persistence.*;
import lombok.*;

@Data
@Entity
@Table(name = "estudiantes")
public class Estudiante {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id_estudiante;

    private String identificacion;

    private String nombres;

    private String grupo;

    private String contrasena;

    private String email;
}
