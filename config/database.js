
module.exports = {
        username: "ptalwar15",
        password: "Coolit12",
        server: 'ds057214.mongolab.com',
        port: '57214',
        db: 'nightlife',
        connectionString: function(){
            return "mongodb://localhost:27017/nightlife"
        },
        options: {
            server:{
                auto_reconnect: true,
                socketOptions:{
                    connectTimeoutMS:3600000,
                    keepAlive:3600000,
                    socketTimeoutMS:3600000
                }
            }
        }
    };
//url: 'mongodb://ptalwar15:Coolit12@ds057214.mongolab.com:57214/nightlife' //connect to mongodb DB on mongolab
