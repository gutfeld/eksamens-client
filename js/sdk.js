const SDK = {
    serverURL: "http://localhost:3307/api",
    request: (options, cb) => {

    let headers = {};
    if (options.headers) {
        Object.keys(options.headers).forEach((h) => {
            headers[h] = (typeof options.headers[h] === 'object') ? JSON.stringify(options.headers[h]) : options.headers[h];
        });
    }

    $.ajax({
        url: SDK.serverURL + options.url,
        method: options.method,
        headers: headers,
        contentType: "application/json",
        dataType: "json",
        data: JSON.stringify(options.data),
        success: (data, status, xhr) => {
            cb(null, data, status, xhr);
        },
        error: (xhr, status, errorThrown) => {
            cb({xhr: xhr, status: status, error: errorThrown});
        }
    });

    },

    Login: {
        authLogin: (userName, password, cb) => {
            SDK.request({
                data: {
                    username: userName,
                    password: password
                },
                url: "/user/login",
                method: "POST"
            }, (err, data) => {

                //On login-error
                if (err) {
                    return cb(err);
                }
                data = JSON.parse(data);
                SDK.Storage.set("userId",data.userId);
                SDK.Storage.set("firstName",data.firstName);
                SDK.Storage.set("lastName",data.lastName);
                SDK.Storage.set("username",data.username);
                SDK.Storage.set("password",data.password);
                SDK.Storage.set("type",data.type);
                cb(null);

            });
        },


    },

    Storage: {
        predefined: "FML Quiz",
        set: (key, value) => {
            window.localStorage.setItem(SDK.Storage.prefix + key, (typeof value === 'object') ? JSON.stringify(value) : value)
        },
        load: (key) => {
            const val = window.localStorage.getItem(SDK.Storage.predefined + key);
            try {
                return JSON.parse(val);
            }
            catch (e) {
                return val;
            }
        },
        remove: (key) => {
            window.localStorage.removeItem(SDK.Storage.predefined + key);
        }

    },

    User: {
        createUser: (firstName, lastName, userName, password, type, cb) => {
            SDK.request({
                method: "POST",
                url: "/user",
                data: {firstName:firstName, lastName:lastName, username:userName, password:password, type:type},
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);

                cb(null, data);

            });

        }
    }


}