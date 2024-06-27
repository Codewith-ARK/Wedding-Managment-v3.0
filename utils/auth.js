const bcrypt = require('bcrypt');

async function auth(userEmail, userPassword, email, password){
  if(userEmail === email){
    const result = await bcrypt.compare(userPassword, password)
    if(result){
      return true
    }
    return false;
  } 
  return false;
}

module.exports = auth;