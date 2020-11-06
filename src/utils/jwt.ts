const jwt = require('jsonwebtoken')
const { JWT_KEY } = process.env;

function generateToken(id:any){
   const token = jwt.sign({ id }, JWT_KEY, { expiresIn: '24h' });
   return token;
}

function validateToken(token:any){
  let decoded;
  try{
    decoded = jwt.verify(token, JWT_KEY);

  }catch(e){
    return null;
  }
  return decoded;
}


export { generateToken, validateToken}
