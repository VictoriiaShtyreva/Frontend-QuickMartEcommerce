<p align="center">
  <img src="https://user-images.githubusercontent.com/6764957/52892445-9045cf80-3136-11e9-9d5e-a1c47e505372.png" width="100" alt="project-logo">
</p>
<p align="center">
    <h1 align="center">Frontend E-Commerce Project</h1>
</p>
<p align="center">
		<em>Developed with the software and tools below.</em>
</p>
<p align="center">
	<img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React">
	<img src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white" alt="TypeScript">
  <img src="https://img.shields.io/badge/Redux-593D88?style=for-the-badge&logo=redux&logoColor=white" alt="Redux">
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router">
  <img src="https://img.shields.io/badge/Jest-C21325?style=for-the-badge&logo=jest&logoColor=white" alt="Jest">
  <img src="https://img.shields.io/badge/Material%20UI-007FFF?style=for-the-badge&logo=mui&logoColor=white" alt="MUI">
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" alt="NPM">
</p>

# Frontend project - QuickMart

This repository for the Frontend project aimed at building an e-commerce website as part of the training program at [Integrify's Fullstack Developer program](https://www.integrify.io/program/finland/full-stack). The main purpose of this project is to create a user-friendly website where customers can easily explore, select, and purchase products online. Whether it's clothing, electronics, or any other items, our platform aims to cater to the needs of various shoppers by offering a smooth and intuitive shopping journey. You can explore the live deployment of our frontend e-commerce project by visiting [QuickMart](https://fs17-frontend-project.vercel.app/).

<details>
  <summary>🔗 Table of Contents</summary>

- [📷 App Screenshots](#📷-app-screenshots)
- [📍 API Reference](#📍-api-reference)
- [🚀 Getting Started](#🚀-getting-started)
  - [⚙️ Install](#⚙️-install)
  - [► Using QuickMart](#►-using-quickmart)
  - [🧪 Tests](#🧪-tests)
- [📦 Features](#📦-features)
- [📂 Repository Structure](#📂-repository-structure)
- [🛠 Project Roadmap](#🛠-project-roadmap)
  - [🔩 Redux Store Structure](#🔩-redux-store-structure)
- [🌏 Deployment](#🌏-deployment)
- [👏 Acknowledgments](#👏-acknowledgments)
</details>
<hr>

## 📷 App Screenshots

![App Screenshot](readmeScreenshots/homepage.png)
![App Screenshot](readmeScreenshots/loginpage.png)
![App Screenshot](readmeScreenshots/userpage.png)
![App Screenshot](readmeScreenshots/homepageuserloggedin.png)
![App Screenshot](readmeScreenshots/productpage.png)
![App Screenshot](readmeScreenshots/shopingcart.png)
![App Screenshot](readmeScreenshots/darkmode.png)

## 📍 API Reference

For the development of this project, we utilized the [Platzi API](https://fakeapi.platzi.com/) as a key API reference.

## 🚀 Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **TypeScript**: `^4.9.5`
- **React**: `^18.2.0`

### ⚙️ Install

1. Clone the repository:

```sh
git clone https://github.com/VictoriiaShtyreva/fs17-Frontend-project
```

2. Change to the project directory:

```sh
cd fs17-Frontend-project
```

3. Install the dependencies:

```sh
npm install
```

### ► Using `QuickMart`

Use the following command to run QuickMart:

```sh
npm start
```

### 🧪 Tests

Use the following command to run tests:

```sh
npm test
```

Tests for this project are written using Jest, with the assistance of [msw](https://mswjs.io/) for mocking the server. The project utilizes three mock servers for handling products, categories, and users respectively. The tests are structured to cover various aspects of the application's functionality, including unit tests.

![App Screenshot](readmeScreenshots/test.png)

---

## 📦 Features

|     | Feature                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                      |
| --- | ------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**                            | This project is built using React, TypeScript, Redux Toolkit, and React Router Dom, following a structured architecture that includes components, screens, hooks. Context API is utilized for switching between light and dark themes, enhancing user experience and accessibility.                                                                                                                              |
| 🔩  | **Use Context API to switch theme**         | The project leverages the Palette Mode feature from Material-UI and Context API to seamlessly switch between light and dark modes, providing users with a customizable and visually comfortable browsing experience.                                                                                                                                                                                             |
| 📄  | **Incorporate scroll-to-top functionality** | The implementation of scroll-to-top functionality is achieved using [GSAP](https://gsap.com/), allowing users to effortlessly navigate back to the top of the page with smooth animations for enhanced user experience.                                                                                                                                                                                          |
| 🔌  | **Checkout Form**                           | The checkout form functionality is implemented using Redux reducers for logic and Material-UI for styling, ensuring a user-friendly and visually appealing checkout process.                                                                                                                                                                                                                                     |
| 🧩  | **Empty States**                            | Various empty states are implemented throughout the application, including empty cart, favorite products, error page, and no products found. These states provide clear feedback to users and enhance the overall user experience by guiding them effectively.                                                                                                                                                   |
| ⚡️ | **Performance & Optimisation**              | Performance and optimization techniques such as lazy loading, [React Hook Form](https://react-hook-form.com/) for validation, optimized data fetching with createAsyncThunk, useCallback, and memo are employed to ensure fast rendering, smooth user interactions, and efficient resource management, resulting in an optimized browsing experience.                                                            |
| 📦  | **Login user and Admin dashboard**          | The project features user authentication functionality, allowing users to log in and access their user page where they can update their information such as email and name. Additionally, an admin dashboard is available for admins to create, update, and delete products, providing enhanced control over product management. As admin user can login using `email`: "admin@mail.com", `password`: "admin123" |

## 📂 Repository Structure

```sh
└── /src
    ├── App.tsx                           // Main component for rendering the application.
    ├── App.test.tsx                      // Test file for testing the App component.
    ├── index.css                         // CSS file for global styles.
    ├── index.tsx                         // Entry point of the application.
    ├── react-app-env.d.ts                // Declaration file for TypeScript.
    ├── reportWebVitals.ts                // File for reporting web vitals.
    ├── setupTests.ts                     // Setup file for configuring testing environment.
    ├── components                        // Directory for reusable components.
    |   ├── admin                         // Components related to admin functionality.
    |   |    ├── ProductAdminItem.tsx     // Component for rendering individual product items in the admin dashboard.
    |   |    ├── ProductCreateForm.tsx    // Form component for creating new products in the admin dashboard.
    |   |    ├── ProductListDashboard.tsx // Component for displaying a list of products in the admin dashboard.
    |   |    └── UploadProduct.tsx        // Component for uploading product images in the admin dashboard.
    |   ├── cart                          // Components related to shopping cart functionality.
    |   |    ├── checkout                 // Components for the checkout process.
    |   |    |    ├── AddressForm.tsx     // Form component for entering address details during checkout.
    |   |    |    ├── CheckoutForm.tsx    // Main checkout form component for handling order details.
    |   |    |    ├── PaymentForm.tsx     // Form component for entering payment details during checkout.
    |   |    |    └── Review.tsx          // Component for reviewing and confirming the order before checkout.
    |   |    ├── CartItem.tsx             // Component for rendering individual items in the shopping cart.
    |   |    ├── CartModal.tsx            // Modal component for add product item to shoping cart.
    |   |    └── EmptyCart.tsx            // Component for displaying a message when the shopping cart is empty.
    |   ├── contextAPI                    // Components related to Context API.
    |   |    ├── theme                    // Components related to theme management.
    |   |    |    └── customTheme.ts      // Custom theme configuration for the application.
    |   |    └── ColorThemeContext.tsx    // Context provider for managing the application's color theme.
    |   ├── footer                        // Footer component for the application.
    |   |    └── Footer.tsx               // Footer component for the application.
    |   ├── header                        // Header component for the application.
    |   |    └── Header.tsx               // Header component for the application.
    |   ├── products                      // Components related to product management.
    |   |    ├── CategorySelection.tsx    // Component for selecting product categories.
    |   |    ├── EmptyFavoritesProducts.tsx // Component for displaying a message when the favorites list is empty.
    |   |    ├── EmptyProducts.tsx       // Component for displaying a message when no products are found.
    |   |    ├── ProductCard.tsx         // Component for rendering individual product cards.
    |   |    ├── ProductDetails.tsx      // Component for displaying detailed information about a product.
    |   |    ├── ProductList.tsx         // Component for rendering a list of products.
    |   |    ├── Products.tsx            // Component for managing the display of products.
    |   |    ├── SearchForm.tsx          // Form component for searching products.
    |   |    └── SortingFilter.tsx       // Component for filtering and sorting products.
    |   ├── user                         // Components related to user management.
    |   |    ├── RegisterUserModal.tsx   // Modal component for user registration.
    |   |    └── UserAccount.tsx         // Component for managing user account settings.
    |   ├── ProtectedRoute.tsx           // Higher-order component for protecting routes that require authentication for admin.
    |   └── ScrollToTopButton.tsx        // Button component for scrolling to the top of the page.
    ├── hooks                            // Custom hooks for managing state and logic.
    │   ├── useAppDispach.ts             // Custom hook for accessing the Redux dispatch function.
    │   └── useAppSelector.ts            // Custom hook for accessing Redux state.
    ├── images                           // Directory for storing image assets.
    ├── pages                            // Components representing different pages of the application.
    │   ├── AboutUs.tsx                  // About Us page component.
    │   ├── AdminPage.tsx                // Admin dashboard page component.
    │   ├── CartPage.tsx                 // Shopping cart page component.
    │   ├── HomePage.tsx                 // Home page component.
    │   ├── LoadingPage.tsx              // Loading page component.
    │   ├── LoginPage.tsx                // Login page component.
    │   ├── NotFoundPage.tsx             // 404 Not Found page component.
    │   ├── SingleProductPage.tsx        // Single product page component.
    │   └── UserPage.tsx                 // User profile page component.
    ├── redux                            // Redux-related files for state management.
    |   ├── slices                      // Redux slice files for managing specific parts of the state.
    |   |    ├── cartSlice.ts           // Redux slice for managing the shopping cart state.
    |   |    ├── categorySlice.ts       // Redux slice for managing the category state.
    |   |    ├── checkoutSlice.ts       // Redux slice for managing the checkout state.
    |   |    ├── productSlice.ts        // Redux slice for managing the product state.
    |   |    └── userSlice.ts           // Redux slice for managing the user state.
    │   └── store.ts                    // Redux store configuration.
    ├── test                            // Directory for test files.
    |   ├── cart                      // Test files for cart-related functionality.
    |   |    └── cartReducer.test.ts  // Test file for testing the cart reducer.
    |   ├── categories                // Test files for category-related functionality.
    |   |    └── categoryReducer.test.ts  // Test file for testing the category reducer.
    |   ├── mockdata                   // Mock data for testing purposes.
    |   |    ├── category.ts           // Mock data for categories.
    |   |    ├── products.ts           // Mock data for products.
    |   |    ├── shoppingCart.ts       // Mock data for shopping cart.
    |   |    └── users.ts              // Mock data for users.
    |   ├── products                   // Test files for product-related functionality.
    |   |    └── productReducer.test.ts // Test file for testing the product reducer.
    |   ├── shared                     // Shared test files and utilities.
    |   |    ├── categoryServer.ts     // Mock server for category data.
    |   |    ├── productServer.ts      // Mock server for product data.
    |   |    └── userServer.ts         // Mock server for user data.
    |   └── users                      // Test files for user-related functionality.
    |        └── usersReducer.test.ts  // Test file for testing the user reducer.
    ├── types                          // TypeScript type definitions.
    │   ├── Authentication.ts          // Type definitions related to authentication.
    │   ├── Category.ts                // Type definitions related to categories.
    │   ├── Checkout.ts                // Type definitions related to checkout.
    │   ├── ColorThemeChange.ts        // Type definitions related to color theme changes.
    │   ├── File.ts                    // Type definitions related to files.
    │   ├── Product.ts                 // Type definitions related to products.
    │   ├── ShoppingCart.ts            // Type definitions related to shopping cart.
    │   ├── type.ts                    // General type definitions.
    │   └── User.ts                    // Type definitions related to users.
    └── utils                          // Utility functions.
        ├── checkImageUrl.ts           // Function for checking if an image URL is valid.
        ├── scrollToTop.ts             // Function for scrolling to the top of the page.
        ├── svgUrl.ts                  // Function for retrieving SVG URLs.
        ├── uploadFile.ts              // Function for uploading files.
        └── uploadFilesService.ts      // Service for uploading files.
```

---

## 🛠 Project Roadmap

### 🔩 Redux Store Structure

![Redux Store](readmeScreenshots/ReduxStore.png)

## 🌏 Deployment

To deploy the project was used [Vercel](https://vercel.com/docs/getting-started-with-vercel/template).

## 👏 Acknowledgments

- With sincere gratitude to the team at [Integrify](https://www.integrify.io/) for their unwavering support and knowledge. Their guidance and resources have been instrumental in the development of this project.

[**Return**](#📷-app-screenshots)
