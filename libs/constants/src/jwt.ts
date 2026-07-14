require('dotenv').config(process.env.NODE_ENV ? `${process.env.NODE_ENV}.env` : '.env')

export const jwtConstants = {
  secret: process.env.JWT_SECRET || "PLEASE CREATE A JWT SECRET AND STORE IT IN A SECURE ENVIRONMENT",
}