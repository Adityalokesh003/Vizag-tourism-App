 


function validateUsername()
{
	var username = document.getElementById("username").value ;
	if(username.length < 6 || username.length > 20)
	{
		alert("the name should atleast contain 6 characters");
		document.getElementById("username").focus();
		document.getElementById("username").style.border= "1px solid red";
		return false ;
	}

	var letters = /^[A-Za-z0-9@_]+$/;
    if(!(username.match(letters)))
    {
 		alert("the name should  not have special characters otherthan @ and _");
		document.getElementById("username").focus();
  		document.getElementById("username").style.border= "1px solid red";
		return false ;
	}
		if (validatePassword()) {
			return true ;
		}
    	 return false;
		
}

function validatePassword()
{
	var password = document.getElementById("password").value ;
	if(password.length < 5 || password.length >20)
	{
		alert("The password length should be in between 5 and 20");
		document.getElementById("password").focus();
  		document.getElementById("password").style.border= "1px solid red";
		return false ;
	}
	if(password.search(/[A-Z]/) < 0)
	{
		alert("Password must contain a capital letter") ;
		document.getElementById("password").focus();
		document.getElementById("password").style.border= "1px solid red";
		return false ;
	}
	if(password.search(/[!@#$%^&*_]/) < 0)
	{
		alert("Password must contain a Special Character i.e, any one of  '!' '@' '#' '$' '%' '^' '&' '*' '_' ");
		document.getElementById("password").focus();
  		document.getElementById("password").style.border= "1px solid red";
		return false ;
	}
		
	
	return true ;
}
  






 











 
     
     
       

       