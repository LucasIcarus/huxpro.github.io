#Hux Blog - React.js and Server Side Rendering Port

###[View Live SSR Demo &rarr;](http://120.27.122.115:3000/)

![](http://fancy-oss.oss-cn-shenzhen.aliyuncs.com/screen.png)

### Tips

Trying to build your own blog system by this repo, u need host your **own server**. The github pages is no longer an option.

Besides, you better **know a little bit of front-end** to modify this repo as you like.

### Get Started

> put your old mds in `./src/posts`(optional)

run `npm install` then `npm run-script start`

### Diff 

* Migrate the build system from jekyll + grunt to webpack.
 
* With a lot of new Tech.s of front-end like React.js, React-Router, Redux, BrowserSync, isomorphic-style-loader..., the website now runs like a Single Page Application. 

* Erase the jQuery, modify anchor.js a little bit, and onePageNav.js based on jQuery has been reconstructed, change Bootstrap v3 to Bootstrap-alpha-4.0-grid. After bundle the main.js(only this needed) is about 600kb.
  ![](http://fancy-oss.oss-cn-shenzhen.aliyuncs.com/bundle.png)
  
* Using GraphQL and DataBase is simulated by Markdown-it.js(The posts still be written in the old way, but the format requirement gets more stringent).

* Different with _config.yml, the site constants now located at `./src/constants/index.js`

> Overall, the system run by pm2 is quite easy to deploy, the memory taken on server(CentOS7.0, AliCloud, no complicating) is about 70MB.
![](http://fancy-oss.oss-cn-shenzhen.aliyuncs.com/memory.png)


### Construction


```
.
├── /build/                     # The folder for compiled output                     # Documentation files for the project
├── /node_modules/              # 3rd-party libraries and utilities
├── /src/                       # The source code of the application
│   ├── /actions/               # Action Creaters of Redux flow
│   ├── /components/            # React components
│   ├── /constants/             # Site constant config and posts summary info generate by tools/page.js
│   ├── /content/               # Static pages like About etc.
│   ├── /core/                  # Core framework and utility functions
│   ├── /data/                  # GraphQL server schema and data models
│   ├── /posts/                 # posts(md)
│   ├── /public/                # Static files which are copied into the /build/public folder
│   ├── /reducers/              # Original Reducer of Redux flow
│   ├── /store/                 # Store of Redux flow
│   ├── /views/                 # Express.js views (pug/jade templates) for index and error pages
│   ├── /client.js              # Client-side startup script
│   ├── /config.js              # Global application settings
│   ├── /routes.js              # React-Router
│   └── /server.js              # Server-side startup script
├── /tools/                     # Build automation scripts and utilities
│   ├── /lib/                   # Library for utility snippets
│   ├── /build.js               # Builds the project from source to output (build) folder
│   ├── /bundle.js              # Bundles the web resources into package(s) through Webpack
│   ├── /clean.js               # Cleans up the output (build) folder
│   ├── /copy.js                # Copies static files to output (build) folder
│   ├── /page.js                # Extract summary info from posts for data-fetch and post list preview and paginate.
│   ├── /run.js                 # Helper function for running build automation tasks
│   ├── /runServer.js           # Launches (or restarts) Node.js server
│   ├── /start.js               # Launches the development web server with "live reload"
│   └── /webpack.config.js      # Configurations for client-side and server-side bundles
└── package.json                # The list of 3rd party libraries and utilities
```

### TODOs

* KeyNote type

* SEO part

* being slim

### Thanks

The Theme is completely created by Hux, lot of thanks for him, and this reconstruction change nearly nothing about style. **(May the modern browsers with you!)**

Very delight to do little tiny work.
