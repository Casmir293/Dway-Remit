# School Management System

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [Components](#components)
  - [TeacherForm](#teacherform)
  - [EditModal](#editmodal)
  - [TeacherList](#teacherlist)
  - [StudentForm](#studentform)
  - [StudentList](#studentlist)
- [State Management](#state-management)
- [Validation](#validation)
- [Contributing](#contributing)
- [License](#license)

## Introduction

This project is a simple School Management System built with Vue 3 and Pinia. It allows users to manage teachers and students by providing functionalities to add, edit, and delete records. The application ensures that inputs are validated to maintain data integrity.

## Features

- Add, edit, and delete teacher records.
- Add, edit, and delete student records.
- Form validation to ensure data integrity.
- Responsive design for better user experience across devices.

## Technologies Used

- Vue 3
- Pinia (for state management)
- Tailwind CSS (for styling)
- Vue Toastification (for notifications)

## Installation

To get started with the project, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Casmir293/Dway-Remit.git

   ```

2. Navigate to the project directory:

   ```bash
   cd Dway-Remit

   ```

3. Install dependencies:

   ```bash
   npm install

   ```

4. Run the development server:

   ```bash
   npm run dev

   ```

## Usage

Once the development server is running, you can open the application in your browser at http://localhost:3000. From here, you can start adding, editing, and deleting teachers and students.

## Components

### TeacherForm

The TeacherForm component is used to add new teacher records. It includes fields for National ID, title, first name, last name, date of birth, contact number, and salary.

### EditModal

The EditModal component is used to edit existing teacher or student records. It includes similar fields as the TeacherForm and performs validation before submitting the updated information.

### TeacherList

The TeacherList component displays a list of all registered teachers. Each teacher record has options to edit or delete the record.

### StudentForm

The StudentForm component is similar to TeacherForm, but it is used to add new student records.

### StudentList

The StudentList component displays a list of all registered students, with options to edit or delete each record.

## State Management

State management is handled using Pinia. The main store (mainStore.js) contains the state for teachers and students, along with actions to add, edit, and delete records.

## Validation

Form validation is implemented to ensure that all required fields are filled out correctly before a record is added or updated.
