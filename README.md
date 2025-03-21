# Contour Wash Frontend

This repository contains the frontend code for the Contour Wash application, a digital platform for laundry and shoe maintenance services in Cameroon.

## Overview

The Contour Wash frontend is built with React.js and Vite to provide a responsive, user-friendly interface for customers, delivery personnel, and administrators. The application is designed to work efficiently in the Cameroonian context, with considerations for varying internet connectivity and mobile device usage.

## Features

- **Customer Portal**
  - User registration and authentication
  - Service ordering (laundry, dry cleaning, shoe maintenance)
  - Scheduling pickups and deliveries
  - Real-time order tracking
  - Mobile payment integration (MTN Mobile Money, Orange Money)
  - Order history and electronic receipts
  - Service ratings and feedback

- **Delivery Personnel App**
  - Daily mission overview
  - Optimized route navigation
  - Real-time order status updates
  - Client communication
  - Payment processing at delivery

- **Administrator Dashboard**
  - User management
  - Order management and assignment
  - Service catalog configuration
  - Performance analytics and reporting
  - System configuration

## Tech Stack

- **React.js** - Frontend library
- **Vite** - Build tool and development server
- **React Router** - For navigation
- **Axios** - API requests
- **React Query** - Data fetching and caching
- **Context API/Redux** - State management
- **Tailwind CSS** - Styling
- **React Hook Form** - Form validation
- **React Map GL** - For maps and location services
- **Socket.io Client** - Real-time updates
- **i18next** - Internationalization (French/English)

## Requirements

- Node.js 16.x or higher
- npm 8.x or higher

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/contourwash/frontend.git
   cd frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up environment variables:
   Create a `.env` file in the root directory with the following variables:
   ```
   VITE_API_URL=http://localhost:5000/api
   VITE_GOOGLE_MAPS_API_KEY=your_google_maps_api_key
   VITE_SOCKET_URL=http://localhost:5000
   ```

4. Start the development server:
   ```bash
   npm run dev
   ```

5. Build for production:
   ```bash
   npm run build
   ```

## Project Structure

```
src/
├── assets/          # Static assets (images, fonts)
├── components/      # Reusable components
│   ├── common/      # Common UI components
│   ├── customer/    # Customer-specific components
│   ├── delivery/    # Delivery personnel components
│   └── admin/       # Admin dashboard components
├── context/         # React Context providers
├── hooks/           # Custom React hooks
├── layouts/         # Page layouts
├── pages/           # Application pages
├── services/        # API service calls
├── utils/           # Utility functions
├── locales/         # Translation files
├── App.jsx          # Main application component
└── main.jsx         # Application entry point
```

## Development Guidelines

- Use functional components with hooks
- Follow the Airbnb React/JSX Style Guide
- Implement responsive design for all components
- Optimize for low data usage and performance
- Add appropriate loading states and error handling
- Support offline capabilities where possible
- Test on older Android devices to ensure compatibility

## Optimization Considerations

- Implement code splitting for better performance
- Use lazy loading for images and components
- Minimize dependencies to reduce bundle size
- Implement service workers for offline capabilities
- Use memoization for expensive computations
- Optimize API calls with React Query

## Deployment

The application can be deployed on:
- Netlify
- Vercel
- AWS Amplify
- GitHub Pages

For production deployment:
1. Build the project: `npm run build`
2. The build output will be in the `dist` directory
3. Deploy this directory to your hosting provider

## Testing

```bash
# Run unit tests
npm run test

# Run e2e tests
npm run test:e2e
```

## International Support

The application supports both French and English languages, with French as the default. Language can be switched in the user settings.

## Browser Compatibility

The application is designed to work on:
- Chrome (recent versions)
- Firefox (recent versions)
- Safari (recent versions)
- Edge (recent versions)
- Mobile browsers (Android 7.0+, iOS 12+)

## Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add some amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## License

Proprietary - Contour Wash © 2025

## Contact

For any queries related to the frontend development, please contact:
- Email: contourwash@gmail.com
- Phone: +237 691667137 / 671465886