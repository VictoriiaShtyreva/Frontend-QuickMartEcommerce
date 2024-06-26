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
  <img src="https://img.shields.io/badge/Stripe-626CD9?style=for-the-badge&logo=Stripe&logoColor=white" alt="STRIPE">
  <img src="https://img.shields.io/badge/Docker-2CA5E0?style=for-the-badge&logo=docker&logoColor=white" alt="Docker">
</p>

# Frontend project - QuickMartEcommerce

This repository for the Frontend project aimed at building an e-commerce website as part of the training program at [Integrify's Fullstack Developer program](https://www.integrify.io/program/finland/full-stack). The main purpose of this project is to create a user-friendly website where customers can easily explore, select, and purchase products online. Whether it's clothing, electronics, or any other items, our platform aims to cater to the needs of various shoppers by offering a smooth and intuitive shopping journey. Users can create orders, write and update reviews into user page, and sort products based on different criteria. Also able to add products into wishlist. Admins have the ability to manage orders, users, products, and more, ensuring efficient control over the e-commerce operations. You can explore the live deployment of our frontend e-commerce project by visiting [QuickMartEcommerce](https://quick-mart-ecommerce.vercel.app/).

## Backend Repository

The backend repository for this project handles the server-side logic, database interactions, and API endpoints required to support the e-commerce functionalities. It is built using ASP.NET Core and follows the Clean Architecture principles to ensure maintainability and scalability.

You can find the backend repository at the following link: [QuickMartEcommerce Backend Repository](https://github.com/VictoriiaShtyreva/Backend-QuickMartEcommerce)

<details>
  <summary>🔗 Table of Contents</summary>

- [📷 App Screenshots](#-app-screenshots)
- [🚀 Getting Started](#-getting-started)
  - [⚙️ Install](#-install)
  - [► Using QuickMart](#-using-quickmart)
  - [🧪 Tests](#-tests)
- [🏗️ API Endpoints](#️-api-endpoints)
- [📦 Features](#-features)
- [📂 Repository Structure](#-repository-structure)
- [🛠 Project Roadmap](#-project-roadmap)
  - [🔩 Redux Store Structure](#-redux-store-structure)
- [🌏 Deployment](#-deployment)
- [👏 Acknowledgments](#-acknowledgments)
</details>
<hr>

## 📷 App Screenshots

![App Screenshot](readmeScreenshots/homepage.png)
![App Screenshot](readmeScreenshots/shoppage.png)
![App Screenshot](readmeScreenshots/productpage.png)
![App Screenshot](readmeScreenshots/footer.png)
![App Screenshot](readmeScreenshots/loginpage.png)
![App Screenshot](readmeScreenshots/userpage.png)
![App Screenshot](readmeScreenshots/orderhistory.png)
![App Screenshot](readmeScreenshots/createreview.png)
![App Screenshot](readmeScreenshots/wishlist.png)
![App Screenshot](readmeScreenshots/reviewhistory.png)
![App Screenshot](readmeScreenshots/editreview.png)
![App Screenshot](readmeScreenshots/shoppingcart.png)
![App Screenshot](readmeScreenshots/stripe.png)
![App Screenshot](readmeScreenshots/successpage.png)
![App Screenshot](readmeScreenshots/ordermanagement.png)
![App Screenshot](readmeScreenshots/adminproducts.png)
![App Screenshot](readmeScreenshots/updateproduct.png)
![App Screenshot](readmeScreenshots/usermanagement.png)
![App Screenshot](readmeScreenshots/categorymanagement.png)
![App Screenshot](readmeScreenshots/ordermanagement.png)

## 🚀 Getting Started

**_Requirements_**

Ensure you have the following dependencies installed on your system:

- **TypeScript**: `^4.9.5`
- **React**: `^18.2.0`
- **Docker**: `^20.10.0` (or the latest version)

### ⚙️ Install

1. Clone the repository:

```sh
git clone <repo>
```

2. Change to the project directory:

```sh
cd <repo>
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

### 🐳 Using Docker

To run QuickMart using Docker, follow these steps:

1. Build the Docker image:

```sh
docker build -t quickmart .
```

2. Run the Docker container:

```sh
docker run -p 3000:3000 quickmart
```

### 🧪 Tests

Use the following command to run tests:

```sh
npm test
```

Tests for this project are written using Jest, with the assistance of [axios-mock-adapter](https://github.com/ctimmerm/axios-mock-adapter) for mocking Axios requests. The project mocks API requests for handling products, categories, and users respectively. The tests are structured to cover various aspects of the application's functionality, including unit tests.

App Screenshot

![App Screenshot](readmeScreenshots/test.png)

---

## 🏗️ API Endpoints

All the endpoints of the API are documented and can be tested directly on the generated Swagger page. From there you can view each endpoint URL, their HTTP methods, request body structures and authorization requirements. Access the Swagger page from this [link](https://quick-mart-ecommerce.azurewebsites.net/index.html).

## 📦 Features

|     | Feature                                     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         |
| --- | ------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| ⚙️  | **Architecture**                            | This project is built using React, TypeScript, Redux Toolkit, and React Router Dom, following a structured architecture that includes components, screens, hooks. Context API is utilized for switching between light and dark themes, enhancing user experience and accessibility.                                                                                                                                                                                                                 |
| 🔩  | **Use Context API to switch theme**         | The project leverages the Palette Mode feature from Material-UI and Context API to seamlessly switch between light and dark modes, providing users with a customizable and visually comfortable browsing experience.                                                                                                                                                                                                                                                                                |
| 📄  | **Incorporate scroll-to-top functionality** | The implementation of scroll-to-top functionality is achieved using [GSAP](https://gsap.com/), allowing users to effortlessly navigate back to the top of the page with smooth animations for enhanced user experience.                                                                                                                                                                                                                                                                             |
| 🔌  | **Checkout Form**                           | The checkout form functionality is implemented using Redux reducers for logic and Material-UI for styling, ensuring a user-friendly and visually appealing checkout process.                                                                                                                                                                                                                                                                                                                        |
| 🧩  | **Empty States**                            | Various empty states are implemented throughout the application, including empty cart, favorite products, error page, and no products found. These states provide clear feedback to users and enhance the overall user experience by guiding them effectively.                                                                                                                                                                                                                                      |
| ⚡️ | **Performance & Optimisation**              | Performance and optimization techniques such as lazy loading, [React Hook Form](https://react-hook-form.com/) for validation, optimized data fetching with createAsyncThunk, useCallback, and memo are employed to ensure fast rendering, smooth user interactions, and efficient resource management, resulting in an optimized browsing experience.                                                                                                                                               |
| 📦  | **Login user and Admin dashboard**          | The project features user authentication functionality, allowing users to log in and access their user page where they can update their information such as email and name. Additionally, an admin dashboard is available for admins to create, update, and delete products, providing enhanced control over product management. As user can login using `email`: "carol@example.com", `password`: "carol@123" .As admin user can login using `email`: "alice@example.com", `password`: "alice@123" |
| 💳  | **Payment using Stripe**                    | Integrated payment functionality using Stripe for secure and reliable transactions. This feature allows users to make payments directly within the application, ensuring a seamless checkout experience.                                                                                                                                                                                                                                                                                            |

## 📂 Repository Structure

```sh
src
   |-- App.test.tsx
   |-- App.tsx
   |-- components
   |   |-- ProtectedRoute.tsx
   |   |-- ScrollToTopButton.tsx
   |   |-- admin
   |   |   |-- AdminDashboard.tsx
   |   |   |-- AdminSortingFilter.tsx
   |   |   |-- CategoriesListDashboard.tsx
   |   |   |-- OrdersListDashboard.tsx
   |   |   |-- ProductAdminItem.tsx
   |   |   |-- ProductCreateForm.tsx
   |   |   |-- ProductListDashboard.tsx
   |   |   |-- UpdateProduct.tsx
   |   |   |-- UserListDashboard.tsx
   |   |-- cart
   |   |   |-- CartItem.tsx
   |   |   |-- CartModal.tsx
   |   |   |-- EmptyCart.tsx
   |   |   |-- checkout
   |   |   |   |-- AddressForm.tsx
   |   |   |   |-- CheckoutForm.tsx
   |   |   |   |-- Review.tsx
   |   |-- contextAPI
   |   |   |-- ColorThemeContext.tsx
   |   |   |-- theme
   |   |   |   |-- customTheme.ts
   |   |-- footer
   |   |   |-- Footer.tsx
   |   |-- header
   |   |   |-- Header.tsx
   |   |-- orders
   |   |   |-- OrdersSorting.tsx
   |   |-- products
   |   |   |-- CategorySelection.tsx
   |   |   |-- EmptyFavoritesProducts.tsx
   |   |   |-- EmptyProducts.tsx
   |   |   |-- MostPurchasedProducts.tsx
   |   |   |-- ProductCard.tsx
   |   |   |-- ProductDetails.tsx
   |   |   |-- ProductList.tsx
   |   |   |-- Products.tsx
   |   |   |-- SearchForm.tsx
   |   |   |-- SortingFilter.tsx
   |   |-- user
   |   |   |-- OrderHistory.tsx
   |   |   |-- RegisterUserModal.tsx
   |   |   |-- ReviewCreateModal.tsx
   |   |   |-- ReviewEditModal.tsx
   |   |   |-- ReviewHistory.tsx
   |   |   |-- UserAccount.tsx
   |-- hooks
   |   |-- useAppDispach.ts
   |   |-- useAppSelector.ts
   |-- images
   |   |-- EmptyCart.svg
   |   |-- EmptyFavoriteProduct.svg
   |   |-- NoProductsFound.svg
   |   |-- NotFoundPage.svg
   |   |-- cancel.png
   |   |-- homepage.jpg
   |   |-- klarna.png
   |   |-- loginpage.png
   |   |-- logo.svg
   |   |-- mastercard.png
   |   |-- stripe.png
   |   |-- success.png
   |   |-- visa.jpg
   |-- index.css
   |-- index.tsx
   |-- pages
   |   |-- AboutUs.tsx
   |   |-- AdminPage.tsx
   |   |-- CancelPage.tsx
   |   |-- CartPage.tsx
   |   |-- HomePage.tsx
   |   |-- LoadingPage.tsx
   |   |-- LoginPage.tsx
   |   |-- NotFoundPage.tsx
   |   |-- ShopPage.tsx
   |   |-- SingleProductPage.tsx
   |   |-- SuccessPage.tsx
   |   |-- UserPage.tsx
   |-- react-app-env.d.ts
   |-- redux
   |   |-- slices
   |   |   |-- cartSlice.ts
   |   |   |-- categorySlice.ts
   |   |   |-- checkoutSlice.ts
   |   |   |-- orderSlice.ts
   |   |   |-- productImageSlice.ts
   |   |   |-- productSlice.ts
   |   |   |-- reviewSlice.ts
   |   |   |-- usersSlice.ts
   |   |-- store.ts
   |-- reportWebVitals.ts
   |-- setupTests.ts
   |-- tests
   |   |-- mocks
   |   |   |-- mockAxios.ts
   |   |   |-- mockDataCategories.ts
   |   |   |-- mockDataOrders.ts
   |   |   |-- mockDataProducts.ts
   |   |   |-- mockDataReviews.ts
   |   |   |-- mockDataUsers.ts
   |   |-- slices
   |   |   |-- categorySlice.test.ts
   |   |   |-- orderSlice.test.ts
   |   |   |-- productSlice.test.ts
   |   |   |-- reviewSlice.test.ts
   |   |   |-- usersSlice.test.ts
   |-- types
   |   |-- Authentication.ts
   |   |-- Category.ts
   |   |-- Checkout.ts
   |   |-- ColorThemeChange.ts
   |   |-- Order.ts
   |   |-- Product.ts
   |   |-- QueryOptions.ts
   |   |-- Review.ts
   |   |-- ShoppingCart.ts
   |   |-- User.ts
   |   |-- type.ts
   |-- utils
   |   |-- checkImageUrl.ts
   |   |-- scrollToTop.ts
   |   |-- svgUrl.ts

```

---

## 🛠 Project Roadmap

### 🔩 Redux Store Structure

![Redux Store](readmeScreenshots/ReduxStore.png)

## 🌏 Deployment

To deploy the project was used [Vercel](https://vercel.com/docs/getting-started-with-vercel/template).

## 👏 Acknowledgments

- With sincere gratitude to the team at [Integrify](https://www.integrify.io/) for their unwavering support and knowledge. Their guidance and resources have been instrumental in the development of this project.

[**Return**](#-app-screenshots)
