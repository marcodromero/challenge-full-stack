CHALLENGE FULL STACK 

BASE DE DATOS
La base de datos cuenta con triggers que se activan con diferentes eventos.
Se incluye entre los archivos del repositorio.

Estructura de las tablas: 
Tabla 'operations' (id_operation, type , concept, amount ,date)
Tabla 'balance' (id_balance, amount, date)

Triggers:

CHECKOPERATION - Antes de insertar una fila en la tabla 'operations'

    BEGIN

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

CHECKOPERATIONUPDATE - Antes de actualizar fila en la tabla 'operations'

    BEGIN
    
        IF OLD.type = 'egreso' AND NEW.amount > 0 THEN
            SET NEW.amount = -NEW.amount;
        END IF;
            
        IF OLD.type = 'ingreso' AND NEW.amount < 0 THEN
            SET NEW.amount = -NEW.amount;
        END IF;

    END

UPDATEBALANCEAFTERINSERT - Despues de insertar una fila en la tabla 'operations'

    INSERT INTO balance (amount) VALUES((SELECT SUM(amount)
    FROM operations))

UPDATEBALANCEBEFOREUPDATE - Antes de modificar una fila en la tabla 'operations'
    
    BEGIN

        IF NEW.amount != OLD.amount  THEN
            SET @sumAmount = 0;
            SET @sumAmount = (SELECT SUM(amount) FROM operations);
            SET @sumAmount = @sumAmount - OLD.amount + NEW.amount;
            INSERT INTO balance (amount) VALUES(@sumAmount);
        END IF;


    END

UPDATEBALANCEBEFOREDELETE - Antes de eliminar una fila en la tabla 'operations

    BEGIN

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