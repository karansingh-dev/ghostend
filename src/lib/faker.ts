import { faker } from "@faker-js/faker";

export const DataMapper = {
  // Basic Types
  string: (options?: { length?: number }) =>
    faker.lorem.word({ length: options?.length || 5 }),
  number: (options?: { min?: number; max?: number }) =>
    faker.number.int({
      min: options?.min ?? 1,
      max: options?.max ?? 100,
    }),
  boolean: () => faker.datatype.boolean(),
  date: () => faker.date.anytime(),

  // Text Types
  sentence: () => faker.lorem.sentence(),
  paragraph: (options?: { count?: number }) =>
    faker.lorem.paragraph(options?.count ?? 3),
  word: () => faker.lorem.word(),
  text: () => faker.lorem.text(),

  // Person Types
  firstname: () => faker.person.firstName(),
  lastname: () => faker.person.lastName(),
  name: () => faker.person.fullName(),
  fullname: () => faker.person.fullName(),
  username: () => faker.internet.username(),
  age: () => faker.number.int({ min: 18, max: 100 }),
  bio: () => faker.person.bio(),
  job: () => faker.person.jobTitle(),

  // Contact Types
  email: () => faker.internet.email(),
  phonenumber: () => faker.phone.number(),
  phone: () => faker.phone.number(),

  // Location Types
  address: () => faker.location.streetAddress(),
  city: () => faker.location.city(),
  state: () => faker.location.state(),
  country: () => faker.location.country(),
  zipcode: () => faker.location.zipCode(),
  latitude: () => faker.location.latitude(),
  longitude: () => faker.location.longitude(),
  timezone: () => faker.location.timeZone(),

  // Internet Types
  url: () => faker.internet.url(),
  domain: () => faker.internet.domainName(),
  website: () => faker.internet.url(),

  // Identifiers
  id: () => faker.string.uuid(),
  uuid: () => faker.string.uuid(),

  // Visual Types
  image: (options?: { width?: number; height?: number }) =>
    faker.image.url({
      width: options?.width ?? 640,
      height: options?.height ?? 480,
    }),
  avatar: () => faker.image.avatar(),
  color: () => faker.color.rgb(),

  // Business Types
  company: () => faker.company.name(),
  product: () => faker.commerce.product(),
  price: (options?: { min?: number; max?: number; decimals?: number }) =>
    faker.commerce.price({
      min: options?.min ?? 1,
      max: options?.max ?? 1000,
      dec: options?.decimals ?? 2,
    }),
  currency: () => faker.finance.currency(),
  creditcard: () => faker.finance.creditCardNumber(),

  // Additional Types
  locale: () => faker.location.countryCode(),
  department: () => faker.commerce.department(),
  productname: () => faker.commerce.productName(),
  description: () => faker.commerce.productDescription(),
} as const;

