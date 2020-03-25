const connection = require('../database/connection');

module.exports = {
  /** Listing Posts for the Authenticated ONG */
  async index (request, response) {
    const ong_id = request.headers.authorization;

    if (!ong_id) {
      return response.status(401).json({ error: 'Forbiden Operation.'});
    }

    const posts = await connection('posts')
      .where('ong_id', ong_id)
      .select('*');

    return response.json(posts);
  }
}
