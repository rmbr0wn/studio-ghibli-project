# Studio Ghibli Films - Take Home Challenge

## Overview

Create a responsive React application that displays Studio Ghibli film information using a GraphQL backend that integrates with the public Studio Ghibli API.

## Time Expectation

**2-4 hours** - Please don't feel the need to go beyond this time limit. You don't necessarily need to complete the entire task.

## Core Requirements

### Development Process (Required)

**You must use the dev-tasks workflow for this project:**

The AI prompts/cursor rules to accomplish 1-3 can be seen in the `.cursor/rules` directory

1. **Create a PRD**: Write a Product Requirements Document (`prd-studio-ghibli.md`) in the `/tasks` directory
2. **Generate Tasks**: Break down the PRD into actionable tasks (`tasks-prd-studio-ghibli.md`)
3. **Process Tasks**: Follow the structured task completion workflow:
   - Complete one sub-task at a time
   - Mark tasks as completed (`[x]`) when finished
   - Run tests after completing each parent task
   - Make git commits with descriptive messages using conventional commit format
   - Maintain the "Relevant Files" section as you work

**📹 Helpful Resource**: [Watch this video explanation of dev-tasks](https://www.youtube.com/watch?v=cniTWVMGD08&t=989s) (Watch the intro sections, and when he starts talking about taskmaster, skip to 16:29 for a dev tasks explainer)

This demonstrates your ability to work with structured development processes and is a key evaluation criterion.

### Frontend Features

1. **Four Film Buttons**: Display four buttons, each containing the name of one of the specified Studio Ghibli films
2. **Loading States**: When clicked, buttons should show a loading state
3. **GraphQL Integration**: Buttons call your GraphQL backend to fetch film data
4. **Card Display**: Replace clicked buttons with cards showing:
   - Movie image
   - Movie title
5. **Interactive Cards**: On hover (desktop) or click (mobile), cards flip to reveal:
   - Movie banner
   - Description
   - Director
   - Release date
   - Runtime
   - Rotten Tomatoes score
6. **Mobile Responsive**: Ensure the application works well on mobile devices
   - Cards should reorganize into a single column layout on mobile
   - Application should look good and function properly down to 320px width
   - Touch interactions should work smoothly for card flipping on mobile

### Backend Features

1. **GraphQL Server**: Create resolvers that fetch data from the Studio Ghibli API
2. **API Integration**: Connect to the public Studio Ghibli API to retrieve film information

### Bonus Feature

- **"...rest" Button**: Add an additional button that hits a different GraphQL resolver to pull and display all remaining Studio Ghibli films using the same card interface

## Film Data

The four main films to implement:

| Film Title              | API ID                                 |
| ----------------------- | -------------------------------------- |
| Porco Rosso             | `ebbb6b7c-945c-41ee-a792-de0e43191bd8` |
| Kiki's Delivery Service | `ea660b10-85c4-4ae3-8a5f-41cea3648e3e` |
| Howl's Moving Castle    | `cd3d059c-09f4-4ff3-8d63-bc765a5184fa` |
| My Neighbor Totoro      | `58611129-2dbc-4a81-a72f-77ddfc1b1b49` |

## Setup Instructions

### Option 1: Using Yurt (Recommended)

We recommend using our in-house project setup tool for convenience:

1. Clone the yurt project (https://github.com/yeti/yurt)
2. Navigate to the cloned repository
3. Install dependencies: `pnpm i`
4. Navigate to the CLI directory: `cd packages/cli`
5. Run the setup tool: `pnpm yurt`
6. Follow the prompts and select: **"React/Vite App + Apollo GraphQL server"**

### Option 2: Custom Setup

If you prefer, create your own React + GraphQL + Node.js project using your preferred technologies and tools.

## External API Reference

- **Studio Ghibli API**: [https://ghibliapi.vercel.app/](https://ghibliapi.vercel.app/)
- **Documentation**: [https://ghibliapi.vercel.app/#tag/Films](https://ghibliapi.vercel.app/#tag/Films)

## Deliverables

### 1. Public GitHub Repository

Create a public GitHub repository containing your complete project.

### 2. README Documentation

Include a comprehensive README with:

- **Setup Instructions**: How to install and run your project
- **Project Overview**: Brief description of your implementation
- **Dev-Tasks Process**: Documentation of your PRD and task completion workflow
- **Time Spent**: Actual time invested in the project
- **Rationale**: Technology choices and architectural decisions
- **Challenges**: Any difficulties encountered during development
- **Limitations**: Known issues or incomplete features
- **Future Improvements**: What you would add with more time

### 3. Working Application

A functional application that demonstrates the core requirements.

## Evaluation Criteria

- **Development Process**: Proper use of dev-tasks workflow (PRD, task breakdown, structured completion)
- **Functionality**: Core features working as specified
- **Code Quality**: Clean, readable, and well-structured code
- **User Experience**: Intuitive interface and smooth interactions
- **Responsive Design**: Mobile-friendly implementation
- **Documentation**: Clear setup instructions and project documentation
- **Time Management**: Effective use of the allocated time

## Notes

- Focus on demonstrating your skills within the time constraint
- Quality over quantity - a well-implemented subset is better than a buggy complete implementation
- Don't hesitate to document any assumptions or trade-offs you make
- Feel free to add your own creative touches while meeting the core requirements

## Questions?

If you have any questions about the requirements, please don't hesitate to reach out.

---

**Happy hacking! 🎬✨**
