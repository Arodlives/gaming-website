exports.handler=async(event,context)=>{
    const guides=[{
        title:'Beat all Zelda  Bosses like a  boss',author:'mario'}
    ]

    if (context.clientContext.user){
        return{
            statusCode:200,
            body:JSON.stringify(guides)
        }
    }

    return{
        statusCode:401,
        body:JSON.stringify({errormsg:'you must be logged in to see this'})
    }
}