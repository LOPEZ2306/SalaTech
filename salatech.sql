
CREATE TABLE `computadores` (
  `id_computador` int(11) NOT NULL,
  `marca` varchar(15) NOT NULL,
  `estado` varchar(5) NOT NULL
);

INSERT INTO `computadores` (`id_computador`, `marca`, `estado`) VALUES
(1, 'lenovo', 'FALSE');

CREATE TABLE `estudiantes` (
  `id_estudiante` int(11) NOT NULL,
  `identificacion` varchar(20) NOT NULL,
  `nombres` varchar(30) NOT NULL,
  `grupo` varchar(5) NOT NULL,
  `contraseña` varchar(20) NOT NULL,
  `email` varchar(50) NOT NULL
);

INSERT INTO `estudiantes` (`id_estudiante`, `identificacion`, `nombres`, `grupo`, `contraseña`, `email`) VALUES
(1, '123', 'Evelin', 'XI-8', '1234', 'eve@gmail.com'),
(3, '720', 'Juan Lopez', 'XI-8', '123', 'lomasfresa@inemjose.edu.co'),
(4, 'a', 'a', 'a', 'a', 'a@gmail.com'),
(5, 'b', 'b', 'b', 'b', 'b@gmail.com');

ALTER TABLE `computadores`
  ADD PRIMARY KEY (`id_computador`);

ALTER TABLE `estudiantes`
  ADD PRIMARY KEY (`id_estudiante`);

ALTER TABLE `computadores`
  MODIFY `id_computador` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

ALTER TABLE `estudiantes`
  MODIFY `id_estudiante` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;
COMMIT;