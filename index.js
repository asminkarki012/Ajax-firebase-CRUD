const input = [...document.querySelectorAll('input')];
//use your firebase realtime database link here
const url = 'https://intranetinternetlab-default-rtdb.firebaseio.com/.json';


// POST operation 
// server side url is mandatory

document.getElementById('submit-but').addEventListener('click',submitForm);
document.getElementById('submit-but').addEventListener('submit',submitForm);


function submitForm(e) {
    e.preventDefault();
    
    let name = input[0].value;
    let email = input[1].value;
    let age = input[2].value;
    let roll = input[3].value;
    let phone = input[4].value;
    let checkEmail = input[1].value.split(''); 
     
    //  console.log(checkEmail);
     if (!checkEmail.includes('@')) { 
     alert('Invalid checkEmail! Need @'); 
     return; 
     } 
     if (checkEmail.includes('.')) { 
     let i = checkEmail.lastIndexOf('.') 
     if (i === checkEmail.length - 1) { 
     alert('Invalid Email'); 
     return; 
     } 
     } 
     else{ 
     alert('Invalid Email Need .'); 
     return; 
     } 
     if (input[4].value.charAt(0) !== '9' || input[4].value.charAt(1) !== '8') { 
     alert('Phone Number starting with 98 only allowed'); 
     return; 
     } 
     if(input[4].value.length!==10){ 
     alert('Invalid Phone Number!, Length = 10'); 
 return; 
 }

    var xhr = new XMLHttpRequest();
    xhr.open('POST',url,true);
    xhr.onreadystatechange = function(){
        
        if(this.readyState==4 && this.status==200){
            
        let response = this.responseText;
        alert('Data insert successfully');
        
        
    }

 }
    //insert your json format data here
    var postData = {name:name,email:email,age:age,roll:roll,phone:phone};
    
        // json content type
    xhr.setRequestHeader("Content-Type", "application/json");

        // send request with json data
    xhr.send(JSON.stringify(postData));

    resetForm();
    
} 


      


    //For GET operation
document.getElementById('button2').addEventListener('click',loadUsers);

function loadUsers(){
    
    
   
    var xhr = new XMLHttpRequest();
    xhr.open('GET',url,true);

    xhr.onreadystatechange = function(){
        
        if(this.readyState==4 && this.status==200){
            var users = JSON.parse(this.responseText);
            // console.log(users);
            
            
            var output = '<div><table><tr><th>Name</th><th>Email</th><th>Age</th><th>Roll</th><th>Phone</th><th>Delete</th></tr>';
             
            for(let i in users){
                //i is id of each object
                //  console.log(i); 
                output += '<tr><td>'+users[i].name+'</td><td>'+users[i].email+'</td><td> '+users[i].age+'</td><td>'+users[i].roll+'</td><td>'+users[i].phone+'</td><td><button class="delete" id='+i+'>Delete</button></td></tr>';
        }
        
        output+='</table></div>'
        }
        
        
        document.getElementById('users').innerHTML = output;
         
        //for working of each delete button
        const deleteList = document.querySelectorAll('.delete');

        //get unique id when delete button is pressed
        deleteList.forEach((element)=>{
                    element.addEventListener('click',(e)=>{
                        let deleteKey = e.target.id;
                        let deletedEmail = users[deleteKey].email;
                        
                        // alert(deleteKey);
                        deleteData(deleteKey,deletedEmail);
                        

                        
                    })
                });
 }
    
    xhr.send();
}
   



function deleteData(toDeleteId,deletedEmail){
    
    let deleteUrl = `https://intranetinternetlab-default-rtdb.firebaseio.com/${toDeleteId}.json`;
   
    
    var xhr = new XMLHttpRequest();
                     
            xhr.open("DELETE", deleteUrl, true);
        
        xhr.onreadystatechange = function(){
            if(this.status==200 && this.readyState==4){
                    alert(/*'User-Id: '+toDeleteId+*/'\n User-email: '+deletedEmail+' deleted succefully');
            }
        }
        xhr.send();
        
        loadUsers();


}
function resetForm(){
    document.getElementById('myForm').reset();

}


//Update remaining
