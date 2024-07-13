# Test Management System Functions

The system has 4 access types:

- [x] Manager - User with access type Manager () will have access to All Dashboard and Projects Assigned to them or Created by them (Overview, Requirements, Attachments, Releases, Modules, Test Cases, Test Plans, Test Runs, Issues, Reports)
- [x] Tester - Users with access type Tester will have access to Dashboard and Projects Assigned to them (Overview, Requirements, Attachments, Releases, Modules, Test Cases, Test Plans, Test Runs, Issues, Reports)
- [x] Developer - Users with access type Developer will have access only to Issues of Projects Assigned to them.
- [ ] Admin - User with access type Tester and Admin access (Marked as "This user is an administrator") will have access to All Projects, Dashboard, and Administration options (Users Management, Roles Management, Site Settings).

## Users (\*)

- [x] Register
- [x] Login
- [x] Logout

## Administration (\*\*)

- [x] View User List with Pagination, Search
- [x] Add, Delete User
- [ ] Import, Export Users

## Projects (\*)

- [x] Add, Edit, Delete Project
- [x] View Project List with Pagination, Search, Filter
- [x] View Project Overview (number of Releases, number of TCs, number of TRs, number of Issues, Open Releases Status)
- [x] Assign User with role (Manager/Tester/Developer), Remove User

## Requirements (\*)

- [x] Add, Edit, Delete Requirement
- [ ] Import, Export Requirements
- [x] View Requirement List with Pagination, Search, Filter
- [x] View Requirement Details with linked TCs

## Test Plans

- [ ] Add, Edit, Delete Test Plan
- [ ] View Test Plan List
- [ ] View Test Plan Details

## Releases (\*)

- [x] Add, Edit, Delete Release
- [x] View Release List
- [ ] View Release Details with statistics of TCs & TRs

## Modules

- [x] Add, Edit, Delete Module
- [x] View Module List

## Test Cases (TC) (\*)

- [x] Add, Edit, Delete TC
- [x] Link TC to Requirements
- [x] Import, Export TCs
- [x] View TC List with Pagination, Search, Sort, Filter
- [x] View TC Details (Id, Name/Objective, Module, Description, Pre-condition, Steps, Created At, Created By, Updated At, Linked Requirements, Linked Issues)

## Test Runs (TR) (\*)

- [x] Add, Edit, Delete TR
- [x] View TR List
- [x] View TR Details (Project Status, Issue Status, Release, TCs with Test Results)
- [x] Add, Remove TCs to TR
- [x] Add Issue to TC
- [x] Bulk Action: Change Status, Assigned to for one or many TCs in TR

## Issues/Bugs (\*)

- [x] Add, Edit, Delete Issue
- [ ] Import, Export Issues
- [x] View Issue List with Pagination, Search, Sort, Filter
- [x] View Issue Details (ID, Title, Description, Steps to reproduce, Environment, Module, Release, Priority, Severity, Attachments, Status, Assign to, Linked TCs)
- [ ] Bulk action: Change Status, Change Priority, Change Severity, Asssigned User (Developer) for one or many Issues
- [ ] Add, Delete Comment

## Reports (\*\*)

- [ ] Requirements Traceability Summary Report (This Report is useful to quickly and easily see which requirements have been mapped,and which requirements have not yet been mapped with the test case .In the report you can see all the Requirements, including linked test cases and test run status.)
- [ ] Test Run Assignee Summary Report (The report shows an overview of the test results across all of theTest runs you include in the report, based on the assignees assigned to the Test run.)
- [ ] Releases Summary Report (In this report, you are able to see the Requirement mapped to selected Release along with its details.)

# Notes

- Please refer to the QATouch website for a detailed description of the system's functional requirements.
  https://www.qatouch.com/
- Requirements marked with an (\*) are mandatory for installation.
- Requirements marked with an (\*\*) are additional requirements.
