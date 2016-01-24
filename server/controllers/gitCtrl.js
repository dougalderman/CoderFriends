var request = require('request');

module.exports = {

    getFollowing: function(req, res) {
        
        
 //       console.log('in getFollowers');
 //        console.log('res.locals.following = ' + res.locals.following);
        
        var options = { 
                        url: res.locals.following,
                        headers: {'User-Agent': 'Coder Friends'}
                      };
        
        request(options, function (err, response, result) {
             if (err) {
                 console.log('in error routine');
                 return res.status(response).send(err);
             }
             else {
     //            console.log("result = " + result);
                 res.send(result);
             }
            
        });
    }, 
    
    getActivity: function(req, res) {
        
        
 //       console.log('in getActivity');
 //       console.log('req.params.username = ' + req.params.username);
        
        var options = { 
                        url: 'https://api.github.com/users/' + req.params.username + '/events',
                        headers: {'User-Agent': 'Coder Friends'}
                      };
        
        request(options, function (err, response, result) {
             if (err) {
                 console.log('in error routine');
                 return res.status(response).send(err);
             }
             else {
  //               console.log("result = " + result);
                 res.send(result);
             }
            
        });
    }      
}
        