DROP PROCEDURE IF EXISTS newSeller;
DELIMITER //
CREATE PROCEDURE newSeller (
    _name                VARCHAR(50), 
    _lastname            VARCHAR(50), 
    _phone               VARCHAR(13), 
    _address             VARCHAR(55), 
    _city                VARCHAR(35), 
    _state               VARCHAR(35), 
    _postal_code         VARCHAR(10), 
    _country             VARCHAR(45),
    _id_office_manager   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_name VARCHAR(50);
    DECLARE aux_lastname VARCHAR(50);
    
    SET aux_name     = (SELECT s.name FROM sellers as s WHERE s.name = _name);
    SET aux_lastname = (SELECT s.lastname FROM sellers as s WHERE s.lastname = _lastname);
    
    IF (aux_name = _name AND aux_lastname = _lastname) THEN
		SELECT 'Error: This seller is already exists within the database' as error;
	ELSEIF (_name = '' OR _lastname = '') THEN
		SELECT 'Error: You have empty inputs' as error;
	ELSE
        INSERT INTO sellers (name, lastname, phone, address, city, state, postal_code, country, id_office_manager, id_user)
        VALUES (_name, _lastname, _phone, _address, _city, _state, _postal_code, _country, _id_office_manager, 1);  

        SELECT 'Success: The seller have been save' as success;
	END IF;
END
// DELIMITER ;

-- TESTING ------------------------------------------------------------------------------
INSERT INTO sellers (name, lastname, phone, address, city, state, postal_code, country, id_office_manager)
VALUES ('Carlos', 'Gastron', '3128906534' , 'Centro calle nose #4343', 'Colima','Colima', '28023', 'Mexico', 1);

INSERT INTO sellers (name, lastname, phone, address, city, state, postal_code, country, id_office_manager)
VALUES ('Alberto', 'Rubio', '3148635543', 'Centro calle nose #3343', 'Manzanillo','Colima', '29326', 'Mexico', 2);

SELECT * FROM sellers;

CALL newSeller('Anastacia', 'Paulino', '3148635543', 'Centro calle nose #3343', 'Manzanillo','Colima', '29326', 'Mexico', 2);

SET FOREIGN_KEY_CHECKS=0;
TRUNCATE TABLE sellers;
SET FOREIGN_KEY_CHECKS=1;