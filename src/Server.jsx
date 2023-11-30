const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 3001;

app.use(express.json());

app.get('/api/vk', async (req, res) => {
    try {
        const response = await axios.get(
            'https://api.vk.com/method/wall.get?owner_id=-51805036&domain=localhost&count=10&filter=all&access_token=9a60d0289a60d0289a60d0285c9976ab4499a609a60d028ff085dabddbb85309ca800d1&v=5.131', {
                params: req.query,
            }
        );

        res.json(response.data);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
