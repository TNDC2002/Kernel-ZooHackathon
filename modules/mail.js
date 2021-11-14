const axios = require('axios');
const formUrlEncoded = x =>
   Object.keys(x).reduce((p, c) => p + `&${c}=${encodeURIComponent(x[c])}`, '')
/**
 * tài khoản mailgun
 */
exports.config = {
    url: '',
    username: '',
    password: ''
};

/**
 *  Function gửi email
 * @param {string} email 
 * Địa chỉ email người nhận
 * @param {Array.<{address: string, name: string, html: string, subject: string}>} data 
 * Ex: address: noreply@levelhigh.site, name: Levelhigh, subject: Yêu cầu xác thực tài khoản
 */
exports.sendMail = async (email, data = []) => {
    await axios({
        method: 'post',
        url: this.config.url,
        data: formUrlEncoded({
            subscribed: true,
            address: data.address,
            name: data.name,
            html: data.html,
            subject: `[${data.name}] ${data.subject}`,
            from: `${data.name} <${data.address}>`,
            to: email
        }),
        config: { headers: {'Content-Type': 'multipart/form-data' }},
        responseType: 'json', // default is json
        auth: {
            username: this.config.username,
            password: this.config.password
        }
    }).then(function(response) {
        console.log(response);
        return true;
    }).catch(function(error) {
        console.log(error);
        return false
    });
};