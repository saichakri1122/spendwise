# SpendWise – AI-Powered Personal Expense Tracker

SpendWise is a full-stack personal finance application that helps users
track expenses, manage monthly budgets, understand spending patterns,
and interact with an AI assistant for financial insights.

## 🚀 Live Demo

[Visit SpendWise](https://spendwise-kappa-six.vercel.app/)

SpendWise Landing Page
<img width="2834" height="1522" alt="image" src="https://github.com/user-attachments/assets/08c26cfe-a77a-4130-b08b-3875b54a1878" />
SpendWise Dashboard page
<img width="2830" height="1514" alt="image" src="https://github.com/user-attachments/assets/8995503a-e91c-42d2-90e6-a63361511811" />

## 📌 About the Project

Managing everyday expenses can become difficult when spending is spread
across different categories and transactions.

SpendWise provides a simple dashboard where users can record their
expenses, set monthly budgets, filter spending by date and category,
and understand their financial habits.

The application also includes an AI assistant that allows users to
interact with their spending information and get useful insights.

## ✨ Features

# 🔐 User Authentication
- User registration
- User login
- Password visibility toggle
- Protected dashboard
- Logout functionality
- Session handling using local storage

# 💰 Expense Tracking
- Add new expenses
- Select expense categories
- Add descriptions
- Select expense dates
- Prevent future expense dates
- Edit existing expenses
- Delete expenses
- View recent expenses

# 📊 Dashboard & Analytics
- Total spending
- Number of transactions
- Average expense
- Spending by category
- Date-based filtering
- Category-based filtering
- Combined date and category filtering

# 🎯 Monthly Budget
- Set monthly budget
- View amount spent
- View remaining budget
- Budget progress bar
- Near-budget warning
- Over-budget warning
- Edit monthly budget

#🤖 AI Assistant
- AI-powered financial assistant
- Ask questions about spending
- Get financial insights through natural language
- Powered using OpenRouter AI

# 📱 Responsive Design
- Mobile-friendly interface
- Tablet-friendly layouts
- Desktop-responsive interface
- Responsive dashboard
- Responsive forms and navigation

## 🛠️ Tech Stack

# Frontend
- Next.js
- React
- TypeScript
- Tailwind CSS

# Backend
- Node.js
- Express.js

# Database
- PostgreSQL

# AI
- OpenRouter AI

### Development Tools
- Git
- GitHub
- VS Code
- Vercel
- Render
- neon

## 🏗️ Application Architecture

                    ┌─────────────────────┐
                    │      User           │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Next.js Frontend  │
                    │ React + TypeScript  │
                    │    Tailwind CSS     │
                    └──────────┬──────────┘
                               │
                         REST API
                               │
                               ▼
                    ┌─────────────────────┐
                    │   Express Backend   │
                    │      Node.js        │
                    └──────┬───────┬──────┘
                           │       │
                           ▼       ▼
                  ┌────────────┐  ┌──────────────┐
                  │ PostgreSQL │  │ OpenRouter AI│
                  │  Database  │  │ AI Assistant │
                  └────────────┘  └──────────────┘
