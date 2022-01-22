module.exports = (sequelize, dataTypes) => {
    let alias = 'Movie'; // esto debería estar en singular
    let cols = {
        id: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        // created_at: dataTypes.TIMESTAMP,
        // updated_at: dataTypes.TIMESTAMP,
        title: {
            type: dataTypes.STRING(500),
            allowNull: false
        },
        rating: {
            type: dataTypes.DECIMAL(3, 1).UNSIGNED,
            allowNull: false
        },
        awards: {
            type: dataTypes.BIGINT(10).UNSIGNED,
            allowNull: false
        },
        release_date: {
            type: dataTypes.DATEONLY,
            allowNull: false
        },
        length: {
            type:dataTypes.BIGINT(10)
        },
        genre_id: {
            type:dataTypes.INTEGER
        }
    };
    let config = {
        timestamps: true,
        createdAt: 'created_at',
        updatedAt: 'updated_at',
        deletedAt: false
    }
    const Movie = sequelize.define(alias,cols,config);

    Movie.associate = function(models){
        Movie.belongsTo(models.Genre,{
            as:"Generos",
            foreignKey:"genre_id"
        })
    }
    Movie.associate = function(models){
        Movie.belongsToMany(models.Actor,{
            as:"Actors",
            through:"actor_movie", //nombre de tabla intermedia
            foreignKey:"movie_id", //nombre del id en la tabla intermedia
            otherKey:"actor_id", //nombre del segundo id en la tabla intermedia
            timestamps:false
        })
    }

    //Aquí debes realizar lo necesario para crear las relaciones con los otros modelos (Genre - Actor)

    return Movie
};