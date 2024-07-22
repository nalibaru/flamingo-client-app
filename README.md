FlaMinGo Application Overview
Overview: FlaMinGo is an integrated educational application designed to enhance student productivity and engagement through structured management of academic activities. With a focus on usability and educational support, FlaMinGo incorporates three key components: MockTest, Events, and Timetable.
Components:

1. MockTest:
   o Allows creation, editing, deletion, and assignment of mock tests to students.
   o Roles: Admin (Role Level 1), Teachers, Special, VIP (Role Level 2).
   o Special restrictions: VIPs can only assign mock tests to VVIP roles.
2. Events:
   o Facilitates creation, editing, deletion, and assignment of events.
   o Accessible to Admin, Teachers, and Special roles.
3. Timetable:
   o Supports creation, editing, deletion, and viewing of personal timetables.
   o Available to Admin, Teachers, and Special roles.
   User Roles:
   • Role Level 1: Admin (full access).
   • Role Level 2: Teachers, Special, VIP (limited access).
   • Role Level 3: Students, VVIP, Guest (basic access).
   Authentication:
   • Each role requires authentication to access designated components.
   • Two applications support these activities:
   o Server-Side Rendering App: Manages user accounts and provides access to MockTest, Events, and Timetable.
   o React-Based App: Offers role-specific module access, supports common features like theme updates and profile picture uploads, change password and forgot password.
   Server-Side Rendering App Features:
   • User Module: Create, edit, delete, and view user details (Role Level 1).
   • MockTest: Creation, editing, deletion, and assignment to students (except for Special roles).
   • Events: Creation, editing, deletion, and assignment to students (Admin, Teachers, Special).
   • Timetable: Creation, editing, deletion, and viewing (Admin, Teachers, Special).
   • Password Management: Forgot passwords.
   React-Based App Features:
   • Supports all role levels.
   • Common Features: Theme updates, profile picture uploads, password management.
   • Additional Features: Utilizes full calendar and quill-image-uploader for event and mock test functionalities.
   • Password Management: Forgot / Change passwords.
   Functionality Highlights:
   • MockTest: Role Level 2 can submit tests; students can attempt multiple times. Self-evaluation and score storage.
   • Events: Creation, deletion, and viewing functionalities.
   • Timetable: Creation, deletion, and viewing functionalities, highlighting today's schedule.
   • Dashboard: Provides intuitive UI for managing timetables, events, and passwords.
   FlaMinGo enhances educational administration and student engagement through streamlined management of academic tasks, fostering a conducive learning environment for all user roles.
