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

        LogOut: () => {
            SDK.Storage.remove("userId");
            SDK.Storage.remove("firstName");
            SDK.Storage.remove("lastName");
            SDK.Storage.remove("username");
            SDK.Storage.remove("password");
            SDK.Storage.remove("type");
            SDK.Storage.remove("chosenCourseId");
            SDK.Storage.remove("chosenQuizId");
            window.location.href ="index.html";
        }


    },

    Storage: {
        predefined: "FML.",
        set: (key, value) => {
            window.localStorage.setItem(SDK.Storage.predefined + key, (typeof value === 'object') ? JSON.stringify(value) : value)
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

        },

        deleteUser: (id, cb) => {
            SDK.request({
                method: "DELETE",
                url: "/user/" + id,
            },  (err) => {
                if (err) {
                    return cb(err);
                }

                // Her ryger den i if-statementet, men sletter korret?

                cb(null);
            });
        },

        findUsers: (cb) => {
            SDK.request({
                method: "GET",
                url: "/user",
            },  (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });

        }
    },

    Quiz: {
        findQuizzes: (cb) => {
            SDK.request({
                method: "GET",
                url: "/quiz/" + SDK.Storage.load('chosenCourseId'),
            }, (err, data) => {
                if (err) return cb(err);

                cb(null, data);
            });
        },

        deleteQuiz: (id, cb) => {
            SDK.request({
                method: "DELETE",
                url: "/quiz/" + id,
            },  (err) => {
                if (err) {
                    return cb(err);
                }

                // Her ryger den i if-statementet, men sletter korret?

                cb(null);
            });
        },

        createQuiz: (quizTitle,courseId, cb) => {
            SDK.request({
                method: "POST",
                url: "/quiz",
                data: {quizTitle:quizTitle,courseId:courseId},
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);

                cb(null, data);

            });

        },
    },

    Question: {
        findQuestions: (cb) => {
            SDK.request({
                method: "GET",
                url: "/question/" + SDK.Storage.load('chosenQuizId'),
            },  (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });
        },

        createQuestion: (questionTitle, quizId, cb) => {
            SDK.request({
                method: "POST",
                url: "/question",
                data: {questionTitle:questionTitle, quizId:quizId},
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);

                cb(null, data);

            });

        },
    },

    Choice: {
        findChoices: (id, cb) => {
            SDK.request({
                method: "GET",
                url: "/choice/" + id,
            },  (err, data) => {
                if (err) return cb(err);
                cb(null, data);
            });
        },

        createChoice: (choiceTitle, answer, questionId, cb) => {
            SDK.request({
                method: "POST",
                url: "/choice",
                data: {choiceTitle:choiceTitle, answer:answer, questionId:questionId},
            }, (err, data) => {
                //On login-error
                if (err) return cb(err);

                cb(null, data);

            });

        },
    },

}