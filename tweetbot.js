if (Meteor.isServer) {

   Twit = Meteor.npmRequire('twit');

//logs in

    T = new Twit({
        consumer_key:         'CdiyQxGKcM4q3IR6KpqNsn2vv', // API key
        consumer_secret:      'iPYsF3CwzY0iZo9l1Yx8UrN90qpguELKTVyrqjNiaeYuw7PGod', // API secret
        access_token:         '4490350223-LnzFwqy6xb3QvuwD7cteSzGnAolm3801vAcAgLh', 
        access_token_secret:  'fPRWWkqrwaXbvk33TLNPhnWela9BB3ZhIBTBYF1h7NWZA'
    });

//searches for relevant tweets 
//geocode:'"51.514168,-0.119177,500mi',
function retweet(){
      T.get('search/tweets', { q:'"RT to win"' , result_type:'recent', count: 2}, function(err, data, response) {

        if(!err){
          for(i=0; i<2; i++){
                var tweetID = data.statuses[i].id_str;
                var tweetUsername = data.statuses[i].user.screen_name;
                var tweetUserID = data.statuses[i].user.id;
                var retweetedStatusID = data.statuses[i].retweeted_status.user.id;

              T.post('statuses/retweet/'+ tweetID, { }, function(err, data, response){
                    if(!err){
                            console.log("Success! Retweeted a post " + tweetUsername);
                            T.post('/friendships/create', {user_id: retweetedStatusID, follow: 'false'}, function(err, data, response){
                                  if(!err){
                                  console.log("Success! New Tweind: " + tweetID + " " + tweetUserID + " " + tweetUsername);
                                  console.log("original tweet from.. " + retweetedStatusID);
                                  }
                                  else{
                                    console.log("Add friend error: ");
                                      console.log(data);
                                  }});

              }else{
                    console.log("retweet error...");
                    console.log(data);

                    }
              });
       }

        }else{
          console.log("Search error:( ");
          console.log(data);
        }
      });
}

/*
function followbacks(){
      T.get('search/tweets', { q: 'followback', result_type:'popular', count: 1 }, function(err, data, response) {
              var tweetfollow = data.statuses[0];
                  T.post('/friendships/create', { screen_name:'tweetfollow.user.screen_name', follow: 'false' }, function(err, data, response){
                    console.log("followed for a followback: " + tweetfollow.user.screen_name);
                  });
              });
}
*/

retweet();
//followbacks();
setInterval(retweet, 250000);
//setInterval(followbacks, 200000);


  }