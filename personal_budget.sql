-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 21-08-2022 a las 16:44:59
-- Versión del servidor: 10.4.21-MariaDB
-- Versión de PHP: 8.0.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `personal_budget`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `balance`
--

CREATE TABLE `balance` (
  `id_balance` int(11) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL DEFAULT curdate()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `balance`
--

INSERT INTO `balance` (`id_balance`, `amount`, `date`) VALUES
(295, '65000.00', '2022-08-21');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `operations`
--

CREATE TABLE `operations` (
  `id_operation` int(10) UNSIGNED NOT NULL,
  `type` text NOT NULL,
  `concept` varchar(50) NOT NULL,
  `amount` decimal(10,2) NOT NULL,
  `date` date NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

--
-- Volcado de datos para la tabla `operations`
--

INSERT INTO `operations` (`id_operation`, `type`, `concept`, `amount`, `date`) VALUES
(129, 'ingreso', 'Sueldo', '65000.00', '2022-08-21');

--
-- Disparadores `operations`
--
DELIMITER $$
CREATE TRIGGER `checkOperation` BEFORE INSERT ON `operations` FOR EACH ROW BEGIN

SET NEW.type = LOWER(NEW.type);

IF NEW.type != 'egreso' AND NEW.type != 'ingreso' THEN
	SIGNAL SQLSTATE '50001';
END IF;
    
IF NEW.type = 'egreso' AND NEW.amount > 0 THEN
	SET NEW.amount = -NEW.amount;
END IF;
    
IF NEW.type = 'ingreso' AND NEW.amount < 0 THEN
	SET NEW.amount = -NEW.amount;
END IF;
END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `checkOperationUpdate` BEFORE UPDATE ON `operations` FOR EACH ROW BEGIN
  
IF OLD.type = 'egreso' AND NEW.amount > 0 THEN
	SET NEW.amount = -NEW.amount;
END IF;
    
IF OLD.type = 'ingreso' AND NEW.amount < 0 THEN
	SET NEW.amount = -NEW.amount;
END IF;

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateBalanceAfterInsert` AFTER INSERT ON `operations` FOR EACH ROW INSERT INTO balance (amount) VALUES((SELECT SUM(amount)
FROM operations))
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateBalanceBeforeDelete` BEFORE DELETE ON `operations` FOR EACH ROW BEGIN

SET @amountToDelete = 0;
SET @sumOfOperations = 0;
SET @total = 0;

SELECT amount INTO @amountToDelete
FROM operations
WHERE id_operation = OLD.id_operation;

SELECT SUM(amount) INTO @sumOfOperations
FROM operations;

SET @total = @sumOfOperations - @amountToDelete;

INSERT INTO balance (amount) VALUES(@total);

END
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `updateBalanceBeforeUpdate` BEFORE UPDATE ON `operations` FOR EACH ROW BEGIN

        IF NEW.amount != OLD.amount  THEN
            SET @sumAmount = 0;
            SET @sumAmount = (SELECT SUM(amount) FROM operations);
            SET @sumAmount = @sumAmount - OLD.amount + NEW.amount;
            INSERT INTO balance (amount) VALUES(@sumAmount);
        END IF;


END
$$
DELIMITER ;

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `balance`
--
ALTER TABLE `balance`
  ADD PRIMARY KEY (`id_balance`);

--
-- Indices de la tabla `operations`
--
ALTER TABLE `operations`
  ADD PRIMARY KEY (`id_operation`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `balance`
--
ALTER TABLE `balance`
  MODIFY `id_balance` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=296;

--
-- AUTO_INCREMENT de la tabla `operations`
--
ALTER TABLE `operations`
  MODIFY `id_operation` int(10) UNSIGNED NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=130;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
