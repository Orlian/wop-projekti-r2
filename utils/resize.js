'use strict';

const sharp = require('sharp');

const makeThumbnail = async (file, thumbname) => {
  return await sharp(file).resize(200, 200).toFile('thumbnails/' + thumbname);
};

module.exports = {
  makeThumbnail,
}