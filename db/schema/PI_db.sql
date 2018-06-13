DROP DATABASE IF EXISTS nissan_db;

CREATE DATABASE IF NOT EXISTS nissan_db;

USE nissan_db;

-- accountS ----------------------------------------------------------------------------------------------------
DROP TABLE IF EXISTS accounts;
CREATE TABLE accounts (
	id_account	   INTEGER AUTO_INCREMENT NOT NULL,
    username 	   VARCHAR(15)  UNIQUE NOT NULL,
    email		   VARCHAR(100) UNIQUE NOT NULL,
    password	   VARCHAR(60)  NOT NULL,
    typeAccount    VARCHAR(60)  NOT NULL DEFAULT 'Invited',

    PRIMARY KEY (id_account)
);

INSERT INTO accounts (username, email, password) VALUES ('root', 'root@root.com', 'root');
-- GLOBAL MANAGERS-------------------------------------------------------------------------------------------
CREATE TABLE globals_managers (
    id_global_manager   INTEGER AUTO_INCREMENT NOT NULL,
    name                VARCHAR(50) NOT NULL,
    lastname            VARCHAR(50) NOT NULL,
    phone               VARCHAR(13) NOT NULL,
    address             VARCHAR(55) NOT NULL,
    city                VARCHAR(35) NOT NULL,
    state               VARCHAR(35) NOT NULL,
    postal_code         VARCHAR(10) NOT NULL,
    country             VARCHAR(45) NOT NULL,
    job                 VARCHAR(45) DEFAULT 'Globar Manager',
    id_account             INTEGER DEFAULT 1,

    PRIMARY KEY (id_global_manager, id_account),

    FOREIGN KEY (id_account)
    REFERENCES accounts (id_account)
);
INSERT INTO globals_managers (name, lastname, phone, address, city, state, postal_code, country)
VALUES ('Pepe', 'valencia', '3123453456', 'street starts #3456', 'Guadalajara','Jalisco', '28078', 'Mexico');

-- OFFICE MANAGERS-------------------------------------------------------------------------------------------
CREATE TABLE offices_managers (
    id_office_manager   INTEGER AUTO_INCREMENT NOT NULL,
    name                VARCHAR(50) NOT NULL,
    lastname            VARCHAR(50) NOT NULL,
    phone               VARCHAR(13) NOT NULL,
    address             VARCHAR(55) NOT NULL,
    city                VARCHAR(35) NOT NULL,
    state               VARCHAR(35) NOT NULL,
    postal_code         VARCHAR(10) NOT NULL,
    country             VARCHAR(45) NOT NULL,
    job                 VARCHAR(45) DEFAULT 'Office Manager',
    id_account             INTEGER DEFAULT 1,

    PRIMARY KEY (id_office_manager, id_account),

    FOREIGN KEY (id_account)
    REFERENCES accounts (id_account)
);
INSERT INTO offices_managers (name, lastname, phone, address, city, state, postal_code, country)
VALUES ('Linda', 'Mendoza', '3122567809', 'street nose #3456', 'Colima','Colima', '28045', 'Mexico');

INSERT INTO offices_managers (name, lastname, phone, address, city, state, postal_code, country)
VALUES ('Antonio', 'Llanos', '3122534857', 'Av. Miguel de la Madrid #3356', 'Manzanillo','Colima', '28019', 'Mexico');

-- OFFICES--------------------------------------------------------------------------------------------------
CREATE TABLE offices (
    id_office           INTEGER AUTO_INCREMENT NOT NULL,
    name_office         VARCHAR(50) NOT NULL,
    phone               VARCHAR(13) NOT NULL,
    address             VARCHAR(55) NOT NULL,
    city                VARCHAR(35) NOT NULL,
    state               VARCHAR(35) NOT NULL,
    postal_code          VARCHAR(10) NOT NULL,
    country             VARCHAR(45) NOT NULL,
    id_global_manager   INTEGER NOT NULL,
    id_office_manager   INTEGER NOT NULL,

    PRIMARY KEY (id_office, id_global_manager, id_office_manager),

    FOREIGN KEY (id_global_manager)
    REFERENCES globals_managers (id_global_manager),

    FOREIGN KEY (id_office_manager)
    REFERENCES offices_managers (id_office_manager)
);
INSERT INTO offices (name_office, phone, address, city, state, postal_code, country, id_global_manager, id_office_manager)
VALUES ('Sucursal Colima', '3123450956', 'Centro calle nose #8643', 'Colima','Colima', '28034', 'Mexico', 1, 1);

INSERT INTO offices (name_office, phone, address, city, state, postal_code, country, id_global_manager, id_office_manager)
VALUES ('Sucursal Manzanillo', '3143478056', 'Centro  #3773', 'Manzanillo','Colima', '28077', 'Mexico', 1, 2);

-- carS STATUS----------------------------------------------------------------------------------------------
CREATE TABLE cars_status (
    id_car_status    INTEGER AUTO_INCREMENT NOT NULL,
    status               VARCHAR(35) NOT NULL,

    PRIMARY KEY (id_car_status)
);
INSERT INTO cars_status (status) VALUES ('Disponible');
INSERT INTO cars_status (status) VALUES ('Vendido');
INSERT INTO cars_status (status) VALUES ('Apartado');
INSERT INTO cars_status (status) VALUES ('Agotado');

-- car MODELS
CREATE TABLE cars_models (
    id_car_model    INTEGER AUTO_INCREMENT NOT NULL,
    model               VARCHAR(100) NOT NULL,
    details             VARCHAR(550) NOT NULL,
    cost                DOUBLE NOT NULL,

    PRIMARY KEY (id_car_model)
);
-- MODELOS KIKS  -> We can create one table for each model
INSERT INTO cars_models (model, details, cost) VALUES ('KIKS EDICION ESPECIAL DARK LIGHT', 'Sin descripción', 374800);
INSERT INTO cars_models (model, details, cost) VALUES ('KIKS SENSE 5MT', 'Sin descripción', 298000);
INSERT INTO cars_models (model, details, cost) VALUES ('KIKS ADVANCE CVT', 'Sin descripción', 333300);
INSERT INTO cars_models (model, details, cost) VALUES ('KIKS EXCLUSIVE CVT', 'Sin descripción', 371800);
INSERT INTO cars_models (model, details, cost) VALUES ('KIKS BITONO', 'Sin descripción', 373000);
-- MODELOS VERSA
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA DRIVE M/T 1.6L', 'Sin descripción', 183100);
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA DRIVE A/T 1.6L', 'Sin descripción', 199000);
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA SENSE M/T 1.6L', 'Sin descripción', 217900);
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA SENSE A/T 1.6L', 'Sin descripción', 235300);
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA ADVANCE M/T 1.6L', 'Sin descripción', 237300);
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA ADVANCE A/T 1.6L', 'Sin descripción', 254900);
INSERT INTO cars_models (model, details, cost) VALUES ('VERSA EXCLUSIVE A/T 1.6L', 'Sin descripción', 271300);

-- carS-------------------------------------------------------------------------------------------------------
CREATE TABLE cars (
    id_car 		    INTEGER AUTO_INCREMENT NOT NULL,
    name                VARCHAR(35) NOT NULL,
    details             VARCHAR(250) NOT NULL,
    id_car_model    INTEGER NOT NULL,
    id_car_status   INTEGER NOT NULL,

    PRIMARY KEY (id_car, id_car_status, id_car_model),

    FOREIGN KEY (id_car_model)
    REFERENCES cars_models (id_car_model),

    FOREIGN KEY (id_car_status)
    REFERENCES cars_status (id_car_status)
);
-- KIKS
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('KIKS', 'Sin descripción', 1, 1);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('KIKS', 'Sin descripción', 2, 2);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('KIKS', 'Sin descripción', 3, 3);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('KIKS', 'Sin descripción', 4, 4);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('KIKS', 'Sin descripción', 5, 1);
-- VERSAS
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 6, 1);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 7, 2);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 8, 3);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 9, 4);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 10, 1);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 11, 2);
INSERT INTO cars(name, details, id_car_model, id_car_status) VALUES ('VERSA', 'Sin descripción', 12, 3);

-- STOCKS
CREATE TABLE stocks (
    id_stock        INTEGER AUTO_INCREMENT NOT NULL,
    data_at         DATETIME NOT NULL,
    id_car      INTEGER NOT NULL,
    id_office       INTEGER NOT NULL,

    PRIMARY KEY (id_stock, id_car, id_office),

    FOREIGN KEY (id_car)
    REFERENCES cars (id_car),

    FOREIGN KEY (id_office)
    REFERENCES offices (id_office)
);
-- KIKS are in Manzanillo office
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 1, 1);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 2, 1);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 3, 1);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 4, 1);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 5, 1);
-- VERSAS are in Colima office
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 6, 2);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 7, 2);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 8, 2);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 9, 2);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 10, 2);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 11, 2);
INSERT INTO stocks (data_at, id_car, id_office) VALUES ('2018-04-02 1:26:59', 12, 2);

-- STOCKS MATRIX-----------------------------------------------------------------------------------------
CREATE TABLE stock_matrix (
    id_stock_matrix     INTEGER AUTO_INCREMENT NOT NULL,
    id_stock            INTEGER NOT NULL,

    PRIMARY KEY (id_stock_matrix, id_stock),

    FOREIGN KEY (id_stock)
    REFERENCES stocks (id_stock)
);
INSERT INTO stock_matrix (id_stock) VALUES (1);
INSERT INTO stock_matrix (id_stock) VALUES (2);
INSERT INTO stock_matrix (id_stock) VALUES (3);
INSERT INTO stock_matrix (id_stock) VALUES (4);
INSERT INTO stock_matrix (id_stock) VALUES (5);
INSERT INTO stock_matrix (id_stock) VALUES (6);
INSERT INTO stock_matrix (id_stock) VALUES (7);
INSERT INTO stock_matrix (id_stock) VALUES (8);
INSERT INTO stock_matrix (id_stock) VALUES (9);
INSERT INTO stock_matrix (id_stock) VALUES (10);
INSERT INTO stock_matrix (id_stock) VALUES (11);
INSERT INTO stock_matrix (id_stock) VALUES (12);

-- PAYMENTS STATUS-----------------------------------------------------------------------------------------
CREATE TABLE payments_status (
    id_payment_status    INTEGER AUTO_INCREMENT NOT NULL,
    payment_status       VARCHAR(35) NOT NULL,
    details              VARCHAR(55) NOT NULL,

    PRIMARY KEY (id_payment_status)
);
INSERT INTO payments_status (payment_status, details) VALUES ('Liquidado', 'sin comentarios');
INSERT INTO payments_status (payment_status, details) VALUES ('Sin pagar', 'sin comentarios');
INSERT INTO payments_status (payment_status, details) VALUES ('Pagando', 'sin comentarios');

-- SELLERS--------------------------------------------------------------------------------------------
CREATE TABLE sellers (
    id_seller           INTEGER AUTO_INCREMENT NOT NULL,
    name                VARCHAR(50) NOT NULL,
    lastname            VARCHAR(50) NOT NULL,
    phone               VARCHAR(13) NOT NULL,
    address             VARCHAR(55) NOT NULL,
    city                VARCHAR(35) NOT NULL,
    state               VARCHAR(35) NOT NULL,
    postal_code         VARCHAR(10) NOT NULL,
    country             VARCHAR(45) NOT NULL,
    job                 VARCHAR(45) DEFAULT 'Seller',
    id_office_manager   INTEGER NOT NULL,
    id_account             INTEGER DEFAULT 1,

    PRIMARY KEY (id_seller, id_office_manager, id_account),

    FOREIGN KEY (id_office_manager)
    REFERENCES offices_managers (id_office_manager),

    FOREIGN KEY (id_account)
    REFERENCES accounts (id_account)
);
-- Seller is from Colima
INSERT INTO sellers (name, lastname, phone, address, city, state, postal_code, country, id_office_manager)
VALUES ('Carlos', 'Gastron', '3128906534' , 'Centro calle nose #4343', 'Colima','Colima', '28023', 'Mexico', 1);
-- Seller is from Manzanillo
INSERT INTO sellers (name, lastname, phone, address, city, state, postal_code, country, id_office_manager)
VALUES ('Alberto', 'Rubio', '3148635543', 'Centro calle nose #3343', 'Manzanillo','Colima', '29326', 'Mexico', 2);

-- CUSTOMERS------------------------------------------------------------------------------------------------------
CREATE TABLE customers (
    id_customer         INTEGER AUTO_INCREMENT NOT NULL,
    name                VARCHAR(50) NOT NULL,
    lastname            VARCHAR(50) NOT NULL,
    phone               VARCHAR(13) NOT NULL,
    address             VARCHAR(55) NOT NULL,
    city                VARCHAR(35) NOT NULL,
    state               VARCHAR(35) NOT NULL,
    postal_code         VARCHAR(10) NOT NULL,
    country             VARCHAR(45) NOT NULL,
    id_seller           INTEGER NOT NULL,

    PRIMARY KEY (id_customer, id_seller),

    FOREIGN KEY (id_seller)
    REFERENCES sellers (id_seller)
);
-- it is from Colima
INSERT INTO customers (name, lastname, phone, address, city, state, postal_code, country, id_seller)
VALUES ('Arturito', 'Buensamo', '3125672345','Centro calle nose #0394', 'Colima','Colima', '28867', 'Mexico', 1);
-- it is from Manzanillo
INSERT INTO customers (name, lastname, phone, address, city, state, postal_code, country, id_seller)
VALUES ('Lolita', 'Valladares', '3140989231','Centro calle nose #8753', 'Manzanillo','Colima', '29235', 'Mexico', 2);

INSERT INTO customers (name, lastname, phone, address, city, state, postal_code, country, id_seller)
VALUES ('Paul', 'Betancur', '3141230077','calle nose #2113', 'Guadalajara','Jalisco', '3233', 'Mexico', 2);

-- TYPES ORDERS------------------------------------------------------------------------------------------------------
CREATE TABLE status_sales (
    id_status_sale   INTEGER AUTO_INCREMENT NOT NULL,
    status_sale      VARCHAR (35) NOT NULL,

    PRIMARY KEY (id_status_sale)
);
INSERT INTO status_sales (status_sale) VALUES ('Disponible');
INSERT INTO status_sales (status_sale) VALUES ('Vendido y liquidado');
INSERT INTO status_sales (status_sale) VALUES ('Apartado');
INSERT INTO status_sales (status_sale) VALUES ('Vendido a plazos');

-- ORDERS--------------------------------------------------------------------------------------------------------------
CREATE TABLE orders(
    id_order    INTEGER AUTO_INCREMENT NOT NULL,
    date_at     DATETIME NOT NULL,
    amount      DOUBLE,
    coments     VARCHAR(250),
    PRIMARY KEY (id_order)
);
INSERT INTO orders (date_at, amount, coments)
VALUES ('2018-04-10 14:00:30', 631000, 'uno apartado y uno vendido');
INSERT INTO orders (date_at, amount, coments)
VALUES ('2018-04-15 16:30:59', 416900, 'uno apartado y uno vendido');
INSERT INTO orders (date_at, amount, coments)
VALUES ('2018-04-15 18:15:27', 526200, 'uno apartado y uno vendido');

-- ORDERS DETAILS------------------------------------------------------------------------------------------------------
CREATE TABLE sales (
    id_sale         INTEGER NOT NULL,
    id_car          INTEGER NOT NULL,
    id_customer     INTEGER NOT NULL,
    id_seller       INTEGER NOT NULL,
    id_status_sale  INTEGER NOT NULL,
    id_order        INTEGER NOT NULL,
    deposit         DOUBLE NOT NULL,

    KEY (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order),

	CONSTRAINT `sales_ibfk_1` FOREIGN KEY (id_car) REFERENCES cars (id_car),

	CONSTRAINT `sales_ibfk_2` FOREIGN KEY (id_customer) REFERENCES customers (id_customer),

    CONSTRAINT `sales_ibfk_3` FOREIGN KEY (id_seller) REFERENCES sellers (id_seller),

	CONSTRAINT `sales_ibfk_4` FOREIGN KEY (id_status_sale) REFERENCES status_sales (id_status_sale),

	CONSTRAINT `sales_ibfk_5` FOREIGN KEY (id_order) REFERENCES orders (id_order)
);
INSERT INTO sales (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
VALUES (1, 2, 1, 1, 4, 1, 75000);
INSERT INTO sales (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
VALUES (1, 3, 1, 1, 3, 1, 75000);
INSERT INTO sales (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
VALUES (2, 7, 2, 2, 4, 2, 75000);
INSERT INTO sales (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
VALUES (2, 8, 2, 2, 3, 2, 75000);
INSERT INTO sales (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
VALUES (3, 11, 3, 2, 2, 3, 254900);
INSERT INTO sales (id_sale, id_car, id_customer, id_seller, id_status_sale, id_order, deposit)
VALUES (3, 12, 3, 2, 3, 3, 75000);

-- PAYMENTS-----------------------------------------------------------------------------------------
CREATE TABLE payments (
    id_payment          INTEGER AUTO_INCREMENT NOT NULL,
    deposit_amount      DOUBLE NOT NULL,
    rest_amount         DOUBLE NOT NULL,
    id_order            INTEGER NOT NULL,
    id_payment_status   INTEGER NOT NULL,

    PRIMARY KEY (id_payment, id_order, id_payment_status),

    FOREIGN KEY (id_order)
    REFERENCES orders (id_order),

    FOREIGN KEY (id_payment_status)
    REFERENCES payments_status (id_payment_status)
);
INSERT INTO payments (deposit_amount, rest_amount, id_order, id_payment_status)
VALUES (150000, 481000, 1, 3);
INSERT INTO payments (deposit_amount, rest_amount, id_order, id_payment_status)
VALUES (150000, 266900, 2, 3);
INSERT INTO payments (deposit_amount, rest_amount, id_order, id_payment_status)
VALUES (329900, 196300, 2, 3);


-- SELECT * FROM accounts;
-- SELECT * FROM sessions;
