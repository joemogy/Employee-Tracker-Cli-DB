INSERT INTO Department (Department_name)
VALUES ('Sales');

INSERT INTO Department (Department_name)
VALUES ('Finance');

INSERT INTO Department (Department_name)
VALUES ('Accounting');

INSERT INTO Department (Department_name)
VALUES ('IT');

INSERT INTO Department (Department_name)
VALUES ('Legal');

INSERT INTO Roles (Title,Salary,Department_id)
VALUES('Sales Representative',60000, 1);

INSERT INTO Roles (Title,Salary,Department_id)
VALUES('Financial Advisor', 80000, 2);

INSERT INTO Roles (Title,Salary,Department_id)
VALUES('Chartered Accountant', 70000, 3);

INSERT INTO Roles (Title,Salary,Department_id)
VALUES('Full Stack Dveloper', 100000, 4);

INSERT INTO Roles (Title,Salary,Department_id)
VALUES('Lawyer', 120000, 5);

INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id)
VALUES('Chetan','Kakaria', 1 ,1);

INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id)
VALUES('Kartik','Syal', 2 ,2);

INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id)
VALUES('Sant','Malhotra', 3 ,3);

INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id)
VALUES('Anmol','Gupta', 4 ,4);

INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id)
VALUES('Pranav','Jain', 5 ,5);

INSERT INTO Employee(First_name,Last_name,Role_id,Manager_id)
VALUES('Akash','Duggal', 4 ,6);