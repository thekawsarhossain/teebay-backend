# Teebay Backend

## Getting Started

### Installation

Clone the project:

```bash
  git clone https://github.com/thekawsarhossain/teebay-backend.git
```

Go to the project directory:

```bash
  cd teebay-backend
```

Install dependencies:

```bash
  npm install
```

Start the server:

```bash
  npm run start:dev
```

Deploy changes

```bash
npm run deploy
```

**The server will run locally on port 4000, and the live URL is: https://teebay.vercel.app/graphql**

### Environment Variables

Make sure to set the following environment variables:

- `PORT`: Port on which the server will run
- `DATABASE_URL`: Database connection string
- `BCRYPT_SALT_ROUNDS`: Number of bcrypt salt rounds

### Database Schema

The database schema is defined in the `schema.prisma` file. It includes models for `User`, `Product`, `Transaction`, and `Rental`, as well as several enums (`Categories`, `RentOption`, `TransactionType`).

### GraphQL Schema

The GraphQL schema is defined in the `typeDefs.ts` file. It includes types for User, `Product`, `Transaction`, and `Rental`, as well as several queries and mutations.

### Resolvers

The resolvers are defined in the `resolvers.ts` file. They determine how each field in the schema is resolved. This includes resolvers for fetching data (queries), modifying data (mutations), and fetching related data.

### Example Queries and Mutations

[![Postman Documentation](https://documenter.getpostman.com/view/21128063/2s9Ykq6zk7)]

Here are some example queries and mutations that you can use to interact with the API:

#### Queries

```graphql
query GetUser($userId: ID!) {
  getUser(id: $userId) {
    id
    firstName
    lastName
    email
    phone
    address
    products {
      id
      title
      description
      categories
      price
      rentPrice
      rentOption
      createdAt
      owner {
        id
      }
    }
    transactions {
      id
      product {
        title
      }
    }
    rentals {
      id
    }
  }
}

query GetProduct($id: ID!) {
  getProduct(id: $id) {
    id
    title
    description
    categories
    price
    rentPrice
    rentOption
    createdAt
    owner {
      id
    }
  }
}

query GetAllProducts {
  getAllProducts {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
    owner {
      id
      firstName
    }
    createdAt
  }
}

query GetUserProducts($userId: ID!) {
  getUserProducts(userId: $userId) {
    id
    title
    description
    categories
    price
    rentPrice
    rentOption
    createdAt
    owner {
      id
    }
  }
}

query GetBoughtProducts($userId: ID!) {
  getBoughtProducts(userId: $userId) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
    owner {
      id
      firstName
    }
    createdAt
  }
}

query GetSoldProducts($userId: ID!) {
  getSoldProducts(userId: $userId) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
    createdAt
  }
}

query GetBorrowedProducts($userId: ID!) {
  getBorrowedProducts(userId: $userId) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
    createdAt
  }
}

query GetLentProducts($userId: ID!) {
  getLentProducts(userId: $userId) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
    createdAt
  }
}
```

#### Mutations

```graphql
mutation LoginUser($email: String!, $password: String!) {
  loginUser(email: $email, password: $password) {
    email
  }
}

mutation RegisterUser($user: RegisterUserInput!) {
  registerUser(user: $user) {
    id
    email
    firstName
    lastName
  }
}

mutation AddProduct($product: AddProductInput!) {
  addProduct(product: $product) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
    owner {
      id
      firstName
    }
    createdAt
  }
}

mutation EditProduct($productId: ID!, $product: EditProductInput!) {
  editProduct(productId: $productId, product: $product) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
  }
}

mutation DeleteProduct($productId: ID!) {
  deleteProduct(productId: $productId) {
    id
    title
    categories
    description
    price
    rentPrice
    rentOption
  }
}

mutation BuyProduct($productId: ID!, $buyerId: ID!) {
  buyProduct(productId: $productId, buyerId: $buyerId) {
    id
    buyer {
      id
      firstName
    }
    product {
      id
      title
      description
      categories
      price
      rentPrice
      rentOption
      createdAt
      owner {
        id
      }
    }
    type
    createdAt
  }
}

mutation RentProduct(
  $productId: ID!
  $renterId: ID!
  $startTime: String!
  $endTime: String!
) {
  rentProduct(
    productId: $productId
    renterId: $renterId
    startTime: $startTime
    endTime: $endTime
  ) {
    id
    product {
      id
      title
      description
      categories
      price
      rentPrice
      rentOption
      createdAt
      owner {
        id
      }
    }
    renter {
      id
      firstName
    }
    startTime
    endTime
  }
}
```
