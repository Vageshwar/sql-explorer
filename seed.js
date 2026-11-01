const Database = require('better-sqlite3');
const path = require('path');

const db = new Database(path.join(__dirname, 'school.db'));

db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

// ── Schema ──────────────────────────────────────────────────────────────────

db.exec(`
  DROP TABLE IF EXISTS Bookings;
  DROP TABLE IF EXISTS Course;
  DROP TABLE IF EXISTS Lecturer;
  DROP TABLE IF EXISTS Department;
  DROP TABLE IF EXISTS School;
  DROP TABLE IF EXISTS Student;

  CREATE TABLE School (
    SchoolID   INTEGER PRIMARY KEY AUTOINCREMENT,
    SchoolName VARCHAR(64) NOT NULL
  );

  CREATE TABLE Department (
    DepartmentID   INTEGER PRIMARY KEY AUTOINCREMENT,
    DepartmentName VARCHAR(64) NOT NULL,
    SchoolID       INTEGER NOT NULL,
    FOREIGN KEY (SchoolID) REFERENCES School(SchoolID)
  );

  CREATE TABLE Lecturer (
    LecturerID   INTEGER PRIMARY KEY AUTOINCREMENT,
    LecturerName VARCHAR(24),
    DepartmentID INTEGER,
    Salary       INTEGER,
    FOREIGN KEY (DepartmentID) REFERENCES Department(DepartmentID)
  );

  CREATE TABLE Course (
    CourseID      INTEGER PRIMARY KEY AUTOINCREMENT,
    CourseName    VARCHAR(128) NOT NULL,
    LecturerID    INTEGER NOT NULL,
    StartDateTime DATETIME NOT NULL,
    EndDateTime   DATETIME NOT NULL,
    Spaces        INTEGER,
    FOREIGN KEY (LecturerID) REFERENCES Lecturer(LecturerID)
  );

  CREATE TABLE Student (
    StudentID       INTEGER PRIMARY KEY AUTOINCREMENT,
    MatriculationID VARCHAR(10),
    Forename        VARCHAR(64),
    Surname         VARCHAR(64),
    Gender          VARCHAR(16)
  );

  CREATE TABLE Bookings (
    BookingID   INTEGER PRIMARY KEY AUTOINCREMENT,
    CourseID    INTEGER NOT NULL,
    StudentID   INTEGER NOT NULL,
    BookingDate DATETIME NOT NULL,
    Status      VARCHAR(50),
    FOREIGN KEY (CourseID)  REFERENCES Course(CourseID),
    FOREIGN KEY (StudentID) REFERENCES Student(StudentID)
  );
`);

// ── Seed Data ────────────────────────────────────────────────────────────────

// Schools
const insertSchool = db.prepare('INSERT INTO School (SchoolName) VALUES (?)');
const schools = [
  'School of Computing',
  'School of Business',
  'School of Engineering',
  'School of Health Sciences',
];
schools.forEach(s => insertSchool.run(s));

// Departments
const insertDept = db.prepare('INSERT INTO Department (DepartmentName, SchoolID) VALUES (?, ?)');
const departments = [
  ['Software Engineering', 1],
  ['Data Science', 1],
  ['Cybersecurity', 1],
  ['Accounting', 2],
  ['Marketing', 2],
  ['Mechanical Engineering', 3],
  ['Civil Engineering', 3],
  ['Nursing', 4],
  ['Physiotherapy', 4],
];
departments.forEach(d => insertDept.run(...d));

// Lecturers
const insertLecturer = db.prepare('INSERT INTO Lecturer (LecturerName, DepartmentID, Salary) VALUES (?, ?, ?)');
const lecturers = [
  ['Dr. Alice Hart', 1, 62000],
  ['Prof. Bob Kane', 2, 71000],
  ['Dr. Carol Vane', 3, 58000],
  ['Dr. David Nile', 4, 55000],
  ['Prof. Emma Shaw', 5, 67000],
  ['Dr. Frank Reid', 6, 73000],
  ['Dr. Grace Moon', 7, 69000],
  ['Prof. Henry Cole', 8, 64000],
  ['Dr. Isla West', 9, 60000],
  ['Dr. Jack Thorn', 1, 59000],
  ['Prof. Karen Miles', 2, 76000],
  ['Dr. Leo Brand', 3, 54000],
];
lecturers.forEach(l => insertLecturer.run(...l));

// Courses
const insertCourse = db.prepare(`
  INSERT INTO Course (CourseName, LecturerID, StartDateTime, EndDateTime, Spaces)
  VALUES (?, ?, ?, ?, ?)
`);
const courses = [
  ['Introduction to Programming', 1,  '2026-01-10 09:00:00', '2026-03-28 11:00:00', 30],
  ['Database Systems',            2,  '2026-02-03 13:00:00', '2026-04-25 15:00:00', 25],
  ['Network Security Fundamentals',3, '2026-01-15 10:00:00', '2026-03-20 12:00:00', 20],
  ['Financial Accounting',        4,  '2026-03-01 09:00:00', '2026-05-30 11:00:00', 35],
  ['Digital Marketing',           5,  '2026-02-14 14:00:00', '2026-04-18 16:00:00', 28],
  ['Thermodynamics',              6,  '2026-01-20 08:00:00', '2026-03-15 10:00:00', 22],
  ['Structural Analysis',         7,  '2026-03-10 09:00:00', '2026-05-20 11:00:00', 18],
  ['Clinical Nursing Practice',   8,  '2026-02-01 08:00:00', '2026-04-30 10:00:00', 40],
  ['Sports Rehabilitation',       9,  '2026-01-08 11:00:00', '2026-03-26 13:00:00', 24],
  ['Advanced Algorithms',         10, '2026-02-20 10:00:00', '2026-05-10 12:00:00', 20],
  ['Machine Learning',            11, '2026-03-05 13:00:00', '2026-06-01 15:00:00', 22],
  ['Ethical Hacking',             12, '2026-01-22 14:00:00', '2026-04-10 16:00:00', 15],
  ['Data Visualisation',          2,  '2026-01-10 09:00:00', '2026-03-28 11:00:00', 20],
];
courses.forEach(c => insertCourse.run(...c));

// Students
const insertStudent = db.prepare(`
  INSERT INTO Student (MatriculationID, Forename, Surname, Gender)
  VALUES (?, ?, ?, ?)
`);
const students = [
  ['MAT1001', 'James',   'Anderson',  'Male'],
  ['MAT1002', 'Sophie',  'Bennett',   'Female'],
  ['MAT1003', 'Oliver',  'Clarke',    'Male'],
  ['MAT1004', 'Emma',    'Davies',    'Female'],
  ['MAT1005', 'Harry',   'Edwards',   'Male'],
  ['MAT1006', 'Amelia',  'Foster',    'Female'],
  ['MAT1007', 'George',  'Gibson',    'Male'],
  ['MAT1008', 'Lily',    'Harris',    'Female'],
  ['MAT1009', 'Noah',    'Irving',    'Male'],
  ['MAT1010', 'Ella',    'Johnson',   'Female'],
  ['MAT1011', 'Jack',    'King',      'Male'],
  ['MAT1012', 'Grace',   'Lewis',     'Female'],
  ['MAT1013', 'Liam',    'Morgan',    'Male'],
  ['MAT1014', 'Chloe',   'Nelson',    'Female'],
  ['MAT1015', 'Ethan',   'Owen',      'Male'],
  ['MAT1016', 'Mia',     'Parker',    'Female'],
  ['MAT1017', 'Mason',   'Quinn',     'Male'],
  ['MAT1018', 'Isla',    'Roberts',   'Female'],
  ['MAT1019', 'Logan',   'Scott',     'Male'],
  ['MAT1020', 'Poppy',   'Taylor',    'Female'],
  ['MAT1021', 'Lucas',   'Underwood', 'Male'],
  ['MAT1022', 'Freya',   'Vaughan',   'Female'],
  ['MAT1023', 'Dylan',   'Walsh',     'Male'],
  ['MAT1024', 'Scarlett','Xavier',    'Female'],
  ['MAT1025', 'Ryan',    'Young',     'Male'],
];
students.forEach(s => insertStudent.run(...s));

// Bookings
const insertBooking = db.prepare(`
  INSERT INTO Bookings (CourseID, StudentID, BookingDate, Status)
  VALUES (?, ?, ?, ?)
`);
const bookings = [
  // Intro to Programming (courseID=1)
  [1, 1,  '2025-12-01 10:00:00', 'Confirmed'],
  [1, 2,  '2025-12-02 11:00:00', 'Confirmed'],
  [1, 3,  '2025-12-03 09:30:00', 'Confirmed'],
  [1, 4,  '2025-12-04 14:00:00', 'Confirmed'],
  [1, 5,  '2025-12-05 10:00:00', 'Waiting'],
  [1, 6,  '2025-12-06 13:00:00', 'Confirmed'],
  // Database Systems (courseID=2)
  [2, 1,  '2025-12-10 09:00:00', 'Confirmed'],
  [2, 7,  '2025-12-11 10:00:00', 'Confirmed'],
  [2, 8,  '2025-12-12 11:00:00', 'Confirmed'],
  [2, 9,  '2025-12-13 12:00:00', 'Cancelled'],
  [2, 10, '2025-12-14 09:00:00', 'Confirmed'],
  // Network Security (courseID=3)
  [3, 11, '2025-12-05 10:00:00', 'Confirmed'],
  [3, 12, '2025-12-06 11:00:00', 'Confirmed'],
  [3, 3,  '2025-12-07 13:00:00', 'Confirmed'],
  // Financial Accounting (courseID=4)
  [4, 13, '2026-01-05 09:00:00', 'Confirmed'],
  [4, 14, '2026-01-06 10:00:00', 'Confirmed'],
  [4, 15, '2026-01-07 11:00:00', 'Confirmed'],
  [4, 16, '2026-01-08 12:00:00', 'Waiting'],
  // Digital Marketing (courseID=5)
  [5, 17, '2026-01-10 09:00:00', 'Confirmed'],
  [5, 18, '2026-01-11 10:00:00', 'Confirmed'],
  [5, 19, '2026-01-12 11:00:00', 'Confirmed'],
  [5, 20, '2026-01-13 14:00:00', 'Confirmed'],
  // Thermodynamics (courseID=6)
  [6, 21, '2025-12-15 09:00:00', 'Confirmed'],
  [6, 22, '2025-12-16 10:00:00', 'Confirmed'],
  // Structural Analysis (courseID=7)
  [7, 23, '2026-01-20 09:00:00', 'Confirmed'],
  [7, 24, '2026-01-21 10:00:00', 'Confirmed'],
  [7, 25, '2026-01-22 11:00:00', 'Confirmed'],
  // Clinical Nursing (courseID=8)
  [8, 1,  '2025-12-20 08:00:00', 'Confirmed'],
  [8, 2,  '2025-12-21 09:00:00', 'Confirmed'],
  [8, 5,  '2025-12-22 10:00:00', 'Confirmed'],
  [8, 10, '2025-12-23 11:00:00', 'Cancelled'],
  // Sports Rehab (courseID=9)
  [9, 11, '2025-12-01 09:00:00', 'Confirmed'],
  [9, 12, '2025-12-02 10:00:00', 'Confirmed'],
  [9, 15, '2025-12-03 11:00:00', 'Confirmed'],
  // Advanced Algorithms (courseID=10)
  [10, 6,  '2026-01-15 09:00:00', 'Confirmed'],
  [10, 7,  '2026-01-16 10:00:00', 'Confirmed'],
  [10, 3,  '2026-01-17 11:00:00', 'Confirmed'],
  // Machine Learning (courseID=11)
  [11, 8,  '2026-02-01 09:00:00', 'Confirmed'],
  [11, 9,  '2026-02-02 10:00:00', 'Confirmed'],
  [11, 4,  '2026-02-03 11:00:00', 'Confirmed'],
  // Ethical Hacking (courseID=12)
  [12, 13, '2025-12-10 09:00:00', 'Confirmed'],
  [12, 14, '2025-12-11 10:00:00', 'Confirmed'],
  // Data Visualisation (courseID=13) — overlaps with Intro to Programming for student 1
  [13, 1,  '2025-12-05 09:00:00', 'Confirmed'],
  [13, 2,  '2025-12-06 10:00:00', 'Confirmed'],
  [13, 20, '2025-12-07 11:00:00', 'Confirmed'],
];
bookings.forEach(b => insertBooking.run(...b));

console.log('Database seeded successfully at school.db');
db.close();
