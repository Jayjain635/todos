const chai = require('chai');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const chaiHttp = require('chai-http');
const { expect } = chai;
chai.use(chaiHttp);

describe("API Tests", () => {
    const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTQsImlhdCI6MTc0MzUwOTgwNywiZXhwIjoxNzQzNTEzNDA3fQ.2Zfe4C9pG1A8ezQir4ijl-w4fW8TqfnQDtk4rJf_YNU";

//-----registration-----
//   it(" register user successfully", async function () {

//     const res = await chai.request("http://localhost:5000")
//       .post("/api/user/register")
//       .send({
//         name: "TestUser",   
//         email: "y0001@gmail.com",
//         phone: "1234567890",
//         password: "pA@ssword123",
//       });
//       console.log("res.body",res.body);
//     if(res.status==400){
//         expect(res.body.message).to.equal("email already exists");
//     } else{

//         const isPasswordValid = await bcrypt.compare("pA@ssword123", res.body.user.password);  
//         if(isPasswordValid){
//             expect(res).to.have.status(200); 
//             expect(res.body.message).to.equal("user successfully registered");
//             expect(res.body).to.have.property("user");
//             expect(res.body.user).to.have.property("email", "y0001@gmail.com");
//             expect(res.body.user).to.have.property("name");
//             expect(res.body.user).to.have.property("phone");
//         } 
//     }
// });

//-----Login-----
//   it("Login user successfully", async function () {

//     const res = await chai.request("http://localhost:5000")
//       .post("/api/user/login")
//       .send({
//         email: "hy@gmail.com",
//         password: "pA@ssword123",
//       });

//     expect(res).to.have.status(200)  ;
//     expect(res.body.message).to.equal("Login successfully");
// });

//-----Update----- 
//   it("Update userData successfully", async function () {

//     const res = await chai.request("http://localhost:5000")
//       .post("/api/user/update")
//       .set("Authorization", `Bearer ${token}`) 
//       .send({
//         email: "hy@gmail.com",
//         name: "newName",
//       });
//       console.log("res.body -> ",res.body);
//     if(res.status==401){
//         expect(res.body.message).to.equal("jwt expired");
//     }else{
//         expect(res).to.have.status(200);
//         expect(res.body.message).to.equal("User data successfully updated.");
//     }

// });
 

//-----addTask-----
//   it("added task Successfully", async function () {

//     const decodedToken = jwt.decode(token);
//     const res = await chai.request("http://localhost:5000")
//       .post("/api/user/addTask")
//       .set("Authorization", `Bearer ${token}`) 
//       .send({
//         title: "Sample Task",
//         tag : "sample tag",
//         desc: "Task description",
//         userid : decodedToken.id
//       });

//     if(res.status==401){
//         expect(res.body.message).to.equal("jwt expired");
//     }

//     expect(res).to.have.status(200)  ;
//     expect(res.body.message).to.equal("Successfully added task");
// });

//-----updateTask-----
//   it("updated task Successfully", async function () {

//     const decodedToken = jwt.decode(token);
//     const res = await chai.request("http://localhost:5000")
//       .post("/api/user/updateTask")
//       .set("Authorization", `Bearer ${token}`) 
//       .send({
//         title: "Sample Task",
//         tag : "sample tag updated",
//         userid : decodedToken.id
//       });

//     if(res.status==401){
//         expect(res.body.message).to.equal("jwt expired");
//     }
//     expect(res).to.have.status(200);
//     expect(res.body.data.title).to.equal("Sample Task")
//     expect(res.body.message).to.equal("Successfully updated task");
// });

//-----deleteTask-----
//   it("deleted task Successfully", async function () {

//     const decodedToken = jwt.decode(token);
//     const res = await chai.request("http://localhost:5000")
//       .delete("/api/user/deleteTask/7")
//       .set("Authorization", `Bearer ${token}`) 

//     expect(res).to.have.status(200)  ;
//     expect(res.body.message).to.equal("Successfully Deleted task");
// });

});

// pA@ssword123