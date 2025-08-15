# My Next.js Webhook Project

This project is a Next.js application that implements a webhook for handling subscription events. It is structured to provide a clean separation of concerns, with dedicated files for API routes, layout components, and utility functions.

## Project Structure

```
my-nextjs-app
├── app
│   ├── api
│   │   └── webhook
│   │       └── route.ts       # API route for handling webhook events
│   ├── layout.tsx             # Layout component for the application
│   └── page.tsx               # Main page of the application
├── public                      # Static assets
├── lib
│   └── webhook.ts              # Utility functions for webhook processing
├── types
│   └── index.ts                # TypeScript interfaces and types
├── package.json                # npm configuration file
├── tsconfig.json               # TypeScript configuration file
└── README.md                   # Project documentation
```

## Webhook Functionality

The webhook is designed to handle subscription events, specifically the `subscription.active` event. It logs the incoming webhook data to the console for monitoring and debugging purposes.

## Getting Started

1. Clone the repository:
   ```
   git clone <repository-url>
   ```

2. Navigate to the project directory:
   ```
   cd my-nextjs-app
   ```

3. Install the dependencies:
   ```
   npm install
   ```

4. Run the development server:
   ```
   npm run dev
   ```

5. The application will be available at `http://localhost:3000`.

## License

This project is licensed under the MIT License.