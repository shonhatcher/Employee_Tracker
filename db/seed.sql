
USE company_DB;

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Shon","Hatcher",1,1),

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Amber","Martin",1,1), 

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Harper","Jones",2,2), 

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Carter","Flemming",2,2), 

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Hailey","Watson",2,2);
 

INSERT INTO employee_role (title,salary)
VALUES("Manager",100000.00), ("Manager",110000.00), ("Analyst",50000.00),("Analyst",45000.00),("Analyst",40000.00);


INSERT INTO department (name)
VALUES ("Forecasting"),("Operations"), ("Operations"), ("Operations"), ("Operations");