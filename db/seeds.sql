-- Adding department data
INSERT INTO department(name)
VALUES ("Operations"), ("Marketing"), ("Sales"), ("Legal"), ("Tech");

-- Adding role data
INSERT INTO role(title, salary, department_id)
VALUES ("Operations Manager",120000, 1),
    ("Associate",75000, 1),
    ("Marketing Manager",125000, 2),
    ("Salesman",90000, 3),
    ("Lawyer",180000, 4),
    ("Developer",135000, 5),
    ("Intern",85000, 5),
    ("DevOps",120000, 5);

-- Adding employee data
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Rachelle", "Sauve", 1, null),
    ("Joe", "Mogy", 3, null),
    ("Graci", "Fabieanna", 5, 2),
    ("John", "Kennedy", 2, 3),
    ("Joey", "Mogy", 3, 3),
    ("Joseph", "Mogavero", 4, 3);

-- Adding views
CREATE VIEW employee_info AS
(SELECT
role.id AS role_id,
role.title,
role.salary,
department.name AS department_name
FROM role 
JOIN department 
on role.department_id = department.id);

CREATE VIEW employees_with_managers AS
(SELECT emp.id,
emp.first_name,
emp.last_name,
emp.role_id,
CONCAT(manager.first_name, ' ', manager.last_name) AS manager_name
FROM employee AS manager RIGHT OUTER JOIN employee AS emp ON manager.id = emp.manager_id);
