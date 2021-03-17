USE company_DB;

INSERT INTO department (dept_name)
VALUES ("Forecasting"),("Operations"), ("Marketing"), ("Sales"), ("Fleet Management");

INSERT INTO employee_role (title,salary,department_id)
VALUES("Manager",120000.00,1), ("Assistant Manager",110000.00,1), ("Analyst",50000.00,2),("Coordinator",45000.00,2),("Intern",40000.00,2);

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Shon","Hatcher",1,1);

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Amber","Martin",2,1); 

INSERT INTO employee (first_name,last_name,role_id,manager_id)
VALUES ("Harper","Jones",3,2); 

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Carter","Flemming",3,2); 

INSERT INTO employee (first_name,last_name,role_id,manager_id) 
VALUES ("Hailey","Watson",3,2);
 



