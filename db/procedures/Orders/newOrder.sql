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

-- TESTING ------------------------------------------------------------------------------

-- SET FOREIGN_KEY_CHECKS=0;
-- TRUNCATE TABLE customers;
-- SET FOREIGN_KEY_CHECKS=1;

-- use nissan_db;