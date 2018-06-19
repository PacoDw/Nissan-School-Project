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
-- TESTING ------------------------------------------------------------------------------
Call login('GlobalManager');

select * from accounts;
  