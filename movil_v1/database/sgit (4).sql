-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 02-04-2025 a las 04:42:19
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.0.30

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `sgit`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

CREATE TABLE `categoria` (
  `Id_Categoria` int(5) NOT NULL,
  `Nombre_Categoria` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `categoria`
--

INSERT INTO `categoria` (`Id_Categoria`, `Nombre_Categoria`) VALUES
(1, 'Computadoras de escritorio'),
(2, 'Laptops'),
(3, 'Tablets'),
(4, 'Proyectores'),
(5, 'Pantallas interactivas'),
(6, 'Sistemas de sonido'),
(7, 'Cámaras de video'),
(8, 'Teclados'),
(9, 'Ratones'),
(10, 'Adaptadores y cargadores');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `equipo`
--

CREATE TABLE `equipo` (
  `Id_Equipos` int(5) NOT NULL,
  `Marca_Equipo` varchar(30) NOT NULL,
  `Año_Equipo` int(4) NOT NULL,
  `Id_Categoria` int(5) NOT NULL,
  `Id_Modelo` int(5) NOT NULL,
  `Id_Usuario` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `equipo`
--

INSERT INTO `equipo` (`Id_Equipos`, `Marca_Equipo`, `Año_Equipo`, `Id_Categoria`, `Id_Modelo`, `Id_Usuario`) VALUES
(1, 'Dell OptiPlex 7080', 2024, 1, 3, 2),
(2, 'Apple MacBook Air (M1)', 2020, 2, 2, 2),
(3, 'Apple iPad Pro (4th Generation', 2020, 3, 3, 2),
(4, 'Epson PowerLite X49', 2021, 4, 4, 2),
(5, 'SMART Board MX Series', 2021, 5, 5, 2),
(6, 'Bose S1 Pro', 2018, 6, 6, 2),
(7, 'Canon Vixia HF G60', 2019, 7, 7, 2),
(8, 'Logitech MX Keys', 2019, 8, 8, 2),
(9, 'Logitech MX Master 3', 2019, 9, 9, 2),
(10, 'Anker USB-C Hub Adapter', 2021, 10, 10, 2),
(15, 'lenovo', 2024, 2, 3, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `estado_equipo`
--

CREATE TABLE `estado_equipo` (
  `Id_Estado_equipo` int(5) NOT NULL,
  `Estado_Entregado` varchar(50) NOT NULL,
  `Estado_Recibido` varchar(50) NOT NULL,
  `Id_Equipos` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `estado_equipo`
--

INSERT INTO `estado_equipo` (`Id_Estado_equipo`, `Estado_Entregado`, `Estado_Recibido`, `Id_Equipos`) VALUES
(1, 'Total Funcionamiento', 'En Funcionamiento', 1),
(2, 'Funciona pero Bajo rendimiento', 'Dañado', 2),
(3, 'Funciona pero tiene cable de carga roto', 'Con la misma descripción', 3),
(4, 'Funciona pero no tiene internet', 'Con la misma descripcion', 4),
(5, 'Total Funcionamiento', 'Fuera de servicio', 5),
(6, 'Total Funcionamiento', 'En Funcionamiento', 6),
(7, 'Total Funcionamiento', 'Dañado', 7),
(8, 'Total Funcionamiento', 'Dañado', 8),
(9, 'Funciona pero tiene cable de carga roto', 'Con la misma descripcion', 9),
(10, 'Total Funcionamiento', 'En Funcionamiento', 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `hoja_vida_equipo`
--

CREATE TABLE `hoja_vida_equipo` (
  `Id_Hoja_vida_equipo` int(5) NOT NULL,
  `Id_Equipos` int(5) NOT NULL,
  `Estado_Equipo` varchar(30) NOT NULL,
  `Id_usuario` int(5) NOT NULL,
  `Fecha_ingreso` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `hoja_vida_equipo`
--

INSERT INTO `hoja_vida_equipo` (`Id_Hoja_vida_equipo`, `Id_Equipos`, `Estado_Equipo`, `Id_usuario`, `Fecha_ingreso`) VALUES
(1, 1, 'Optimo', 4, '2024-04-24'),
(2, 2, 'En uso', 8, '2024-02-15'),
(3, 3, 'Dañado', 4, '2024-03-13'),
(4, 4, 'Optimo', 4, '2024-03-15'),
(5, 5, 'Actualizado', 8, '2024-04-17'),
(6, 6, 'Optimo', 8, '2024-06-04'),
(7, 7, 'Dañado', 8, '2024-05-13'),
(8, 8, 'En uso', 4, '2024-07-10'),
(9, 9, 'Optimo', 8, '2024-03-24');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `mantenimiento`
--

CREATE TABLE `mantenimiento` (
  `Id_Mantenimiento` int(5) NOT NULL,
  `Fecha_Inicio_mantenimiento` date NOT NULL,
  `Fecha_fin_mantenimiento` date NOT NULL,
  `Observaciones` varchar(80) NOT NULL,
  `Id_Equipos` int(5) NOT NULL,
  `Id_Usuario` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `mantenimiento`
--

INSERT INTO `mantenimiento` (`Id_Mantenimiento`, `Fecha_Inicio_mantenimiento`, `Fecha_fin_mantenimiento`, `Observaciones`, `Id_Equipos`, `Id_Usuario`) VALUES
(1, '2023-08-08', '2023-08-16', 'Se realizo un cambio en el disco en el pc', 1, 3),
(2, '2023-08-09', '2023-08-17', 'Se realizo modificaciones en el hadware', 2, 3),
(3, '2023-08-10', '2023-08-18', 'Se realizo un cambio en el teclado', 10, 3),
(4, '2023-08-11', '2023-08-19', 'Se actualizo el computador', 2, 3),
(5, '2023-08-12', '2023-08-20', 'Se le instalo un programa solicitado', 2, 3),
(6, '2023-08-13', '2023-08-21', 'Se encontró una falla en la pantalla sin solución', 5, 3),
(7, '2023-08-14', '2023-08-22', 'Se cambio la entrada del pc', 10, 3),
(8, '2023-08-15', '2023-08-23', 'Se cambio la pila del pc', 2, 3),
(9, '2023-08-16', '2023-08-24', 'Se arreglo la entrada de auriculares', 6, 3),
(10, '2023-09-03', '2023-09-10', 'Se actualizo el software', 3, 3);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modelo`
--

CREATE TABLE `modelo` (
  `Id_Modelo` int(5) NOT NULL,
  `Caracteristicas_Modelo` varchar(50) NOT NULL,
  `Accesorios_Modelo` varchar(50) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `modelo`
--

INSERT INTO `modelo` (`Id_Modelo`, `Caracteristicas_Modelo`, `Accesorios_Modelo`) VALUES
(1, 'Procesador: Intel Core i7-10700 Memoria RAM: 16 GB', 'Teclado y ratón Dell'),
(2, 'Procesador: Apple M1 Memoria RAM: 8 GB', 'Adaptador USB-C a USB '),
(3, 'Pantalla: 11 pulgadas Liquid Retina Procesador: A1', 'Apple Pencil (2da generación)'),
(4, 'Resolución: XGA (1024 x 768) Conectividad: HDMI, V', 'Control remoto Cable HDMI'),
(5, 'Tamaño: 65 pulgadas Resolución: 4K Ultra HD', 'Lápices interactivos Módulo de sonido integrado'),
(6, 'Potencia: 150 W Batería recargable: Hasta 11 horas', 'Bolsa de transporte Soporte de altavoz'),
(7, 'Sensor: CMOS de 1.0 pulgada Resolución: 4K UHD', 'Micrófono externo Batería adicional'),
(8, 'inalámbrico iluminado Conectividad: USB-C, Bluetoo', 'Reposamuñecas'),
(9, 'Sensor: Darkfield de alta precisión Conectividad: ', 'Cable de carga USB-C'),
(10, 'Puertos: HDMI 4K, USB 3.0, USB-C PD, SD/MicroSD Co', 'Bolsa de transporte');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `prestamo_equipo`
--

CREATE TABLE `prestamo_equipo` (
  `Id_Prestamo_Equipo` int(5) NOT NULL,
  `Fecha_Prestamo_Equipo` date NOT NULL,
  `Fecha_entrega_prestamo` date NOT NULL,
  `Id_Usuario` int(5) NOT NULL,
  `Id_Equipos` int(5) NOT NULL,
  `Id_Ubicacion` int(5) NOT NULL,
  `Id_Estado_Equipo` int(5) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `prestamo_equipo`
--

INSERT INTO `prestamo_equipo` (`Id_Prestamo_Equipo`, `Fecha_Prestamo_Equipo`, `Fecha_entrega_prestamo`, `Id_Usuario`, `Id_Equipos`, `Id_Ubicacion`, `Id_Estado_Equipo`) VALUES
(1, '2024-02-02', '2024-02-02', 1, 1, 1, 1),
(2, '2024-02-02', '2024-02-02', 2, 2, 2, 2),
(3, '2024-02-03', '2024-02-03', 3, 3, 3, 3),
(4, '2024-02-04', '2024-02-04', 4, 4, 4, 4),
(5, '2024-02-05', '2024-02-05', 5, 5, 5, 5),
(6, '2024-02-06', '2024-02-06', 6, 6, 6, 6),
(7, '2024-02-07', '2024-02-07', 7, 7, 7, 7),
(8, '2024-02-08', '2024-02-08', 8, 8, 8, 8),
(9, '2024-02-09', '2024-02-09', 9, 9, 9, 9),
(10, '2024-02-10', '2024-02-10', 10, 10, 10, 10);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `rol`
--

CREATE TABLE `rol` (
  `Id_Rol` int(5) NOT NULL,
  `Nombre_Rol` varchar(30) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `rol`
--

INSERT INTO `rol` (`Id_Rol`, `Nombre_Rol`) VALUES
(1, 'Adminstrador'),
(2, 'Almacenista'),
(3, 'Docente'),
(4, 'Tecnico');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `ubicacion`
--

CREATE TABLE `ubicacion` (
  `Id_Ubicacion` int(5) NOT NULL,
  `Nombre_Ubicacion` varchar(20) NOT NULL,
  `Prestamo_disponible` varchar(10) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `ubicacion`
--

INSERT INTO `ubicacion` (`Id_Ubicacion`, `Nombre_Ubicacion`, `Prestamo_disponible`) VALUES
(1, 'Salon 301', 'Si'),
(2, 'Salon 302', 'No'),
(3, 'Salon 303', 'Si'),
(4, 'Salon 404', 'No'),
(5, 'Salon 505', 'Si'),
(6, 'Salon 606', 'No'),
(7, 'Salon 707', 'Si'),
(8, 'Salon 808', 'No'),
(9, 'Salon 909', 'No'),
(10, 'Salon 101', 'No');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuario`
--

CREATE TABLE `usuario` (
  `Id_Usuario` int(5) NOT NULL,
  `Usuario` varchar(30) NOT NULL,
  `Nombre_Usuario_1` varchar(30) NOT NULL,
  `Nombre_Usuario_2` varchar(40) NOT NULL,
  `Apellidos_Usuario_1` varchar(30) NOT NULL,
  `Apellidos_Usuario_2` varchar(30) NOT NULL,
  `Telefono_1_Usuario` varchar(15) NOT NULL,
  `Telefono_2_Usuario` varchar(15) NOT NULL,
  `Correo_Usuario` varchar(50) NOT NULL,
  `Contraseña` varchar(40) NOT NULL,
  `Id_Rol` int(5) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1 COLLATE=latin1_swedish_ci;

--
-- Volcado de datos para la tabla `usuario`
--

INSERT INTO `usuario` (`Id_Usuario`, `Usuario`, `Nombre_Usuario_1`, `Nombre_Usuario_2`, `Apellidos_Usuario_1`, `Apellidos_Usuario_2`, `Telefono_1_Usuario`, `Telefono_2_Usuario`, `Correo_Usuario`, `Contraseña`, `Id_Rol`) VALUES
(1, 'Toño20', 'ANTONIO', 'FRANCISCO', 'GARCIA ', 'HERNANDEZ', '3025698723', '3217896420', 'anderson@gmailcom', 't10', 1),
(2, 'manuel302', 'MANUEL', 'EDUARDO', 'FERNANDEZ ', 'MARTINEZ', '3027891523', '', 'felipe@gmail.com', 't11', 2),
(3, 'joseagon', 'JOSE', 'ALVERTO', 'GONZALEZ ', 'PONS', '3025863253', '', 'camila@gmail.com', 't12', 3),
(4, 'Francis1100', 'FRANCISCO', 'MIGUEL', 'MARTINEZ ', 'FERNANDEZ', '3022310104', '3226565663', 'leo@gmail.com', 't13', 4),
(5, 'SebasL85', 'DAVID', 'SEBASTIAN', 'PEREZ ', 'LOPEZ', '3027863253', '', 'jam@gmail.com', 't14', 1),
(6, 'ltorJuan45', 'JUAN', '', 'LOPEZ ', 'TORRES', '3021251430', '', 'juan@gmail.com', 't15', 2),
(7, 'Dariojavier', 'JAVIER ', 'DARIO', 'RODRIGUEZ ', 'SANCHEZ', '3024540152', '', 'javier@gmail.com', 't16', 3),
(8, 'dsanchez', 'DANIEL', '', 'SANCHEZ ', 'RODRIGUEZ', '3022105214', '', 'daniel@gmail.com', 'ter17', 4),
(9, 'jose22', 'JOSE ', 'ANTONIO', 'JIMENEZ ', 'GONZALEZ', '3025214541', '', 'jose@gmail.com', 'efyiu789', 1),
(10, 'Fra20', 'FRANCISCO  ', '', 'GOMEZ ', 'PEREZ', '3022145630', '', 'francisco@gmail.com', 'tegya34', 2),
(12, 'FelipeR', 'Miguel', 'Felipe', 'Linares', 'Riaño', '3217285271', '', 'mglnares2006@gmail.com', '031006', 1),
(13, 'CamilaP', 'Maria', 'Camila', 'Puerto', 'Guerrero', '3022587891', '', 'mcamilaguerrero191@gmail.com ', 'Camila05', 2),
(14, 'AndersonG', 'Anderson', '', 'Lopez', 'Gil', '3028628415', '3238173836', 'andersonlopezgil593@gmial.com ', 'Andelo5', 3),
(15, 'DanielaP', 'Daniela', '', 'Palacio', 'Estrada', '3237372688', '', 'palaciodaniela563@gmail.com', 'Itachi24', 1);

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `categoria`
--
ALTER TABLE `categoria`
  ADD PRIMARY KEY (`Id_Categoria`);

--
-- Indices de la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD PRIMARY KEY (`Id_Equipos`),
  ADD KEY `Fk_Equi_usu` (`Id_Usuario`),
  ADD KEY `Fk_Equi_cat` (`Id_Categoria`),
  ADD KEY `fk_equ_mod` (`Id_Modelo`);

--
-- Indices de la tabla `estado_equipo`
--
ALTER TABLE `estado_equipo`
  ADD PRIMARY KEY (`Id_Estado_equipo`),
  ADD KEY `fk_estado_equipo_equipo` (`Id_Equipos`);

--
-- Indices de la tabla `hoja_vida_equipo`
--
ALTER TABLE `hoja_vida_equipo`
  ADD PRIMARY KEY (`Id_Hoja_vida_equipo`),
  ADD KEY `Fk_hv_usu` (`Id_usuario`),
  ADD KEY `Fk_hv_equ` (`Id_Equipos`);

--
-- Indices de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD PRIMARY KEY (`Id_Mantenimiento`),
  ADD KEY `Fk_Man_usu` (`Id_Usuario`),
  ADD KEY `Fk_equi_man` (`Id_Equipos`);

--
-- Indices de la tabla `modelo`
--
ALTER TABLE `modelo`
  ADD PRIMARY KEY (`Id_Modelo`);

--
-- Indices de la tabla `prestamo_equipo`
--
ALTER TABLE `prestamo_equipo`
  ADD PRIMARY KEY (`Id_Prestamo_Equipo`),
  ADD KEY `Fk_pe_usu` (`Id_Usuario`),
  ADD KEY `Fk_pe_ubi` (`Id_Ubicacion`),
  ADD KEY `Fk_pe_e` (`Id_Estado_Equipo`),
  ADD KEY `Fk_pe_eq` (`Id_Equipos`);

--
-- Indices de la tabla `rol`
--
ALTER TABLE `rol`
  ADD PRIMARY KEY (`Id_Rol`);

--
-- Indices de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  ADD PRIMARY KEY (`Id_Ubicacion`);

--
-- Indices de la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`Id_Usuario`),
  ADD KEY `Fk_Usu_rol` (`Id_Rol`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `categoria`
--
ALTER TABLE `categoria`
  MODIFY `Id_Categoria` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `equipo`
--
ALTER TABLE `equipo`
  MODIFY `Id_Equipos` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `estado_equipo`
--
ALTER TABLE `estado_equipo`
  MODIFY `Id_Estado_equipo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `hoja_vida_equipo`
--
ALTER TABLE `hoja_vida_equipo`
  MODIFY `Id_Hoja_vida_equipo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  MODIFY `Id_Mantenimiento` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `modelo`
--
ALTER TABLE `modelo`
  MODIFY `Id_Modelo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `prestamo_equipo`
--
ALTER TABLE `prestamo_equipo`
  MODIFY `Id_Prestamo_Equipo` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `rol`
--
ALTER TABLE `rol`
  MODIFY `Id_Rol` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `ubicacion`
--
ALTER TABLE `ubicacion`
  MODIFY `Id_Ubicacion` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `usuario`
--
ALTER TABLE `usuario`
  MODIFY `Id_Usuario` int(5) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `equipo`
--
ALTER TABLE `equipo`
  ADD CONSTRAINT `Fk_Equi_cat` FOREIGN KEY (`Id_Categoria`) REFERENCES `categoria` (`Id_Categoria`),
  ADD CONSTRAINT `Fk_Equi_usu` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuario` (`Id_Usuario`),
  ADD CONSTRAINT `fk_equ_mod` FOREIGN KEY (`Id_Modelo`) REFERENCES `modelo` (`Id_Modelo`);

--
-- Filtros para la tabla `estado_equipo`
--
ALTER TABLE `estado_equipo`
  ADD CONSTRAINT `fk_estado_equipo_equipo` FOREIGN KEY (`Id_Equipos`) REFERENCES `equipo` (`Id_Equipos`) ON DELETE CASCADE;

--
-- Filtros para la tabla `hoja_vida_equipo`
--
ALTER TABLE `hoja_vida_equipo`
  ADD CONSTRAINT `Fk_hv_equ` FOREIGN KEY (`Id_Equipos`) REFERENCES `equipo` (`Id_Equipos`),
  ADD CONSTRAINT `Fk_hv_usu` FOREIGN KEY (`Id_usuario`) REFERENCES `usuario` (`Id_Usuario`);

--
-- Filtros para la tabla `mantenimiento`
--
ALTER TABLE `mantenimiento`
  ADD CONSTRAINT `Fk_Man_usu` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuario` (`Id_Usuario`),
  ADD CONSTRAINT `Fk_equi_man` FOREIGN KEY (`Id_Equipos`) REFERENCES `equipo` (`Id_Equipos`);

--
-- Filtros para la tabla `prestamo_equipo`
--
ALTER TABLE `prestamo_equipo`
  ADD CONSTRAINT `Fk_pe_e` FOREIGN KEY (`Id_Estado_Equipo`) REFERENCES `estado_equipo` (`Id_Estado_equipo`),
  ADD CONSTRAINT `Fk_pe_eq` FOREIGN KEY (`Id_Equipos`) REFERENCES `equipo` (`Id_Equipos`),
  ADD CONSTRAINT `Fk_pe_ubi` FOREIGN KEY (`Id_Ubicacion`) REFERENCES `ubicacion` (`Id_Ubicacion`),
  ADD CONSTRAINT `Fk_pe_usu` FOREIGN KEY (`Id_Usuario`) REFERENCES `usuario` (`Id_Usuario`);

--
-- Filtros para la tabla `usuario`
--
ALTER TABLE `usuario`
  ADD CONSTRAINT `Fk_Usu_rol` FOREIGN KEY (`Id_Rol`) REFERENCES `rol` (`Id_Rol`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
