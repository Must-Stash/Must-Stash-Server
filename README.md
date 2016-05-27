<img src="https://cdn.rawgit.com/Must-Stash/Must-Stash-Server/master/public/images/horizonal-blue-elephant.svg" width= 100%>
MustStash is a google [chrome extension](https://github.com/Must-Stash/Must-Stash-Extension) that preserves and analyzes your query terms and results as you browse. On click, the MustStash will display the site link most relevant to you and your search input on the google search bar.

## Dependencies
- [nodejs 5.8.0](https://nodejs.org/en/)
- [npm 3.7.3](https://www.npmjs.com/)
- [redis 3.2.0](http://redis.io/)
- [mongodb 3.2.6](https://www.mongodb.com/collateral/mongodb-3-2-whats-new?jmp=search&utm_source=google&utm_campaign=Americas-US-Brand-Alpha&utm_keyword=mongodb&utm_device=c&utm_network=g&utm_medium=cpc&utm_creative=101973883363&utm_matchtype=e&gclid=CJy1__zV-MwCFU6SfgodxKwPnw)
- [elasticsearch 2.3.3](https://www.elastic.co/)  

## Installation
```sh
$ git clone git@github.com:Must-Stash/Must-Stash-Server.git
$ cd Must-Stash-Server
$ npm install
$ webpack
$ node workers/qa_worker
$ npm start
```

## API
**POST /api/qa**  
- save a link and the query made to get to that link
```
{
    query: webRequest Object,
    activity: webNavigation Object
}
```
- [webRequest Object](https://developer.chrome.com/extensions/webRequest#event-onCompleted) - Chrome API webRequest Object
- [webNavigation Object](https://developer.chrome.com/extensions/webNavigation#event-onCommitted) - Chrome API webNavigation Object  

**GET /api/search?q=`<query>`**  
- query the database for up to 20 of the top rated links.
```
[
    {
        id: A unique id,
        url: The url of the link,
        original_query: The original query to search for the link,
        title: The title of the link page,
        description: The description of the link page,
        totalScore: The link ranking
    },
    ...
]
```

## Screen Casts

## Comments? Issues?
Please Create a [github issue](https://github.com/Must-Stash/Must-Stash-Server/issues)
