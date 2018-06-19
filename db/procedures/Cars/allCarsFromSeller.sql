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

-- TESTING ------------------------------------------------------------------------------

-- SELECT * FROM cars;
-- SELECT * FROM sellers;
-- CALL allCarsFromSeller(4);

-- SET FOREIGN_KEY_CHECKS=0;
-- SET FOREIGN_KEY_CHECKS=1;

-- use nissan_db;
