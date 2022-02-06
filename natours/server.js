const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

const app = require('./app');

// PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`server started on port ${PORT}`);
});
