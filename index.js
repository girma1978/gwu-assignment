import fs from 'fs';
import inquirer from 'inquirer';

// List of licenses for the user to choose from
const licenses = [
    'MIT',
    'Apache 2.0',
    'GPL 3.0',
    'BSD 3-Clause',
    'None',
];

// Function to escape markdown special characters
function escapeMarkdown(text) {
    return text
        .replace(/([*_~`|])/g, '\\$1'); // Escape special characters
}

// Function to generate the README content
function generateReadme(data) {
    return ` 
# ${escapeMarkdown(data.title)}

![License Badge](https://img.shields.io/badge/license-${data.license}-blue.svg)

## Description
${escapeMarkdown(data.description)}

## Table of Contents
- [Installation](#installation)
- [Usage](#usage)
- [License](#license)
- [Contributing](#contributing)
- [Tests](#tests)
- [Questions](#questions)

## Installation
${escapeMarkdown(data.installation)}

## Usage
${escapeMarkdown(data.usage)}

## License
This project is licensed under the ${data.license} License.

## Contributing
${escapeMarkdown(data.contributing)}

## Tests
${escapeMarkdown(data.tests)}

## Questions
For any questions, please reach out to me via GitHub or email:
- GitHub: [${escapeMarkdown(data.github)}](https://github.com/${escapeMarkdown(data.github)})
- Email: [${escapeMarkdown(data.email)}](mailto:${escapeMarkdown(data.email)})
`;
}

// Prompt user for project details
inquirer.prompt([
    {
        type: 'input',
        name: 'title',
        message: 'Enter your project title:'
    },
    {
        type: 'input',
        name: 'description',
        message: 'Enter your project description:'
    },
    {
        type: 'input',
        name: 'installation',
        message: 'Enter installation instructions:'
    },
    {
        type: 'input',
        name: 'usage',
        message: 'Enter usage information:'
    },
    {
        type: 'list',
        name: 'license',
        message: 'Choose a license:',
        choices: licenses
    },
    {
        type: 'input',
        name: 'contributing',
        message: 'Enter contribution guidelines:'
    },
    {
        type: 'input',
        name: 'tests',
        message: 'Enter test instructions:'
    },
    {
        type: 'input',
        name: 'github',
        message: 'Enter your GitHub username:'
    },
    {
        type: 'input',
        name: 'email',
        message: 'Enter your email address:'
    },
])
.then((data) => {
    const readmeContent = generateReadme(data);
    fs.writeFileSync('README.md', readmeContent);
    console.log('README.md has been generated!');
})
.catch((error) => {
    console.error('Error generating README:', error);
});

