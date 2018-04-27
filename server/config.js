var jwtSecret = {
  mykey: "jwtSecretKey" + "l3ME78NzBUSX8irpUgnuew",
  jwtSecretKey: "",

  generateKey: function() {
    this.jwtSecretKey = Buffer.from(this.mykey + new Date().toUTCString()).toString('base64')
  },

  getJWTKey: function() {
    console.log(this.jwtSecretKey)
    if (!this.jwtSecretKey) {
      this.generateKey()
    }
    console.log(this.jwtSecretKey)
    return this.jwtSecretKey
  }
}

module.exports = jwtSecret