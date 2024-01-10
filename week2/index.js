const express = require('express');
const cors = require('cors');
const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.static('public'));

const professionalData = {
    professionalName: 'John Doe',
    base64Image: 'your_base64_encoded_image_here',
    nameLink: {
        firstName: 'John Doe',
        url: 'https://example.com'
    },
    primaryDescription: 'Primary Description Text',
    workDescription1: 'Work Description 1',
    workDescription2: 'Work Description 2',
    linkTitleText: 'Link Title Text',
    linkedInLink: {
        text: 'LinkedIn',
        link: 'https://www.linkedin.com/'
    },
    githubLink: {
        text: 'GitHub',
        link: 'https://github.com/'
    }
};

app.get('/professional', (req, res) => {
    console.log('Request to /professional received');
    res.json(professionalData);
})

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});