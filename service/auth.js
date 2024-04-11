const sessionTouserMap = new Map();

function setUser(id, user){
    sessionTouserMap.set(id,user);
}

function getUser(id){
    return sessionTouserMap.get(id);
}

module.exports = {
    setUser,
    getUser,
}