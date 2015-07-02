var deci = 0;
var matherror = 0;
function displaynum(value){
	var display = document.getElementById("nd");
	var str1 = display.innerHTML;
	if(matherror == 1){
		str1="";
		matherror=0;
	}
	//alert(typeof str1);
	if(value=="-"|value=="+"){
		deci = 0;
		var char1 = str1.charAt(str1.length - 1);
		//alert(char1);
		if(char1=='-'|char1=='+'|char1=="."){
			str1 = str1.substring(0, str1.length - 1);
		}
	}
	else if(value=='*'|value=='/'){
		deci = 0;
		if(str1.length>0){
			var char1 = str1.charAt(str1.length - 1);
			if(char1=='*'|char1=='/'){
				str1 = str1.substring(0, str1.length - 1);
			}
			else if(char1=='-'|char1=='+'|char1=='.'){
				var char2 = str1.charAt(str1.length - 2);
				str1 = str1.substring(0, str1.length - 1);
				if(char2=='*'|char2=='/'){
					str1 = str1.substring(0, str1.length - 1);
				}
			}
		}
		else{
			value = "";
		}
	}
	else if(value=='.'){
		if(deci==1){
			value = "";
		}
		else{
			deci=1;
		}
	}
	display.innerHTML = str1 + value;
	//alert(display.innerHTML);
}
function clearall(){
	matherror = 0;
	deci = 0;
	var display = document.getElementById("nd");
	display.innerHTML = '';
}
function backspace(){
	var display = document.getElementById("nd");
	var str1 = display.innerHTML;
	if(matherror == 1){
		str1="";
		matherror=0;
	}
	var char1 = str1.charAt(str1.length - 1);
	if(char1=="."){
		deci = 0;
	}
	else if(char1=="/"|char1=="*"){
		for(i=str1.length-2;i>-1;i--){
			if(str1.charAt(i)=="*"|str1.charAt(i)=="/"|str1.charAt(i)=="-"|str1.charAt(i)=="+"){
				deci = 0;
				i=-1;
			}
			else if(str1.charAt(i)=="."){
				deci = 1;
				i=-1;
			}
		}
	}
	else if(char1=="+"|char1=="-"){
		var char2 = str1.charAt(str1.length - 2)
		if(char2!="/"|char2!="*"){
			for(i=str1.length-2;i>-1;i--){
				if(str1.charAt(i)=="*"|str1.charAt(i)=="/"|str1.charAt(i)=="-"|str1.charAt(i)=="+"){
					deci = 0;
					i=-1;
				}
				else if(str1.charAt(i)=="."){
					deci = 1;
					i=-1;
				}
			}
		}
	}
	display.innerHTML = str1.substring(0, str1.length-1);
}
function dosum(){
	if(matherror == 1){
		str1="";
		matherror=0;
	}
	var display = document.getElementById("nd");
	var str1 = display.innerHTML;
	var value1= new BigNumber("0");
	var value2= new BigNumber("0");
	var end = 0;
	var start = 0;
	if(str1.charAt(str1.length-1)=='-'|str1.charAt(str1.length-1)=='+'|str1.charAt(str1.length-1)=='*'|str1.charAt(str1.length-1)=='/'){
		str1 = str1.substring(0, str1.length-1);
	}
	for(i=0;i<str1.length;i++){
		if(str1.charAt(i)=='*'){
			for(j=i+1;j<str1.length;j++){
				if(j==i+1&(str1.charAt(j)=='-'|str1.charAt(j)=='+')){
					j++;
				}
				
				if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value1 = new BigNumber(str1.substring(i+1,j));
					end = j;
					j=str1.length;
					//alert('nextmult');
					//alert(value1);
				}
				else if(j==str1.length-1){
					value1 = new BigNumber(str1.substring(i+1));
					end = j+1;
					//alert('nextmult');
					//alert(value1);
				}
			}
			for(j=i-1;j>-1;j--){
				if(j==0){
					value2 = new BigNumber(str1.substring(j,i));
					start = -1;
					j = -1;
					//alert('next1mult');
					//alert(value2);
				}
				else if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value2 = new BigNumber(str1.substring(j+1,i));
					start = j+1;
					j = -1;
					//alert('next1mult');
					//alert(value2);
				}
			}
			ans = value1.times(value2);
			str1 = str1.substring(0,start) + ans + str1.substring(end);
			//alert('next2mult');
			//alert(str1);
			i=-1;
		}
	}
	for(i=0;i<str1.length;i++){
		if(str1.charAt(i)=='/'){
			for(j=i+1;j<str1.length;j++){
				if(j==i+1&(str1.charAt(j)=='-'|str1.charAt(j)=='+')){
					j++;
				}
				
				if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value1 = new BigNumber(str1.substring(i+1,j));
					end = j;
					j=str1.length
				}
				else if(j==str1.length-1){
					value1 = new BigNumber(str1.substring(i+1));
					end = j+1;
				}
			}
			for(j=i-1;j>-1;j--){
				if(j==0){
					value2 = new BigNumber(str1.substring(j,i));
					start = -1;
					j = -1;
					//alert('next1');
					//alert(value2);
				}
				else if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value2 = new BigNumber(str1.substring(j+1,i));
					start = j+1;
					j = -1;
					//alert('next1');
					//alert(value2);
				}
			}
			ans = value2.dividedBy(value1);
			str1 = str1.substring(0,start) + ans + str1.substring(end);
			//alert(str1);
			i=-1;
		}
	}
	for(i=0;i<str1.length;i++){
		if(str1.charAt(i)=='+'){
			for(j=i+1;j<str1.length;j++){
				if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value1 = new BigNumber(str1.substring(i+1,j));
					end = j;
					j=str1.length
				}
				else if(j==str1.length-1){
					value1 = new BigNumber(str1.substring(i+1));
					end = j+1;
				}
			}
			for(j=i-1;j>-1;j--){
				if(j==0){
					value2 = new BigNumber(str1.substring(j,i));
					start = -1;
					j = -1;
					//alert('next1');
					//alert(value2);
				}
				else if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value2 = new BigNumber(str1.substring(j+1,i));
					start = j+1;
					j = -1;
					//alert('next1');
					//alert(value2);
				}
			}
			ans = value1.plus(value2);
			str1 = str1.substring(0,start) + ans + str1.substring(end);
			//alert(str1);
			i=-1;
		}
	}
	for(i=1;i<str1.length;i++){
		if(str1.charAt(i)=='-'){
			for(j=i+1;j<str1.length;j++){
				if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value1 = new BigNumber(str1.substring(i+1,j));
					end = j;
					j=str1.length
					//alert('nextmin');
					//alert(value1);
				}
				else if(j==str1.length-1){
					value1 = new BigNumber(str1.substring(i+1));
					end = j+1;
					//alert('nextmin');
					//alert(value1);
				}
			}
			for(j=i-1;j>-1;j--){
				if(j==0){
					value2 = new BigNumber(str1.substring(j,i));
					start = -1;
					j = -1;
					//alert('next1min');
					//alert(value2);
				}
				else if(str1.charAt(j)=='-'|str1.charAt(j)=='+'|str1.charAt(j)=='*'|str1.charAt(j)=='/'){
					value2 = new BigNumber(str1.substring(j+1,i));
					start = j+1;
					j = -1;
					//alert('next1min');
					//alert(value2);
				}
			}
			ans = value2.minus(value1);
			str1 = str1.substring(0,start) + ans + str1.substring(end);
			//alert('next2min');
			i=0;
		}
	}
	//alert(str1);
	for(i=0;i<str1.length;i++){
		if(str1.charAt(i)=="*"|str1.charAt(i)=="+"|str1.charAt(i)=="-"|str1.charAt(i)=="/"|str1.charAt(i)=="i"){
			str1 = "MATH ERROR";
			matherror=1;
			deci = 0;
		}
		if(str1.charAt(i)=="."){
			deci = 1;
			i = str1.length;
		}
		else{
			deci=0;
		}
	}
	display.innerHTML = str1;
	
}