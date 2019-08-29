const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Mongoose = require('mongoose');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// app.use(function (req, res, next) {

//     // Website you wish to allow to connect
//     res.setHeader('Access-Control-Allow-Origin', 'https://lmsangular.herokuapp.com' );

//     // Request methods you wish to allow
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

//     // Request headers you wish to allow
//     res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

//     // Set to true if you need the website to include cookies in the requests sent
//     // to the API (e.g. in case you use sessions)
//     res.setHeader('Access-Control-Allow-Credentials', true);

//     // Pass to next layer of middleware
//     next();
// });

Mongoose.connect("mongodb://localhost:27017/latestlibrarydb");
// Mongoose.connect("mongodb+srv://mongodb:mongodb@mycluster-ucvz5.mongodb.net/LibraryApp?retryWrites=true&w=majority");

const BookModel = Mongoose.model("book",{
    title:String,
    picture:String,
    author:String,
    publisher:String,
    DoP:String,
    distributer:String,
    price:String,
    desc:String
});

const AuthorModel = Mongoose.model("author",{
    name:String,
    picture:String,
    DoB:String,
    Place:String,
    Books:String
});

const UserModel= Mongoose.model("users",{
    ename:String,
    eaddress:String,
    egender:String,
    edob:String,
    eemail:String,
    euname:String,
    epass:String,
    ecpass:String
});


nav= [
        {
            link:'/books',
            title:'Books'
        },
        {
            link:'/authors',
            title:'Authors'
        }
];

book=[{
    'title':'Buried thoughts',
    'picture':'/images/buried.jpg',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'02-08-2016',
    'distributer':'DC',
    'price':230,
    'desc':'A first thought from Joseph'
},{
    'title':'Deivathinde Charanmar',
    'picture':'/images/deivatinde.jpg',
    'author':'Joseph Annamkutty Jose',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':190,
    'desc':'A second thought from Joseph'
},{
    'title':'Wings Of Fire',
    'picture':'/images/wingsfire.jpg',
    'author':'APJ Abdul Kalam',
    'publisher':'DC Books',
    'DoP':'26-05-2010',
    'distributer':'DC',
    'price':150,
    'desc':'Initial days of my life by APJ'
},{
    'title':'The Subtle Art Of Not Giving a F**k',
    'picture':'/images/thesubtleart.jpg',
    'author':'Mark Manson',
    'publisher':'DC Books',
    'DoP':'13-02-2011',
    'distributer':'DC',
    'price':320,
    'desc':'Balancing life'
},{
    'title':'Rich Dad Poor Dad',
    'picture':'/images/richdad.jpg',
    'author':'Rober TK',
    'publisher':'DC Books',
    'DoP':'26-05-2019',
    'distributer':'DC',
    'price':290,
    'desc':'A financial knowledge'
}];

author=[{
    'name':'Joseph Annamkutty Jose',
    'picture':'/images/joseph.jpg',
    'DoB':'18 July 1988',
    'Place':'Kerala, India',
    'Books': ['Buried thoughts','Deivathinde Charanmar']
},{
    'name':'JK Rowling',
    'picture':'/images/rowling.jpg',
    'DoB':'31 July 1965',
    'Place':'Scotland',
    'Books': ['Harry Potter','the casual vacany','fantastic beasts']
},{
    'name':'APJ Abdul Kalam',
    'picture':'/images/kalam.jpg',
    'DoB':'15 October 1931',
    'Place':'Rameswaram, India',
    'Books': ['Ignited Minds','India 2020','The turning Point']
},{
    'name':'Robert T K',
    'picture':'/images/robert.jpeg',
    'DoB':'8 April 1947',
    'Place':'United States',
    'Books': ['Cashflow Quadrant','The Business School']
},{
    'name':'Mark Manson',
    'picture':'/images/manson.jpg',
    'DoB':'9 March 1984',
    'Place':'United States',
    'Books': ['The subtle art of Not Giving F**k','Everything is f**ked']
}];

app.get('/',(req,res)=>{
    res.render('login');
});

app.get('/loginAPI',(req,res)=>{
    var item1 = req.query.euname;
    var item2 = req.query.epass;
    var result = UserModel.find({$and:[{euname:item1},{epass:item2}]},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
        
    })
})

const APIurl5 = "http://localhost:3334/loginAPI"

app.post('/employeelogin',(req,res)=>{
    var item1 = req.body.euname;
    var item2 = req.body.epass;

    request(APIurl5+"/?euname="+item1+"&&epass="+item2,(error,response,body)=>{
        var data = JSON.parse(body);


        console.log(data);
        if(data.length>0){

            if(item1==data[0].euname && item2==data[0].epass)
            {
                //res.send(data.euname);
                res.send("<script>alert('Login Successfull')</script><script>window.location.href='/index'</script>");
            }


        }
        else{
            res.send("<script>alert('Login unSuccessfull')</script><script>window.location.href='/'</script>");
            
        }


    });
});

app.post('/employeelogin1',(req,res)=>{
    var item1 = req.body.euname;
    var item2 = req.body.epass;

    request(APIurl5+"/?euname="+item1+"&&epass="+item2,(error,response,body)=>{
        var data = JSON.parse(body);


        console.log(data);
        if(data.length>0){

            if(item1==data[0].euname && item2==data[0].epass)
            {
                res.send(data);
                            }


        }
        else{
            res.send(data);
                        
        }


    });
});

app.get('/register',(req,res)=>{
    res.render('register');
});

app.post('/employeeregister',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var user = new UserModel(req.body);
    var result = user.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send("<script>alert('User Successfully Inserted')</script><script>window.location.href='/register'</script>");
        }
    });

});

app.post('/employeeregister1',(req,res)=>{
    //var items=req.body;
    //res.render('read',{item:items});

    var user = new UserModel(req.body);
    var result = user.save((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });

});

app.get('/index',(req,res)=>{
    res.render('index',{nav,title:'Library'});
});

app.get('/bookall',(req,res)=>{
    var result = BookModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl = "http://localhost:3334/bookall";

app.get('/books',(req,res)=>{
    request(APIUrl,(error,response,body)=>{
        var book = JSON.parse(body);
        res.render('books',{book,title:'Books'});
    });
    
});

app.get('/authorall',(req,res)=>{
    var result = AuthorModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl3 = "http://localhost:3334/authorall";

app.get('/authors',(req,res)=>{
    request(APIUrl3,(error,response,body)=>{
        var author = JSON.parse(body);
        res.render('authors',{author,title:'Authors'});
    });
    
});

app.get('/authorone',(req,res)=>{
    var item = req.query.q;
    var result = AuthorModel.findOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl4 = "http://localhost:3334/authorone";

app.get('/authorsingle/:id',(req,res)=>{
    const x= req.params.id;
    request(APIUrl4+"/?q="+x,(error,response,body)=>{
        var author = JSON.parse(body);
        //console.log(book);
        res.render('authorsingle',{author:author});
    });
});

app.get('/bookone',(req,res)=>{
    var item = req.query.q;
    var result = BookModel.findOne({_id:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl2 = "http://localhost:3334/bookone";

app.get('/booksingle/:id',(req,res)=>{

    const x= req.params.id;
    request(APIUrl2+"/?q="+x,(error,response,body)=>{
        var book = JSON.parse(body);
        console.log(book);
        res.render('booksingle',{books:book});
    });
    
});

app.post('/addbookAPI',(req,res)=>{
    var book = new BookModel(req.body);
    //console.log(req.body);
    var result = book.save((error,data)=>{
        //console.log('Message 1');
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            //console.log('Message 2');
            res.send("<script>alert('Book Inserted')</script><script>window.location.href='/addbook'</script>");
        }
    });
});

app.post('/addauthorAPI',(req,res)=>{
    var author = new AuthorModel(req.body);
    //console.log(req.body);
    var result = author.save((error,data)=>{
        //console.log('Message 1');
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            //console.log('Message 2');
            res.send("<script>alert('Author Inserted')</script><script>window.location.href='/addauthor'</script>");
        }
    });
});
/* 
    STEPS FOR BELOW CODE
    1) --> Below code says that a route '/empdelete' is created. 
    2) --> Then a request is gone to APIurl.
    3) --> Now the APIurl(Name of API is '/deleteAPI') runs its own code. 
    4) --> Afterwards from the APIurl data is parsed to JSON.
    5) --> Now this parsed JSON data is displayed on to our webpage.
*/
app.get('/addbook',(req,res)=>{
    res.render('addbook');
});

app.get('/addauthor',(req,res)=>{
    res.render('addauthor');
});

app.get('/deleteuser',(req,res)=>{
    res.render('deleteuser');
});

//An API to delete employee

app.get('/deleteAPI',(req,res)=>{
    var item= req.query.euname;

    var result = UserModel.deleteOne({euname:item},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    })
})

const APIurl6 = "http://localhost:3334/deleteAPI"

app.post('/empdelete',(req,res)=>{
    var item = req.body.euname;

    request(APIurl6+"/?euname="+item,(error,response,body)=>{

        res.send("<script>alert('User Deleted')</script><script>window.location.href='/deleteuser'</script>");

    })
});

app.get('/userall',(req,res)=>{
    var result = UserModel.find((error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    });
});

const APIUrl7 = "http://localhost:3334/userall";

app.get('/viewusers',(req,res)=>{
    request(APIUrl7,(error,response,body)=>{
        var user = JSON.parse(body);
        res.render('viewusers',{user:user,title:'Users'});
    });
    
});

app.get('/updateprice',(req,res)=>{
    res.render('updateprice');
});

//An API to update price

app.get('/updateAPI',(req,res)=>{
    var item1 = req.query.title;
    var result = BookModel.updateOne({title:item1},{$set:{price:req.query.price}},(error,data)=>{
        if(error)
        {
            throw error;
            res.send(error);
        }
        else
        {
            res.send(data);
        }
    })
})

const APIurl8 = "http://localhost:3334/updateAPI"

app.post('/bookupdate',(req,res)=>{
    var item1 = req.body.title;
    var item2 = req.body.price;
    request(APIurl8+"/?title="+item1+"&&price="+item2,(error,response,body)=>{

        res.send("<script>alert('Book Price Updated')</script><script>window.location.href='/updateprice'</script>");

    })
});

app.listen(process.env.PORT || 3334,()=>{
    console.log("Server running on port:http://localhost:3334");
});
