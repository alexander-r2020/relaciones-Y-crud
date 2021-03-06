const path = require('path');
const db = require('../database/models');
const sequelize = db.sequelize;
const { Op } = require("sequelize");


//Aqui tienen una forma de llamar a cada uno de los modelos
// const {Movies,Genres,Actor} = require('../database/models');

//Aquí tienen otra forma de llamar a los modelos creados
const Movies = db.Movie;
const Genres = db.Genre;
const Actors = db.Actor;


const moviesController = {
    'list': (req, res) => {
        db.Movie.findAll()
            .then(movies => {
                res.render('moviesList.ejs', {movies})
            })
    },
    'detail': (req, res) => {
        db.Movie.findByPk(req.params.id)
            .then(movie => {
                res.render('moviesDetail.ejs', {movie});
            });
    },
    'new': (req, res) => {
        db.Movie.findAll({
            order : [
                ['release_date', 'DESC']
            ],
            limit: 5
        })
            .then(movies => {
                res.render('newestMovies', {movies});
            });
    },
    'recomended': (req, res) => {
        db.Movie.findAll({
            where: {
                rating: {[db.Sequelize.Op.gte] : 8}
            },
            order: [
                ['rating', 'DESC']
            ]
        })
            .then(movies => {
                res.render('recommendedMovies.ejs', {movies});
            });
    },
    //Aqui dispongo las rutas para trabajar con el CRUD
    add: function (req, res) {
        Genres.findAll()
        .then(genre=>{
            res.render("moviesAdd",{allGenres:genre})
        })
        .catch(error=>console.log(error))
        
    },
    create: function (req,res) {
        Genres.create(req.body)
        .then(genre=>{
            res.redirect(`/movies/detail/${genre.id}`)
        })
        .catch(error=>console.log(error))
    },
    edit: function(req,res) {
        Movies.findByPk(req.params.id)
        
        .then(movie=>{
            Genres.findAll()
            .then(genre=>{
                res.render("moviesEdit",{allGenres:genre,Movie:movie})
            })
            .catch(error=>console.log(error))
            
        })
        .catch(error=>console.log(error))
    },
    update: function (req,res) {
        const {title,rating,awards,release_date,length,genre_id}=req.body
        Movies.update({
            title,
            rating,
            awards,
            release_date,
            length,
            genre_id
        },
        {
            where:{id:+req.params.id}
        })
        .then(movie=>{
            res.redirect(`/movies/detail/${req.params.id}`)
        })
        .catch(error=>console.log(error))
    },
    delete: function (req,res) {
        Movies.findByPk(req.params.id)
        .then(movie=>{
            res.render("moviesDelete",{Movie:movie})
        })
        .catch(error=>console.log(error))
        
    },
    destroy: function (req,res) {
        Movies.destroy({
            where:{id:+req.params.id}
        })
        .then(result=>{
            res.redirect("/movies")
        })
        .catch(error=>console.log(error))
    }
}

module.exports = moviesController;