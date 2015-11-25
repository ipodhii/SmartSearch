
const {createLogger,transports,format}=require('winston');
const logger=createLogger({
    transports:[
        new transports.Console({
            level:'info',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.Console({
            level:'error',
            format:format.combine(format.timestamp(),format.json())
        }),
        new transports.File({
            filename:"debug.log",
            level:"debug",
            format:format.combine(format.timestamp(),format.json())
        })
    ]
});

 

module.exports=logger;