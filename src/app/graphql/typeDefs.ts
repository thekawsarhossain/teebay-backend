export const typeDefs = `#graphql 
    type User {
        id: ID!
        firstName: String!
        lastName: String!
        address: String!
        email: String!
        phone: String!
        password: String!
        products: [Product!]
        transactions: [Transaction!]
        rentals: [Rental!]
    }

    type Product {
        id: ID!
        title: String!
        categories: [String!]!
        description: String!
        price: Float!
        rentPrice: Float!
        rentOption: String!
        owner: User!
        createdAt: String!
        transactions: [Transaction]
        rentals: [Rental]
    }

    type Transaction {
        id: ID!
        buyer: User!
        product: Product!
        type: String!
        createdAt: String!
    }

    type Rental {
        id: ID!
        product: Product!
        renter: User!
        startTime: String!
        endTime: String!
    }

`