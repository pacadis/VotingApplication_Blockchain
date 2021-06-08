const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    // router.route('/add_user')
    //     .post(controller.add);
    //     // .get(validateToken, controller.getAll); // This route will be protected

    // router.route('/register')
    //     .post(controller.add_person);

    router.route('/login')
        .post(controller.login);
};