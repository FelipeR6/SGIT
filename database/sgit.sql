-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 13-05-2025 a las 01:58:10
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

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

DELIMITER $$
--
-- Procedimientos
--
DROP PROCEDURE IF EXISTS `DesencriptarContraseña`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `DesencriptarContraseña` ()   BEGIN
    DECLARE encryption_key VARCHAR(32);
    SET encryption_key = 'clave1'; 
    
    UPDATE usuario
    SET Contraseña = CAST(AES_DECRYPT(CAST(Contraseña AS BINARY), encryption_key) AS CHAR);
END$$

DROP PROCEDURE IF EXISTS `EncriptarContraseña`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `EncriptarContraseña` ()   BEGIN
    DECLARE encryption_key VARCHAR(32);
    SET encryption_key = 'clave1'; 
    
    UPDATE usuario
    SET Contraseña = AES_ENCRYPT(Contraseña, encryption_key);
END$$

DROP PROCEDURE IF EXISTS `gestionar_usuario`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `gestionar_usuario` (IN `accion` VARCHAR(10), IN `cod` VARCHAR(10), IN `nombre1` VARCHAR(30), IN `nombre2` VARCHAR(30), IN `apellido1` VARCHAR(30), IN `apellido2` VARCHAR(30), IN `tel1` VARCHAR(15), IN `tel2` VARCHAR(15), IN `correo` VARCHAR(50), IN `rol` INT)   BEGIN
    CASE accion
        WHEN 'create' THEN
            INSERT INTO usuario (Id_Usuario, Nombre_Usuario_1, Nombre_Usuario_2, Apellidos_Usuario_1, Apellidos_Usuario_2, Telefono_1_Usuario, Telefono_2_Usuario, Correo_Usuario, Id_Rol)
            VALUES (cod, nombre1, nombre2, apellido1, apellido2, tel1, tel2, correo, rol);
        
        WHEN 'read' THEN
            SELECT * FROM usuario
            WHERE Id_Usuario = cod;
        
        WHEN 'update' THEN
            UPDATE usuario
            SET Nombre_Usuario_1 = nombre1,
                Nombre_Usuario_2 = nombre2,
                Apellidos_Usuario_1 = apellido1,
                Apellidos_Usuario_2 = apellido2,
                Telefono_1_Usuario = tel1,
                Telefono_2_Usuario = tel2,
                Correo_Usuario = correo,
                Id_Rol = rol
            WHERE Id_Usuario = cod;
        
        WHEN 'delete' THEN
            DELETE FROM usuario
            WHERE Id_Usuario = cod;

        ELSE
            SIGNAL SQLSTATE '45000' SET MESSAGE_TEXT = 'Acción no válida. Use create, read, update, o delete.';
    END CASE;
END$$

DROP PROCEDURE IF EXISTS `ObtenerInformacionEquipo`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `ObtenerInformacionEquipo` (IN `equipo_id` INT)   BEGIN
    SELECT 
        e.Id_Equipos,
        e.Marca_Equipo,
        e.Año_Equipo,
        c.Nombre_Categoria,
        m.Caracteristicas_Modelo,
        m.Accesorios_Modelo,
        hv.Estado_Equipo,
        u.Nombre_Usuario_1,
        u.Apellidos_Usuario_1
    FROM 
        equipo e
    JOIN 
        categoria c ON e.Id_Categoria = c.Id_Categoria
    JOIN 
        modelo m ON e.Id_Modelo = m.Id_Modelo
    JOIN 
        hoja_vida_equipo hv ON e.Id_Equipos = hv.Id_Equipos
    JOIN 
        usuario u ON hv.Id_usuario = u.Id_Usuario
    WHERE 
        e.Id_Equipos = equipo_id;
END$$

DROP PROCEDURE IF EXISTS `RegistrarMantenimiento`$$
CREATE DEFINER=`root`@`localhost` PROCEDURE `RegistrarMantenimiento` (IN `fecha_inicio` DATE, IN `fecha_fin` DATE, IN `observaciones` VARCHAR(80), IN `equipo_id` INT, IN `usuario_id` INT)   BEGIN
    INSERT INTO mantenimiento (
        Fecha_Inicio_mantenimiento,
        Fecha_fin_mantenimiento,
        Observaciones,
        Id_Equipos,
        Id_Usuario
    )
    VALUES (
        fecha_inicio,
        fecha_fin,
        observaciones,
        equipo_id,
        usuario_id
    );
END$$

--
-- Funciones
--
DROP FUNCTION IF EXISTS `ContarEquiposEnUbicacion`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `ContarEquiposEnUbicacion` (`ubicacion_id` INT) RETURNS INT(11)  BEGIN
    DECLARE cantidad_equipos INT;
    SELECT COUNT(*)
    INTO cantidad_equipos
    FROM prestamo_equipo
    WHERE Id_Ubicacion = ubicacion_id;
    RETURN cantidad_equipos;
END$$

DROP FUNCTION IF EXISTS `ObtenerEstadoActualEquipo`$$
CREATE DEFINER=`root`@`localhost` FUNCTION `ObtenerEstadoActualEquipo` (`equipo_id` INT) RETURNS VARCHAR(30) CHARSET utf8mb4 COLLATE utf8mb4_general_ci  BEGIN
    DECLARE estado_actual VARCHAR(30);
    SELECT Estado_Equipo
    INTO estado_actual
    FROM hoja_vida_equipo
    WHERE Id_Equipos = equipo_id
    ORDER BY Fecha_ingreso DESC
    LIMIT 1;
    RETURN estado_actual;
END$$

DELIMITER ;

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `categoria`
--

DROP TABLE IF EXISTS `categoria`;
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

DROP TABLE IF EXISTS `equipo`;
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
(1, 'Dell OptiPlex 7080', 2026, 1, 3, 2),
(2, 'Apple MacBook Air (M1)', 2020, 2, 2, 2),
(3, 'Apple iPad Pro (4th Generation', 2020, 3, 3, 2),
(4, 'Epson PowerLite X49', 2021, 4, 4, 2),
(5, 'SMART Board MX Series', 2021, 5, 5, 2),
(6, 'Bose S1 Pro', 2018, 6, 6, 2),
(7, 'Canon Vixia HF G60', 2019, 7, 7, 2),
(8, 'Logitech MX Keys', 2019, 8, 8, 2),
(9, 'Logitech MX Master 3', 2019, 9, 9, 2),
(10, 'Anker USB-C Hub Adapter', 2021, 10, 10, 2),
(11, 'HP Pavilion Desktop TP01', 2023, 1, 11, 1),
(12, 'Dell Inspiron 3910', 2024, 1, 12, 3),
(13, 'Apple MacBook Pro M2', 2023, 2, 13, 3),
(14, 'BenQ MX560', 2022, 4, 14, 1),
(15, 'Samsung Flip Pro WM85B', 2023, 5, 15, 2),
(16, 'JBL PartyBox 310', 2021, 6, 16, 3),
(17, 'Sony FDR-AX700', 2020, 7, 17, 1),
(18, 'Microsoft All-in-One Media Key', 2022, 8, 18, 2),
(19, 'Razer Basilisk V3', 2023, 9, 19, 1),
(20, 'Ugreen USB-C Multifunction Ada', 2024, 10, 20, 3),
(21, 'Alienware Aurora R13', 2024, 1, 21, 2),
(22, 'ASUS ZenBook 15', 2023, 2, 22, 1),
(23, 'Apple iPad Pro M2 (6th Gen)', 2023, 3, 23, 3),
(24, 'ViewSonic PX748-4K', 2022, 4, 24, 2),
(25, 'Promethean ActivPanel 9 Premiu', 2024, 5, 25, 1),
(26, 'Yamaha StagePas 1K MKII', 2022, 6, 26, 3),
(27, 'Blackmagic URSA Mini Pro 12K', 2023, 7, 19, 2),
(28, 'Corsair K95 RGB Platinum XT', 2023, 8, 28, 3),
(32, 'Asus', 2026, 2, 3, 12);

-- Resto de las tablas y datos...
-- [El archivo SQL completo está incluido pero abreviado por brevedad]

COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
