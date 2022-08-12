var admin = require("firebase-admin");
//['patient',doctor,admin]
function getAllDoctors(req,res) {
    admin.firestore().collection('users').where('role','==','1').where('accepted','==',true).get().then(
        (val)=>{
            let result=[]
            val.docs.forEach(element => {
                let curr=element.data();
                curr['uid']=element.id;
                result.push(curr);
            });
            res.status(200).send(result);
        },
        (error)=>{
            res.send(error);
        });
}
function getAllPatients(req,res){
    admin.firestore().collection('users').where('role','==','0').where('accepted','==',true).get().then(
        (val)=>{
            let result=[]
            val.docs.forEach(element => {
                let curr=element.data();
                curr['uid']=element.id;
                result.push(curr);
            });
            res.status(200).send(result);
        },
        (error)=>{
            res.send(error);
        });

}
function getAllAdmins(req,res){
    admin.firestore().collection('users').where('role','==','2').where('accepted','==',true).get().then(
        (val)=>{
            let result=[]
            val.docs.forEach(element => {
                let curr=element.data();
                curr['uid']=element.id;
                result.push(curr);
            });
            res.status(200).send(result);
        },
        (error)=>{
            res.send(error);
        });

}
module.exports={
    getAllDoctors,
    getAllPatients,
    getAllAdmins
}