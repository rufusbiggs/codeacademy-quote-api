const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

// GET random quote
app.get('/api/quotes/random', (req, res) => {
    const randomElement = getRandomElement(quotes);
    const randomQuote = { quote: randomElement }
    res.send(randomQuote);
})

// GET all quotes by author
app.get('/api/quotes', (req, res) => {
    if (req.query.person) {
        const personsQuotes = quotes.filter(author => {
            return author.person === req.query.person;
        }) 
        res.send({ quotes: personsQuotes });
    } else {
        res.send({ quotes: quotes })
    }
})

// POST new quote to list
app.post('/api/quotes', (req, res) => {
    const newQuote = req.query.quote;
    const newPerson = req.query.person;
    if (newQuote != '' && newPerson != '') {
        quotes.push({ 
            quote: newQuote,
            person: newPerson
        });
        res.send({ quote: { 
            quote: newQuote,
            person: newPerson
        } });
    } else {
        res.status(400).send();
    }
});