DROP PROCEDURE IF EXISTS deleteGlobalManagerAccount;
DELIMITER //
CREATE PROCEDURE deleteGlobalManagerAccount (
    _id_account   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_id_global_manager INTEGER;
    DECLARE aux_id_account INTEGER;

    SET aux_search = (SELECT a.id_account FROM accounts as a WHERE a.id_account = _id_account LIMIT 1);
    SET aux_id_global_manager  = (SELECT s.id_global_manager FROM global_managers as s WHERE s.id_account = aux_search LIMIT 1);
    SET aux_id_account = (SELECT s.id_account FROM global_managers as s WHERE s.id_global_manager = aux_id_global_manager LIMIT 1);

    IF (aux_search = _id_account) THEN
		SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM accounts WHERE accounts.id_account = _id_account;
		UPDATE global_managers as s SET s.id_account = 1 WHERE s.id_global_manager = aux_id_global_manager;
        SET FOREIGN_KEY_CHECKS=1;
        SELECT 'Success: The account has been deleted' as success;
	ELSE 
	   SELECT 'Error: This account is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS deleteOfficeManagerAccount;
DELIMITER //
CREATE PROCEDURE deleteOfficeManagerAccount (
    _id_account   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_id_office_manager INTEGER;
    DECLARE aux_id_account INTEGER;

    SET aux_search = (SELECT a.id_account FROM accounts as a WHERE a.id_account = _id_account LIMIT 1);
    SET aux_id_office_manager  = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_account = aux_search LIMIT 1);
    SET aux_id_account = (SELECT s.id_account FROM office_managers as s WHERE s.id_office_manager = aux_id_office_manager LIMIT 1);

    IF (aux_search = _id_account) THEN
		SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM accounts WHERE accounts.id_account = _id_account;
		UPDATE office_managers as s SET s.id_account = 1 WHERE s.id_office_manager = aux_id_office_manager;
        SET FOREIGN_KEY_CHECKS=1;
        SELECT 'Success: The account has been deleted' as success;
	ELSE 
	   SELECT 'Error: This account is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS deleteSellerAccount;
DELIMITER //
CREATE PROCEDURE deleteSellerAccount (
    _id_account   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_id_seller INTEGER;
    DECLARE aux_id_account INTEGER;

    SET aux_search = (SELECT a.id_account FROM accounts as a WHERE a.id_account = _id_account LIMIT 1);
    SET aux_id_seller  = (SELECT s.id_seller FROM sellers as s WHERE s.id_account = aux_search LIMIT 1);
    SET aux_id_account = (SELECT s.id_account FROM sellers as s WHERE s.id_seller = aux_id_seller LIMIT 1);

    IF (aux_search = _id_account) THEN
		SET FOREIGN_KEY_CHECKS=0;
        DELETE FROM accounts WHERE accounts.id_account = _id_account;
		UPDATE sellers as s SET s.id_account = 1 WHERE s.id_seller = aux_id_seller;
        SET FOREIGN_KEY_CHECKS=1;
        SELECT 'Success: The account has been deleted' as success;
	ELSE 
	   SELECT 'Error: This account is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS itemRemovedAccount;
DELIMITER //
CREATE PROCEDURE itemRemovedAccount (
    _id   INTEGER,
    _typeAccount VARCHAR(30)
)

DETERMINISTIC
BEGIN
    IF (STRCMP(_typeAccount, 'Seller') = 0 ) THEN
        SELECT s.id_seller, s.name, s.job FROM sellers as s WHERE s.id_account = _id LIMIT 1;
    ELSEIF (STRCMP(_typeAccount,'Office Manager') = 0) THEN
        SELECT s.id_office_manager, s.name, s.job FROM office_managers as s WHERE s.id_account = _id LIMIT 1;
    ELSEIF (STRCMP(_typeAccount, 'Global Manager') = 0) THEN
        SELECT s.id_global_manager, s.name, s.job FROM global_managers as s WHERE s.id_account = _id LIMIT 1;
	ELSE 
		SELECT 'empty';
    END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS newAccountToGlobalManager;
DELIMITER //
CREATE PROCEDURE newAccountToGlobalManager (
	_account      VARCHAR(55),
	_email        VARCHAR(100), 
	_pass	      VARCHAR(60), 
	_typeAccount  VARCHAR(60),
	_id_global_manager    INTEGER
	)

DETERMINISTIC
BEGIN
	DECLARE aux_account VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    DECLARE aux_id_global_manager INTEGER;
	DECLARE aux_id_account INTEGER; 

    SET aux_account   = (SELECT u.username FROM accounts as u WHERE u.username = _account ORDER BY u.id_account LIMIT 1);
    SET aux_email     = (SELECT u.email FROM accounts as u WHERE u.email = _email ORDER BY u.id_account LIMIT 1);
    SET aux_id_global_manager = (SELECT s.id_global_manager FROM global_managers as s WHERE s.id_global_manager = _id_global_manager ORDER BY id_global_manager LIMIT 1);

	IF (aux_id_global_manager = _id_global_manager) THEN
		IF (aux_account = _account OR aux_email = _email) THEN
			SELECT 'Error: Account or email already exists' as error;
		ELSE IF (_account = '' OR _email = '' OR _pass = '') THEN
			SELECT 'Error: You have empty inputs' as error;
		ELSE
			INSERT INTO accounts (username, email, password, typeAccount) VALUES (_account, _email, _pass, _typeAccount);
			SET aux_id_account = (SELECT u.id_account FROM accounts as u WHERE u.username = _account AND u.email = _email LIMIT 1);

			UPDATE global_managers as s SET s.id_account = aux_id_account WHERE s.id_global_manager = _id_global_manager;
			
			SELECT 'Success: The Account have been save' as success;
		END IF;
	END IF;
	ELSE
		SELECT 'Error: The reference global manager is not exists, please select a global manager' as error;
	END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS newAccountToOfficeManager;
DELIMITER //
CREATE PROCEDURE newAccountToOfficeManager (
	_account      VARCHAR(55),
	_email        VARCHAR(100), 
	_pass	      VARCHAR(60), 
	_typeAccount  VARCHAR(60),
	_id_office_manager    INTEGER
	)

DETERMINISTIC
BEGIN
	DECLARE aux_account VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    DECLARE aux_id_office_manager INTEGER;
	DECLARE aux_id_account INTEGER; 

    SET aux_account   = (SELECT u.username FROM accounts as u WHERE u.username = _account ORDER BY u.id_account LIMIT 1);
    SET aux_email     = (SELECT u.email FROM accounts as u WHERE u.email = _email ORDER BY u.id_account LIMIT 1);
    SET aux_id_office_manager = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_office_manager = _id_office_manager ORDER BY id_office_manager LIMIT 1);

	IF (aux_id_office_manager = _id_office_manager) THEN
		IF (aux_account = _account OR aux_email = _email) THEN
			SELECT 'Error: Account or email already exists' as error;
		ELSE IF (_account = '' OR _email = '' OR _pass = '') THEN
			SELECT 'Error: You have empty inputs' as error;
		ELSE
			INSERT INTO accounts (username, email, password, typeAccount) VALUES (_account, _email, _pass, _typeAccount);
			SET aux_id_account = (SELECT u.id_account FROM accounts as u WHERE u.username = _account AND u.email = _email LIMIT 1);

			UPDATE office_managers as s SET s.id_account = aux_id_account WHERE s.id_office_manager = _id_office_manager;
			
			SELECT 'Success: The Account have been save' as success;
		END IF;
	END IF;
	ELSE
		SELECT 'Error: The reference office managers is not exists, please select a office managers' as error;
	END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS newAccountToSeller;
DELIMITER //
CREATE PROCEDURE newAccountToSeller (
	_account      VARCHAR(55),
	_email        VARCHAR(100), 
	_pass	      VARCHAR(60), 
	_typeAccount  VARCHAR(60),
	_id_seller    INTEGER
	)

DETERMINISTIC
BEGIN
	DECLARE aux_account VARCHAR(15);
    DECLARE aux_email VARCHAR(60);
    DECLARE aux_id_seller INTEGER;
	DECLARE aux_id_account INTEGER; 

    SET aux_account   = (SELECT u.username FROM accounts as u WHERE u.username = _account ORDER BY u.id_account LIMIT 1);
    SET aux_email     = (SELECT u.email FROM accounts as u WHERE u.email = _email ORDER BY u.id_account LIMIT 1);
    SET aux_id_seller = (SELECT s.id_seller FROM sellers as s WHERE s.id_seller = _id_seller ORDER BY id_seller LIMIT 1);

	IF (aux_id_seller = _id_seller) THEN
		IF (aux_account = _account OR aux_email = _email) THEN
			SELECT 'Error: Account or email already exists' as error;
		ELSE IF (_account = '' OR _email = '' OR _pass = '') THEN
			SELECT 'Error: You have empty inputs' as error;
		ELSE
			INSERT INTO accounts (username, email, password, typeAccount) VALUES (_account, _email, _pass, _typeAccount);
			SET aux_id_account = (SELECT u.id_account FROM accounts as u WHERE u.username = _account AND u.email = _email LIMIT 1);

			UPDATE sellers as s SET s.id_account = aux_id_account WHERE s.id_seller = _id_seller;
			
			SELECT 'Success: The Account have been save' as success;
		END IF;
	END IF;
	ELSE
		SELECT 'Error: The reference seller is not exists, please select a seller' as error;
	END IF;
END
// DELIMITER ;


DROP PROCEDURE IF EXISTS allCarsFromSeller;
DELIMITER //
CREATE PROCEDURE allCarsFromSeller (_id_account INTEGER)

DETERMINISTIC
BEGIN

	DECLARE _id_seller INTEGER;

	SET _id_seller = ( SELECT s.id_seller FROM sellers as s INNER JOIN accounts as a ON a.id_account = _id_account limit 1);
	
	SELECT 	st.id_stock as id, 
			car.name    as name, 
			cm.model    as model, 
			car.details as details, 
			cm.cost     as cost,
            cs.status   as status
	FROM stocks as st
    INNER JOIN cars as car ON st.id_car = car.id_car
    INNER JOIN cars_models as cm ON car.id_car_model = cm.id_car_model
    INNER JOIN cars_status as cs ON car.id_car_status = cs.id_car_status
    WHERE st.id_office = (SELECT o.id_office FROM offices as o
							INNER JOIN office_managers om ON om.id_office_manager = o.id_office_manager
                            WHERE om.id_office_manager = (SELECT s.id_office_manager FROM sellers as s
														  WHERE s.id_seller = _id_seller));
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS newCustomer;
DELIMITER //
CREATE PROCEDURE newCustomer (
    _name                VARCHAR(50), 
    _lastname            VARCHAR(50), 
    _phone               VARCHAR(13), 
    _address             VARCHAR(55), 
    _city                VARCHAR(35), 
    _state               VARCHAR(35), 
    _postal_code         VARCHAR(10), 
    _country             VARCHAR(45),
    _id_account          INTEGER
)

DETERMINISTIC
BEGIN
	-- DECLARE aux_name VARCHAR(50);
    -- DECLARE aux_lastname VARCHAR(50);

    	DECLARE _id_seller INTEGER;

        SET _id_seller = ( SELECT s.id_seller FROM sellers as s INNER JOIN accounts as a ON a.id_account = _id_account limit 1);
    
    -- SET aux_name     = (SELECT s.name FROM customers as s WHERE s.name = _name ORDER BY s.id_seller LIMIT 1);
    -- SET aux_lastname = (SELECT s.lastname FROM customers as s WHERE s.lastname = _lastname ORDER BY s.id_seller LIMIT 1);
    
    -- IF (aux_name = _name AND aux_lastname = _lastname) THEN
	-- 	SELECT 'Error: This seller is already exists within the database' as error;
	-- ELSE 
    IF (_name = '' OR _lastname = '') THEN
		SELECT 'Error: You have empty inputs' as error;
	ELSE 
        INSERT INTO customers (name, lastname, phone, address, city, state, postal_code, country, id_seller)
        VALUES (_name, _lastname, _phone, _address, _city, _state, _postal_code, _country, _id_seller);  

        SELECT 'Success: The seller have been save' as success;
	END IF;
    -- END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS login;
DELIMITER //
CREATE PROCEDURE login (
    _username VARCHAR(50) 
)

DETERMINISTIC
BEGIN
    DECLARE _id_account  INTEGER;
	DECLARE _email       VARCHAR(250);
    DECLARE _password    VARCHAR(250);
    DECLARE _typeAccount VARCHAR(250);
    DECLARE _id_user     INTEGER;

    SET _id_account  = ( SELECT a.id_account  FROM accounts as a WHERE username = _username ORDER BY a.id_account  LIMIT 1 );    
    SET _email       = ( SELECT a.email       FROM accounts as a WHERE username = _username ORDER BY a.email       LIMIT 1 );
    SET _password    = ( SELECT a.password    FROM accounts as a WHERE username = _username ORDER BY a.password    LIMIT 1 );    
    SET _typeAccount = ( SELECT a.typeAccount FROM accounts as a WHERE username = _username ORDER BY a.typeAccount LIMIT 1 );

    IF (STRCMP(_typeAccount, 'Seller') = 0 ) THEN

        SET _id_user = (SELECT s.id_seller  FROM sellers as s WHERE s.id_account = _id_account LIMIT 1);
    
    ELSEIF (STRCMP(_typeAccount,'Office Manager') = 0) THEN
    
        SET _id_user = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_account = _id_account LIMIT 1);
    
    ELSEIF (STRCMP(_typeAccount, 'Global Manager') = 0) THEN
    
        SET _id_user = (SELECT s.id_global_manager FROM global_managers as s WHERE s.id_account = _id_account LIMIT 1);
    ELSE 
		SELECT '';
    END IF;

    SELECT _id_account as id_account, _username as username, _email as email, _password as password, _typeAccount as typeAccount, _id_user as id_user;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS deleteOfficeManager;
DELIMITER //
CREATE PROCEDURE deleteOfficeManager (
    _id_office_manager   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_account INTEGER;
    DECLARE aux_office_manager_id_account INTEGER;
    
    SET aux_search  = (SELECT s.id_office_manager FROM office_managers as s WHERE s.id_office_manager = _id_office_manager LIMIT 1);
	SET aux_office_manager_id_account = (SELECT s.id_account FROM office_managers as s WHERE s.id_office_manager = _id_office_manager);
    SET aux_account = (SELECT s.id_account FROM office_managers as s WHERE s.id_account = aux_office_manager_id_account LIMIT 1);


    IF (aux_search = _id_office_manager) THEN
		IF (aux_account = '1') THEN
			DELETE FROM office_managers WHERE office_managers.id_office_manager = _id_office_manager;
			SELECT 'Warning: The office manager has not account' as success;
        ELSE IF (aux_account = aux_office_manager_id_account) THEN
			SET FOREIGN_KEY_CHECKS=0;
			DELETE FROM accounts WHERE accounts.id_account = aux_account;
			DELETE FROM office_managers WHERE office_managers.id_office_manager = _id_office_manager; 
            SET FOREIGN_KEY_CHECKS=1;
            SELECT 'Success: The office manager has been deleted' as success;
        END IF;
	END IF;
    ELSE 
	   SELECT 'Error: This office manager is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS newOfficeManager;
DELIMITER //
CREATE PROCEDURE newOfficeManager (
    _name                VARCHAR(50), 
    _lastname            VARCHAR(50), 
    _phone               VARCHAR(13), 
    _address             VARCHAR(55), 
    _city                VARCHAR(35), 
    _state               VARCHAR(35), 
    _postal_code         VARCHAR(10), 
    _country             VARCHAR(45),
    _id_global_manager   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_name VARCHAR(50);
    DECLARE aux_lastname VARCHAR(50);
    
    SET aux_name     = (SELECT s.name FROM office_managers as s WHERE s.name = _name ORDER BY s.id_office_manager LIMIT 1);
    SET aux_lastname = (SELECT s.lastname FROM office_managers as s WHERE s.lastname = _lastname ORDER BY s.id_office_manager LIMIT 1);
    
    IF (aux_name = _name AND aux_lastname = _lastname) THEN
		SELECT 'Error: This office_manager is already exists within the database' as error;
	ELSE IF (_name = '' OR _lastname = '') THEN
		SELECT 'Error: You have empty inputs' as error;
	ELSE 
        INSERT INTO office_managers (name, lastname, phone, address, city, state, postal_code, country, id_global_manager)
        VALUES (_name, _lastname, _phone, _address, _city, _state, _postal_code, _country, _id_global_manager);  

        SELECT 'Success: The office_manager have been save' as success;
	END IF;
    END IF;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS newOrder;
DELIMITER //
CREATE PROCEDURE newOrder (
    _id_seller     INTEGER,
    _id_customer    INTEGER,
    _id_car         INTEGER,
    _cost_car       DOUBLE
)

DETERMINISTIC
BEGIN
        DECLARE _id_order  INTEGER;
    	-- status_sale = 2        

        INSERT INTO orders (date_at, amount, coments)
        VALUES (now(),_cost_car, 'Sin comentarios');

        SET _id_order = (SELECT o.id_order FROM orders as o ORDER BY id_order DESC LIMIT 1);

        INSERT INTO sales ( id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
        VALUES (_id_car, _id_customer, _id_seller, 2, _id_order, _cost_car);
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS allSales;
DELIMITER //
CREATE PROCEDURE allSales ()

DETERMINISTIC
BEGIN
    SELECT s.id_sale, car.name as car_name, cus.name as customer_name, sel.name as seller_name
    , st.status_sale, s.deposit
    FROM sales as s
    INNER JOIN cars as car ON car.id_car = s.id_car
    INNER JOIN customers as cus ON cus.id_customer = s.id_customer
    INNER JOIN status_sales as st ON st.id_status_sale = s.id_status_sale
    INNER JOIN sellers as sel ON sel.id_seller = s.id_seller;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS allSalesOf;
DELIMITER //
CREATE PROCEDURE allSalesOf (_id_seller INTEGER)

DETERMINISTIC
BEGIN
    SELECT s.id_sale, car.name as car_name, cus.name as customer_name,  st.status_sale, s.deposit, cm.cost
    FROM sales as s
    INNER JOIN cars as car ON car.id_car = s.id_car
    INNER JOIN cars_models as cm ON cm.id_car_model = car.id_car_model
    INNER JOIN customers as cus ON cus.id_customer = s.id_customer
    INNER JOIN status_sales as st ON st.id_status_sale = s.id_status_sale
    WHERE s.id_seller = _id_seller;
END
// DELIMITER ;

DROP PROCEDURE IF EXISTS deleteSeller;
DELIMITER //
CREATE PROCEDURE deleteSeller (
    _id_seller   INTEGER
)

DETERMINISTIC
BEGIN
	DECLARE aux_search INTEGER;
    DECLARE aux_account INTEGER;
    DECLARE aux_seller_id_account INTEGER;
    
    SET aux_search  = (SELECT s.id_seller FROM sellers as s WHERE s.id_seller = _id_seller LIMIT 1);
	SET aux_seller_id_account = (SELECT s.id_account FROM sellers as s WHERE s.id_seller = _id_seller);
    SET aux_account = (SELECT s.id_account FROM sellers as s WHERE s.id_account = aux_seller_id_account LIMIT 1);


    IF (aux_search = _id_seller) THEN
		IF (aux_account = '1') THEN
			DELETE FROM sellers WHERE sellers.id_seller = _id_seller;
			SELECT 'Warning: The seller has not account' as success;
        ELSE IF (aux_account = aux_seller_id_account) THEN
			SET FOREIGN_KEY_CHECKS=0;
			DELETE FROM accounts WHERE accounts.id_account = aux_account;
			DELETE FROM sellers WHERE sellers.id_seller = _id_seller; 
            SET FOREIGN_KEY_CHECKS=1;
            SELECT 'Success: The seller has been deleted' as success;
        END IF;
	END IF;
    ELSE 
	   SELECT 'Error: This seller is not exists within the database' as error;
    END IF;
END
// DELIMITER ;

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
    
    SET aux_name     = (SELECT s.name FROM sellers as s WHERE s.name = _name ORDER BY s.id_seller LIMIT 1);
    SET aux_lastname = (SELECT s.lastname FROM sellers as s WHERE s.lastname = _lastname ORDER BY s.id_seller LIMIT 1);
    
    IF (aux_name = _name AND aux_lastname = _lastname) THEN
		SELECT 'Error: This seller is already exists within the database' as error;
	ELSE IF (_name = '' OR _lastname = '') THEN
		SELECT 'Error: You have empty inputs' as error;
	ELSE 
        INSERT INTO sellers (name, lastname, phone, address, city, state, postal_code, country, id_office_manager)
        VALUES (_name, _lastname, _phone, _address, _city, _state, _postal_code, _country, _id_office_manager);  

        SELECT 'Success: The seller have been save' as success;
	END IF;
    END IF;
END
// DELIMITER ;