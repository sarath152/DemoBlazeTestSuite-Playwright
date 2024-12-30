// /utils/fakerUtils.ts
import { faker } from '@faker-js/faker';

export const generateOrderDetails = () => ({
  name: faker.person.fullName(),
  country: faker.location.country(),
  city: faker.location.city(),
  creditCard: faker.finance.creditCardNumber(),
  month: `${faker.date.future().getMonth() + 1}`,
  year: `${faker.date.future().getFullYear()}`,
});

export const generateCredentials = () => ({
  username: faker.internet.username(),
  password: faker.internet.password(),
});
