const dbForm = document.getElementById("db-form");
const radioButtons = document.getElementsByName('changeDB')
const radioStaticDB = document.getElementById("staticDB");
const radioMongoDB = document.getElementById("mongoDB");

if (radioStaticDB && radioMongoDB) {
  radioStaticDB.addEventListener('click', ()=>{
    dbForm.submit();  
  });
  radioMongoDB.addEventListener('click', ()=>{
    dbForm.submit();
  });
};


