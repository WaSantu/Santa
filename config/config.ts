let config:publicConfig.Iconfig = {
    hostport:8889,
    dbpassword:"",
    dbport:27017,
    dbroot:"",
    dbname:"string",
    ignoreJwt:[
        '/api/admin/user/sign',
        '/api/admin/user/login',
    ],
    jwtserect:'santa'
}

export default config