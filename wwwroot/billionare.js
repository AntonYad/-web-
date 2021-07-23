
 var billionareBudget=3270508500000;


 function chooseBillionare(value){
 	if(value==1){
 		console.log("Bezos");
 		document.getElementById("BillionareName").innerHTML="Jeff Bezos";
 		billionareBudget=8030179000000;
 		document.getElementById("balance").innerHTML=`&#8377 ${billionareBudget}`;		
 		document.getElementById("BillionareImage").src="images/bezos.jpg";
 	}

 	else if(value==2){
 	   console.log("Gates");
 	   document.getElementById("BillionareName").innerHTML="Bill Gates";
 	   billionareBudget=7641152250000;
 	   document.getElementById("balance").innerHTML=`&#8377 ${billionareBudget}`;
 	   document.getElementById("BillionareImage").src="images/Gates.jpg";
 	}

 	else if(value==3){
 	   console.log("ambani");
 	   billionareBudget=3270508500000;	                     
 	   document.getElementById("BillionareName").innerHTML="Mukesh Ambani";
 	   document.getElementById("balance").innerHTML=`&#8377 ${billionareBudget}`;
 	   document.getElementById("BillionareImage").src="images/ambani.jpg";

 	}
 
 /*For handling selected item list container */
 	for(i=0;i<30;i++){
	 	 document.getElementsByClassName("badge")[i].innerHTML =0;
	 	 document.querySelectorAll(".sell")[i].disabled=true;

 	}
 	document.getElementById('tableData').innerHTML = "";
 }

 function sellProduct(i){
    var amt=parseInt(document.getElementsByClassName("amt text-success")[i].value.slice(1));
    var balance = parseInt(document.querySelector("#balance").textContent.slice(1));
    var itemcount=parseInt(document.querySelectorAll(".badge")[i].textContent);
    var ITEMCOUNT=document.querySelectorAll(".badge");
    var ITEMNAME=document.querySelectorAll("h4");

    if(balance>=billionareBudget || billionareBudget-balance<amt){
    	alert("No item left to sell");
    }

    else{
	    var total=amt+balance;
	    if(total>=billionareBudget){
	    	document.getElementById("balance").innerHTML = `&#8377 ${billionareBudget}`;
	    	document.getElementsByClassName("badge")[i].innerHTML =itemcount-1;
	    }
	    else{
	    	document.getElementById("balance").innerHTML = `&#8377 ${total}`;
	    	document.getElementsByClassName("badge")[i].innerHTML =itemcount-1;
	    }
    }

    if(itemcount==1){
    	document.querySelectorAll(".sell")[i].disabled=true;
    }

    bucketItems();

  }

function buyProduct(i){
    var amt=parseInt(document.getElementsByClassName("amt text-success")[i].value.slice(1));
    var balance = parseInt(document.querySelector("#balance").textContent.slice(1));
    var itemcount=parseInt(document.querySelectorAll(".badge")[i].textContent);
    var ITEMCOUNT=document.querySelectorAll(".badge");
    var ITEMNAME=document.querySelectorAll("h4");
    
    
    if(balance<=0 || balance<amt){
    	alert("No funds left");
    }
    else{
	    var total=balance-amt;
	    if(total<=0){
	    	document.getElementById("balance").innerHTML =`&#8377 ${0}`;
	    	document.getElementsByClassName("badge")[i].innerHTML =itemcount+1;
	    
	    }
	    else{
	    	document.getElementById("balance").innerHTML =`&#8377 ${total}`;
	    	document.getElementsByClassName("badge")[i].innerHTML =itemcount+1;
	    	
	    }
	    
    }

    if(itemcount==0){
    	document.querySelectorAll(".sell")[i].removeAttribute("disabled");
    }

    bucketItems();
    
 
  }


  function bucketItems(){
  	var ITEMCOUNT=document.querySelectorAll(".badge");
    var ITEMNAME=document.querySelectorAll("h4");
    var xyz="Gucci Marmont";
    var dicx={};
    var k = '<tbody>';

  	for(i=0;i<30;i++){
    /*	if(parseInt(ITEMCOUNT[i].textContent)>billionareBudget){
	    	
	    	var para = document.createElement("p");
	        var node = document.createTextNode(`${ITEMNAME[i].textContent} x ${ITEMCOUNT[i].textContent}`);
	        para.appendChild(node);
	        var element = document.getElementById("bucket");
	        element.appendChild(para);
    	} Not used content */

    	  	
	    dicx[ITEMNAME[i].textContent]=parseInt(ITEMCOUNT[i].textContent);
	    

    	
    }
    

    for(var key in dicx) {
    	if(dicx[key]>0){	    	
	        k+= '<tr>';
	        k+=`<td><img alt="100x100" src="images/${key}.jpg" data-holder-rendered="true" height="40" width="40" ></td>`
	        k+= '<td>' + key + '</td>';
	        k+= '<td>' + dicx[key] + '</td>';
	        k+= '</tr>';
       }
    }
    k+='</tbody>';
    document.getElementById('tableData').innerHTML = k;
    
   
  }



 