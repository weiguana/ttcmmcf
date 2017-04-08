
/**
 * If its on server, inserts the dictionary object
 */
if (ttcmmcf.dictionary.find(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {}).count() === 0) {
    // ttcmmcf.dictionary.remove(process.env.TTCMMCF_APPID ? {_id:process.env.TTCMMCF_APPID} : {});
    ttcmmcf.dictionary.insert(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {}, function(){
        console.log("ttcmmcf dictionary initialized");
    });
}

/**
 * Publications of the dictionary
 */
Meteor.publish('ttcmmcf_dictionary', function() {
    return ttcmmcf.dictionary.find(process.env.TTCMMCF_APPID ? { _id: process.env.TTCMMCF_APPID } : {});
});
