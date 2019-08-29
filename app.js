const Express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const Mongoose = require('mongoose');

var app = new Express();

app.set('view engine','ejs'); 

app.use(Express.static(__dirname+"/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'https://lmsangular.herokuapp.com' );

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

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
    'title': 'THE JURASSIC ADVENTURE',
    'author': 'ARHAM BANTHIA',
    'publisher': 'Blue Rose',
    'dop': '25-02-2019',
    'distributer': 'Blue',
    'price': '249',
    'description': 'My Jurassic adventure',
    'picture':'/images/THE-JURASSIC-ADVENTURE1-321x500.jpg'
},
{
    'title': 'Firewall',
    'author': 'ANUP KUMAR MANDAL',
    'publisher': 'Blue Rose',
    'dop': '25/02/2019',
    'distributer': 'Blue',
    'price': '249',
    'description': 'In India, every year, hundreds of people are killed and seriously...',
    'picture':'/images/Firewall1-325x500.jpg'

},
{
    'title': 'OUSHADHASARVASWAM',
    'author': 'THAHIMON. P.A',
    'publisher': 'Blue Rose',
    'dop': '25/08/2019',
    'distributer': 'Blue',
    'price': '1200',
    'description': 'Oushadhasarvaswam is first of its kind on modern medicine....',
    'picture':'/images/o.jpg'

},
{
    'title': 'The Poor Grandmaster',
    'author': 'Sumitendray Singh',
    'publisher': 'Blue Rose',
    'dop': '15/02/2019',
    'distributer': 'Blue',
    'price': '100',
    'description': 'This book takes you through the life of a poor.....',
    'picture':'/images/The-Poor-Grandmaster1-325x500.jpg'

},
{
    'title': 'PRODUCTIVITY & Global Management Practices',
    'author': 'RAMESH K SHAH',
    'publisher': 'Blue Rose',
    'dop': '05/12/2019',
    'distributer': 'Blue',
    'price': '249',
    'description': 'My Jurassic adventure',
    'picture':'/images/prod.jpg'

},
{
    'title': 'Mindful Eating',
    'author': 'Priti sandeep gaglani',
    'publisher': 'Blue Rose',
    'dop': '25/02/2019',
    'distributer': 'Blue',
    'price': '499',
    'description': 'The book focuses on Lifestyle Modification, rather than only low calorie eating.',
    'picture':'/images/mind.jpg'
},
{
    'title': 'One Action — Towards women’s dreams and ambitions',
    'author': 'Sanya Khurana',
    'publisher': 'Blue Rose',
    'dop': '25/08/2019',
    'distributer': 'Blue',
    'price': '225',
    'description': 'As a teenager, Sanya Khurana had very low self-esteem and was disgusted ....',
    'picture':'/images/oneaction.jpg'
},
{
    'title': 'Life in Pieces',
    'author': 'Sonal Vashisht',
    'publisher': 'Blue Rose',
    'dop': '25/03/2019',
    'distributer': 'Blue',
    'price': '175',
    'description': 'The story is truly a great example of a journey called ‘Life’',
    'picture':'/images/life in .jpg',
},
{ 
    'title': 'Love-Tennis',
    'author': 'Jitender kumar',
    'publisher': 'Blue Rose',
    'dop': '25/09/2019',
    'distributer': 'Blue',
    'price': '175',
    'description': 'Will love win again as always',
    'picture':'/images/love tennis.jpg'
}];

author=[{
    'name':'Jitender kumar',
    'picture':'/images/Jitender Kumar.jpg',
    'DoB':'1 September 1990 ',
    'Place':'Khairthal, Alwar, India',
    'Books': 'Love-Tennis'
},{
    'name':'Sonal Vashisht',
    'picture':'/images/K_Sonal_Choudhary.jpg',
    'DoB':'31 July 1965',
    'Place':'Gurugram, Haryana',
    'Books': 'Life in Pieces'
},{
    'name':'Sanya Khurana',
    'picture':'/images/sanya-malhotr-aa_d.jpg',
    'DoB':'18 November 1987',
    'Place':'Chandigarh, India',
    'Books': 'One Action'
},{
    'name':'Priti sandeep gaglani',
    'picture':'/images/pritiimage.jpg',
    'DoB':'8 April 1989',
    'Place':'United States',
    'Books': 'Mindful Eating'
},{
    'name':'ANUP KUMAR MANDAL',
    'picture':'/images/anup.jpeg',
    'DoB':'9 March 1984',
    'place':'India',
    'books': 'Firewall'
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

const APIurl5 = "https://latestlibrary.herokuapp.com/loginAPI"

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

const APIUrl = "https://latestlibrary.herokuapp.com/bookall";

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

const APIUrl3 = "https://latestlibrary.herokuapp.com/authorall";

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

const APIUrl4 = "https://latestlibrary.herokuapp.com/authorone";

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

const APIUrl2 = "https://latestlibrary.herokuapp.com/bookone";

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


app.listen(process.env.PORT || 3333,()=>{
    console.log("Server running on port:http://localhost:3333");
});
