const connection = require('../database/connection');

module.exports = {
  /** Listing Posts ONGs */
  async index (request, response) {
    const { page = 1} = request.query;

    const [count] = await connection('posts').count();

    const posts = await connection('posts')
      .join('ongs', 'ongs.id', '=', 'posts.ong_id')
      .limit(5)
      .offset((page - 1) * 5)
      .select(['posts.*', 
        'ongs.name', 
        'ongs.email', 
        'ongs.whatsapp', 
        'ongs.city', 
        'ongs.state'
      ]);

    response.header('X-Total-Count', count['count(*)']);

    return response.json(posts);
  },

  /** Insert new Post */
  async create (request, response) {
    const { title, description, value } = request.body;
    const ong_id = request.headers.authorization;

    const [id] = await connection('posts').insert({
      title,
      description,
      value,
      ong_id
    })
  
    return response.json({ id });
  },

  /** Delete Post */
  async delete (request, response) {
    const { id } = request.params;
    const ong_id = request.headers.authorization;

    const post = await connection('posts')
      .where('id', id)
      .select('ong_id')
      .first();

    if (!post || post.ong_id !== ong_id) {
      return response.status(401).json({ error: 'Forbiden Operation.'});
    }

    await connection('posts').where('id', id).delete();
  
    return response.status(204).send();
  }
}
