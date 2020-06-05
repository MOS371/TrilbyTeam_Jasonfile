//Declare variables
var employee = document.getElementById('cardContainer');
var empImg = '';
//Request to jason file
var request = new XMLHttpRequest();
request.open('GET', 'http://sandbox.bittsdevelopment.com/code1/fetchemployees.php', true);
request.onload = function() {
    // Begin accessing JSON data 
    var data = JSON.parse(this.response);
    console.log(Object.values(data));
    //Converting the object into array for each loop for accessing the nested objects
    Object.values(data).forEach((value) => {

        const card = document.createElement('div');
        card.setAttribute('class', 'card');
        
        //Crown for the featured employee using if statement

        if(value.employeeisfeatured === "1"){
            let icon = document.createElement('i');
            icon.setAttribute('class', 'fas fa-crown');
            card.appendChild(icon);
        }

        //Displaying Name of the employee
        const h1 = document.createElement('h1');
        h1.textContent = (value.employeefname + " " + value.employeelname);

        //Displaying bio of the employee
        const p = document.createElement('p');
        p.textContent = (value.employeebio);

        //Displaying image of the employee
        const img = document.createElement('img');
        var Img = "http://sandbox.bittsdevelopment.com/code1/employeepics/id.jpg"; 
        empImg = Img.replace("id", value.employeeid);
        console.log(empImg); 
        img.setAttribute('src', empImg);

        employee.appendChild(card);       
        card.appendChild(img);
        card.appendChild(h1);
        card.appendChild(p);
        //for loop for the roles to access the nested objects
        for(var role of value.roles){
            var empRole = document.createElement('div');
            empRole.setAttribute('class', 'eRole'); 
            empRole.setAttribute('id', role.rolename);
            empRole.setAttribute("style","background-color:" + role.rolecolor);
            empRole.innerHTML +=(role.rolename)+ '<br/>';  
            card.appendChild(empRole); 
        }
    });
}
request.send();