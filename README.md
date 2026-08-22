# BuildEasy

> Build a better resume. Build your career.

BuildEasy is a modern resume and portfolio builder designed to help users create professional, ATS-friendly resumes with customizable templates, live previews, and an intuitive editing experience.

## Features

- Professional resume builder
- Multiple resume templates
- ATS-friendly resume layouts
- Live resume preview
- Resume customization
- Personal information
- Education
- Work experience
- Projects
- Skills
- Additional sections
- Resume export
- Portfolio pages
- Responsive design
- Local browser storage
- Modern and clean interface

## Resume Templates

BuildEasy includes multiple resume templates:

- Modern
- Classic
- Minimal
- Compact
- Executive
- Academic

Each template provides a different visual style while maintaining a professional resume structure.

## Resume Builder

Build and customize your resume using dedicated editing sections.

### Personal Information

Add:

- Name
- Email
- Phone number
- Location
- Professional links
- Profile information

### Education

Add:

- Institution
- Degree
- Field of study
- Start date
- End date
- Description

### Experience

Add:

- Company
- Position
- Start date
- End date
- Responsibilities
- Achievements

### Projects

Showcase projects with:

- Project name
- Description
- Technologies
- Project links
- Additional details

### Skills

Add and organize your professional and technical skills.

### Additional Sections

Add additional information to create a complete and personalized resume.

## Live Resume Preview

BuildEasy provides a live preview while editing your resume.

Changes made in the builder are reflected in the preview so you can review the final layout before exporting.

## Data Storage

BuildEasy uses browser local storage to save resume information.

This allows users to continue working on their resumes without requiring an account.

> Clearing browser storage may remove locally saved resume information.

## Technology

BuildEasy is built with:

- React
- TypeScript
- Vite
- Tailwind CSS
- HTML
- CSS
- JavaScript

## Project Structure

```text
buildeasy/
├── public/
├── src/
│   ├── components/
│   │   ├── builder/
│   │   ├── common/
│   │   ├── mockups/
│   │   ├── screens/
│   │   ├── sections/
│   │   ├── tabs/
│   │   └── wizard/
│   ├── context/
│   ├── data/
│   ├── lib/
│   ├── pages/
│   ├── App.tsx
│   ├── index.css
│   ├── main.tsx
│   └── types.ts
├── public/
├── .env.example
├── .gitignore
├── index.html
├── metadata.json
├── package.json
├── package-lock.json
├── tsconfig.json
├── vite.config.ts
└── README.md
