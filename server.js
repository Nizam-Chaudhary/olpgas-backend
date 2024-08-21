const express = require('express');
const app = express();

// PORT
const PORT = 5000;

// enable json parsing
app.use(express.json());
// enable body parsing
app.use(express.urlencoded({ extended: false }));

app.use('*', (req, res) => {
	res.status(200).json({
		message: 'Resource not found',
	});
});

app.use((error, req, res) => {
	console.error(error);
	res.status(500).json({
		message: 'Internal Server Error',
	});
});

const startServer = async () => {
	app.listen(PORT, () => {
		console.log(`Server is live on http://localhost:${PORT}`);
	});
};

startServer();
