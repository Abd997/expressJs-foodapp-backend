/**
 *
 * @param {e.Request} req
 */
const validate = (req) => {
  const { userId, weightGoal } = req.body;
};

/**
 *
 * @param {e.Request} req
 * @param {e.Response} res
 * @returns {Promise<void>}
 */
module.exports = async (req, res) => {
  try {
    await validate(req);
  } catch (e) {}
};
