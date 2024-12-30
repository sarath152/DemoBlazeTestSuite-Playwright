# DemoBlaze Playwright Test Cases

## About the Repository
This repository contains end-to-end automated test cases for the DemoBlaze website, leveraging Playwright as the testing framework. The repository covers critical functionalities such as user login, product search, cart management, and checkout process. These test cases are designed to validate both the UI and backend responses for comprehensive coverage.

---

## Key Features
- **Login Scenarios**: Tests for valid, invalid, and empty login credentials.
- **Product Search and Validation**:
  - Search functionality by category and product names.
  - Validation against UI elements, screenshots, and API responses.
- **Cart Management**:
  - Adding multiple products to the cart.
  - Validating cart details, including product quantities and total price.
  - Removing individual items and clearing the cart.
- **Checkout Process**:
  - Filling the checkout form dynamically using AI-driven data generation (e.g., Faker.js).
  - Validating order confirmation with unique IDs.
- **AI Integration**:
  - Leveraging AI-driven actions to streamline testing and enhance validations.
- **Dynamic Reporting**:
  - Extent Reports for generating detailed execution logs and HTML reports.

---

## Technologies Used
- **Playwright**: For browser automation and testing.
- **Node.js**: Underlying runtime for Playwright.
- **JavaScript/TypeScript**: For writing modular and reusable test cases.
- **Faker.js**: For generating random test data dynamically.
- **Extent Reports**: For generating visually rich and detailed test execution reports.

---

## Test Coverage
- Login:
Valid credentials.
Invalid credentials.
Empty fields.
- Product Search:
Search by category.
Validate against DOM, screenshots, and API.
- Cart Management:
Add and remove products.
Clear the cart.
- Checkout:
Order placement and confirmation.
