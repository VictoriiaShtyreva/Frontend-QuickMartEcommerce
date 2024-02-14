# Frontend project

This repository for the Frontend project to build an e-commerce website.

**Technologies:**

- Front-end: React, TypeScript, Redux Toolkit, Material UI
- API: [Platzi API](https://fakeapi.platzi.com/)

## Basic requirements

- Use the API endpoint Platzi API.

- Create at lease 4 pages (can be more if you want):

1. page for all products - filtering by categories and price;
2. product page - page with details and relevant actions (add to cart);
3. profile page (only available if user logins)
4. cart page (cart page could be a page or a modal) - develop "Cart" page or modal for displaying cart items and managing quantities.
5. admin dashboard

- Create Redux store for following features:

  - product reducer: get all products, find a single products, filter products by categories, sort products by price. Create, update and delete a product (enable update & delete features only for admin of the webapp)
  - user reducer: register and login
  - cart reducer: add product to cart, remove products, update products's quantity in cart

- When adding routers to your application, set certain routes to be private. For example, route to user profile page should not be accessible if user has not logged in.

- Styling: must have responsive -> useMediaQuery

- Implement unit testing for the reducers

- **Deploy** the application and rewrite README file.

### Additional features:

- Use Context API to switch theme
- Use pagination when fetching/displaying all the products
- Implement performance optimization where applicable
- Incorporate scroll-to-top functionality
- Integrate Google Login using appropriate libraries.
- Perform UI/UX testing to ensure a smooth user experience, including alerts for actions like adding duplicate products

## Deadline

- Presentation: **7/3** and **8/3/ 2024**
- Submitting Front-end project **10am 8/3/2024**
