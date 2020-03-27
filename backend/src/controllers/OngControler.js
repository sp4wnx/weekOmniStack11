const crypto = require('crypto');
const connection = require('../database/connection');

module.exports = {
  /** Listing All ONGs */
  async index (request, response) {
    const ongs = await connection('ongs').select('*');

    return response.json(ongs);
  },

  /** Insert new ONG */
  async create (request, response) {
    const { name, email, whatsapp, city, state } = request.body;

    const id = crypto.randomBytes(4).toString('HEX');
  
    await connection('ongs').insert({
      id,
      name,
      email,
      whatsapp,
      city,
      state
    })
  
    // console.log(data);
    return response.json({ id });
  }
}
