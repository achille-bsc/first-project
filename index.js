const app = require('express')();
const serveur = require('http').createServer(app);
const io = require('socket.io')(serveur);

const globalCommand = ['/clearall']

const port = 3000;

app.get('/', async (req, res) => {
	res.sendFile(`${__dirname}/public/global/global.html`);
})
app.get('/global', async (req, res) => {
	res.sendFile(`${__dirname}/public/global/global.html`);
})
io.on('connection', (socket) => {
	console.log('Un utilisateur s\'est connecté');

	socket.on('chat-message-sent', (msg) => {
		switch (msg) {
			case globalCommand[0]:
				io.emit('clearall');
				break;
		
			default:
				io.emit('chat-message', msg);
				break;
		}
	})

	socket.on('disconnect', () => { 
		console.log('Un utilisateur viens de se déconnecter')
	})
})

serveur.listen(port, () => {
	console.log(`Serveur en route sur le port ${port}`);
})