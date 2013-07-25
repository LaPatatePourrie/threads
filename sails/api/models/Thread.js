/*--------------------- 
	:: Thread 
	-> model 
---------------------*/ 
module.exports = {
 	
	attributes: { 
		id: 'INT',
		idAuthor: 'INT',
		title: 'STRING',
		date: { 
			type: 'DATE', 
			defaultsTo: new Date() 
		} 
		
	}
 
}; 
