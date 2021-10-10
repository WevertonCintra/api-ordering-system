export default {
  jwt: {
    secret: process.env.APP_SECRET_TOKEN,
    expiresIn: '1d'
  }
}
