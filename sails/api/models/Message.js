module.exports = {

	attributes: {
		id: 'INT',
		content: 'STRING',
		idThread: 'INT',
		idAuthor: 'INT',
		date: { 
			type: 'DATE', 
			defaultsTo: new Date() 
		} 
		
	}
};