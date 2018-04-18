var jwtSecret = {
  mykey: "jwtSecretKey" + "l3ME78NzBUSX8irpUgnuew",
  jwtSecretKey: "",

  generateKey: function() {
    this.jwtSecretKey = this.mykey + new Date().toUTCString()
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