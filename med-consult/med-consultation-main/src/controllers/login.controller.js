var admin = require("firebase-admin");
var firebase = require("firebase");
function signup(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  let role = req.body.role;
  admin
    .auth()
    .createUser({
      email,
      emailVerified: false,
      password
    })
    .then(
      val => {
        admin
          .firestore()
          .collection("users")
          .doc(val.uid)
          .set({
            role,
            email,
            accepted: false
          })
          .then(
            val => {
              res.status(200).send({
                code: 200,
                message: "User created successfully"
              });
            },
            error => {
              console.log(error);
              res.send(error);
            }
          );
      },
      error => {
        console.log(error);
        res.send(error);
      }
    );
}

async function login(req, res) {
  let email = req.body.email;
  let password = req.body.password;
  admin
  .firestore().collection('users').where('email','==',email).get().then((val)=>{
      if(val.docs.length==0){
        res.status(404).send({
          "message":"User not found"
        });
        return;
      }
      var user = val.docs[0].data();
      if(!user.accepted){
        res.status(404).send({
          "message":"User not approved"
        });
        return;
      }
      firebase
    .auth()
    .signInWithEmailAndPassword(email, password)
    .then(
      userCredentials => {
        let user = userCredentials.user;
        admin
          .firestore()
          .collection("users")
          .doc(user.uid)
          .get()
          .then(
            details => {
              details = details.data();
              res.status(200).send({
                user,
                details
              });
            },
            error => {
              res.send(error);
            }
          );
      },
      error => {
        res.send(error);
      }
    );
      
  },(error)=>{
      console.log(error);
      res.send(error);
  });
}

function authenticate(req,res){
  let token = req.body.token;
  admin
  .auth()
  .verifyIdToken(token)
  .then((decodedToken) => {
    const uid = decodedToken.uid;
    console.log(decodedToken);
    // ...
  })
  .catch((error) => {
    // Handle error
    console.log(error);
  });
}
function logout(req,res){
  let uid = req.body.uid;
  admin.auth().revokeRefreshTokens(uid).then((val)=>{
    res.status(200).send({
      message:"Logout successful"
    })
  })
}

module.exports = {
  login,
  signup,
  logout,
  authenticate
};
