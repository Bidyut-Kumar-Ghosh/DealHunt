# Kifayati Bazar

Kifayati Bazar is a full-stack e-commerce platform consisting of a mobile application for users and a web-based admin dashboard. The platform provides a seamless shopping experience with features like user authentication, product browsing, cart management, and wishlist functionality.

## Project Structure

The project is divided into two main parts:

- `User-End/`: Mobile application built with React Native and Expo
- `Admin-End/`: Admin dashboard built with Next.js

## User-End Mobile Application

### Features

- **Authentication**

  - Email/Password login and registration
  - Google Sign-in integration
  - Password reset functionality
  - Persistent authentication state

- **Product Management**

  - Browse products by categories
  - View product details
  - Search functionality
  - Add to cart/wishlist

- **Shopping Cart**

  - Add/remove items
  - Update quantities
  - Calculate totals and discounts

- **User Profile**

  - View and edit profile information
  - Order history
  - Manage shipping addresses
  - Payment methods

- **UI/UX**
  - Custom splash screen with video
  - Dark/Light theme support
  - Smooth animations
  - Native platform integrations

### Technical Stack

- React Native with Expo
- TypeScript
- Firebase Authentication
- Expo Router for navigation
- Expo AV for media playback
- React Native Reanimated for animations
- Custom theming system
- Async Storage for local data persistence

### Getting Started

1. Install dependencies:

```bash
cd User-End
npm install
```

2. Configure Firebase:

   - Add your Firebase configuration in `app/firebase/config.js`
   - Follow the setup instructions in `FIREBASE_SETUP.md`

3. Run the application:

```bash
npm start
```

## Admin Dashboard

### Features

- **Product Management**

  - Add/Edit/Delete products
  - Manage categories
  - Inventory tracking

- **Order Management**
  - View and process orders
  - Update order status
  - Generate invoices

### Technical Stack

- Next.js
- TypeScript
- Tailwind CSS
- ESLint for code quality

### Getting Started

1. Install dependencies:

```bash
cd Admin-End
npm install
```

2. Run the development server:

```bash
npm run dev
```

The admin dashboard will be available at `http://localhost:3000`

## Development

### Prerequisites

- Node.js 18 or higher
- npm or yarn package manager
- Expo CLI for mobile development
- Firebase project setup

### Environment Setup

1. Clone the repository:

```bash
git clone <repository-url>
cd Kifayati-Bazar
```

2. Set up environment variables:
   - Create `.env` files in both User-End and Admin-End directories
   - Add necessary API keys and configuration

### Running Tests

```bash
# For User-End
cd User-End
npm test

# For Admin-End
cd Admin-End
npm test
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details

## Support

For support, please contact [support@kifayatibazar.com](mailto:support@kifayatibazar.com)

## Authors

- Development Team @ Kifayati Bazar

## Acknowledgments

- Thanks to all contributors
- Special thanks to our beta testers
- Built with [Expo](https://expo.dev) and [Next.js](https://nextjs.org)
