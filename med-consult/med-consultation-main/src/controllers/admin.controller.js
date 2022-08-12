var admin = require("firebase-admin");

function getAllAccountRequests(req, res) {
    admin.firestore().collection('users').where('accepted','==',false).get().then(
        (val)=>{
            let temp = []
            val.docs.forEach(element => {
              let curr = element.data();
              curr['uid']=element.id
                temp.push(curr)
            });
            res.status(200).send(temp);
        }
    )
}
function acceptAccountRequest(req,res){
    var id = req.body.uid;
    console.log(req)
    admin.firestore().collection('users').doc(id).update({
        'accepted':true
    }).then((val)=>{
        res.send(200).send({
            "message":"User accepted"
        })
    },(error)=>{
        console.log(error);
    })
}




module.exports={
    getAllAccountRequests,
    acceptAccountRequest
}