This files holds a set of instructions for GitHub Copilot to follow when generating code for this repository. The instructions are intended to reduce the amount of time the agent spends searching for information about the codebase and to reduce the likelihood of generating code that fails validation or build steps.

This repository holds the code for a static html/css/js website designed for a small business named Peaks and Panes. Peaks and Panes is a roofing, siding, windows and doors company based in Montgomery County, Pennsylvania. The website is designed to provide information about the company, its services, and to allow potential customers to contact the company for quotes or inquiries.

<Goals>
- Reduce the likelihood of a cloud agent pull request getting rejected by the user due to generating code that fails to conform to high quality standards.
- Allow the agent to complete its task more quickly by minimizing the need for exploration using grep, find, str_replace_editor, and code search tools.
</Goals>

<WhatToAdd>

<HighLevelDetails>

- This repository is a static website built using HTML, CSS, and JavaScript. It does not use any frameworks or libraries beyond standard web technologies.
- The main entry point of the website is the `index.html` file located in the root directory of the repository. This file serves as the homepage of the website and links to other pages and resources.
- The website's styles are defined in the `styles.css` file located in the `css` directory. This file contains all the CSS rules that control the visual appearance of the website.
- The website's interactivity is handled by the `scripts.js` file located in the `js` directory. This file contains all the JavaScript code that adds dynamic behavior to the website, such as form validation, event handling, and DOM manipulation.
- The website's images and other media assets are stored in the `images` directory. This directory contains all the image files used throughout the website, including logos, icons, and background images.
</HighLevelDetails>

<BuildInstructions>
- Since this is a static website, there is no build process required. Changes can be made directly to the HTML, CSS, and JavaScript files in the repository.
</BuildInstructions>

<ProjectLayout>
- The root directory of the repository contains the following files:
  - `index.html`: The main entry point of the website, serving as the homepage.
  - `README.md`: A markdown file providing an overview of the project and instructions for contributors.
  - `CONTRIBUTING.md`: A markdown file outlining guidelines for contributing to the project.
- The `css` directory contains the following file:
  - `styles.css`: The main CSS file that defines the visual styles for the website.
- The `js` directory contains the following file:
  - `scripts.js`: The main JavaScript file that adds interactivity to the website.
- The `images` directory contains the following files:
  - All image files used throughout the website, including logos, icons, and background images.
</ProjectLayout>
</WhatToAdd>

<StepsToFollow>
- Perform a thorough review of the existing codebase to understand its structure, functionality, and design patterns.
- Identify any areas of the code that may require refactoring or optimization to improve performance, maintainability, or readability.
- Ensure that any new code added to the repository adheres to the existing coding standards and best practices established in the project.
- When making changes to the codebase, test the website locally to verify that the changes do not introduce any new issues or regressions.
- It is important to maintain clear and concise commmit messages that accurately describe the changes made to the codebase. This will help other contributors understand the purpose of the changes and facilitate collaboration. A well maintained changelog is kept in the `CHANGELOG.md` file located in the root directory of the repository. This file should be updated with each new release or significant change to the codebase, providing a summary of the changes made and any relevant information for users or contributors.
- Test the website in multiple browsers and devices to ensure cross-browser compatibility and responsiveness. This will help identify any issues that may arise due to differences in browser rendering or device capabilities.
</StepsToFollow>
