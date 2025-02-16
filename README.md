# Car Dealer Application

A modern web application built with Next.js that allows users to search and filter vehicles by manufacturer and model year. The application fetches real-time data from the NHTSA API to provide accurate vehicle information.

## Features

- 🚗 Search vehicles by manufacturer
- 📅 Filter by model year (2015 to present)
- ⚡ Real-time data from NHTSA API
- 🎨 Modern UI with Tailwind CSS
- 📱 Fully responsive design
- ♿ Accessible components with shadcn/ui

## Prerequisites

Before you begin, ensure you have installed:
- Node.js 16.8 or later
- npm (comes with Node.js)

## Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```env
NEXT_PUBLIC_NHTSA_API_URL=https://vpic.nhtsa.dot.gov/api/vehicles
```

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd car-dealer-app
```

2. Install dependencies:
```bash
npm install
```

## Development

To start the development server:

```bash
npm run dev
```

This will start the application in development mode. Open [http://localhost:3000](http://localhost:3000) to view it in your browser.