

```bash
# пакеты для работы
npm i express pg pg-hstore sequelize cors dotenv nodemon express-fileupload uuid
```

```js
// проверка get запроса
app.get('/', (req, res) => {
    res.status(200).json({message: 'working'})
})
```

