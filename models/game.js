var Sequelize = require('./sequelize-client');

var Game = Sequelize.conn.define('Game', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  version: {
    type: Sequelize.STRING
  },
  price: {
    type: Sequelize.INTEGER
  },
  url: {
    type: Sequelize.STRING
  },
  artwork1Url: {
    type: Sequelize.STRING
  },
  artwork2Url: {
    type: Sequelize.STRING
  },
  artwork3Url: {
    type: Sequelize.STRING
  },
  artistId: {
    type: Sequelize.INTEGER
  },
  artistName: {
    type: Sequelize.STRING
  },
  averageRating: {
    type: Sequelize.FLOAT
  },
  ratingCount: {
    type: Sequelize.INTEGER
  },
  averageRatingForCurrentVersion: {
    type: Sequelize.FLOAT
  },
  ratingCountForCurrentVersion: {
    type: Sequelize.INTEGER
  },
  jsonText: {
    type: Sequelize.TEXT,
    allowNull: false
  }
}, {
  tableName: 'm_game',
  instanceMethods: {
    setByApiJson: function(json) {
      this.jsonText = JSON.stringify(json);

      this.id = json.trackId;
      this.name = json.trackName;
      this.version = json.version;
      this.price = json.price;
      this.url = json.trackViewUrl;
      this.artwork1Url = json.artworkUrl60;
      this.artwork2Url = json.artworkUrl100;
      this.artwork3Url = json.artworkUrl512;
      this.artistId = json.artistId;
      this.artistName = json.artistName;
      this.averageRating = json.averageUserRating;
      this.ratingCount = json.userRatingCount;
      this.averageRatingForCurrentVersion = json.averageUserRatingForCurrentVersion;
      this.ratingCountForCurrentVersion = json.userRatingCountForCurrentVersion;
    }
  }
});

module.exports = Game;
