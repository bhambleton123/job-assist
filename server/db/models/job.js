'use strict';
module.exports = (sequelize, DataTypes) => {
  const Job = sequelize.define('Job', {
    title: DataTypes.STRING,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    link: DataTypes.TEXT,
    description: DataTypes.TEXT,
    posted: DataTypes.STRING,
    userId: DataTypes.STRING,
    listId: DataTypes.INTEGER
  }, {});
  Job.associate = function(models) {
    // associations can be defined here
  };
  return Job;
};