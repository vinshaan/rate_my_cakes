var express = require('express');
var app = express();
var bodyParser = require("body-parser");
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/rate_my_cakes');
app.use(bodyParser.json());

app.use(express.static( __dirname + '/public/dist/public' ));




var ReviewSchema = new mongoose.Schema({
    rating: {type: Number},
    comment: {type: String}
})

var CakeSchema = new mongoose.Schema({
    name: {type: String},
    image_url: {type: String},
    created_at: {type: Date, default: Date.now},
    updated_at: {type: Date, default: Date.now},
    reviews: [ReviewSchema]
})

const Cake = mongoose.model('Cake', CakeSchema);
const Review = mongoose.model('Review',ReviewSchema);

app.get('/cakes', function(req, res){
    Cake.find({}, function(err, cakes){
        if(err){
            console.log("There was an error", err);
        }
        else {
            res.json({cakes});
        }
    })
})


app.get('/reviews', function(req, res){
    Review.find({}, function(err, reviews){
        if(err){
            console.log("There was an error", err);
        }
        else {
            res.json({reviews});
        }
    })
})

app.delete('/reviews/:id', function(req, res){
    var review_id = req.params.id;
    Review.findByIdAndDelete({_id: review_id}, function(err, reviews){
        if(err){
            res.json({message:"Error"});
        }
        else {
            console.log("Successfully deleted");
            res.json({reviews});
        }
    })
})


app.get('/cakes/:id', function(req, res){
    var id = req.params.id;
    Cake.findById({_id: id}, function(err, cakes){
        if(err){
            console.log("There was an error", err);
        }
        else {
            res.json({cakes});
        }
    })
})

app.post('/cakes', function(req, res){
    console.log(req.body); 
    var new_cake = new Cake(req.body);
    new_cake.save(function(err, cakes){
        if(err){
            res.json({message:"Error"});
        }
        else {
            console.log("Successfully added");
            res.json({cakes});
        }
    })
})



app.post('/reviews/:id', function(req, res){
    cake_id = req.params.id;
    console.log(cake_id);
    console.log("****", req.body); 
    var new_review = new Review(req.body);
    new_review.save(function(err, reviews){
        if(err){
            res.json({message:"Error"});
        }
        else {
            console.log("Successfully added");
            Cake.update({_id: cake_id}, {$push: {reviews: [reviews]}}, function(err, cakes){
                if(err){
                    console.log('error');
                }
                else{
                    res.json({cakes});
                }
            })
        }
    })
})

// app.put('/tasks/:id', function(req, res){
//     var task_id = req.params.id;
//     console.log(req.params.id);
//     console.log(req.body);
//     Task.updateOne({_id: task_id}, {title: req.body.title, description: req.body.description}, function(err, tasks){
//         if(err){
//             res.json({message:"Error"});
//         }
//         else {
//             console.log("Successfully added");
//             res.json({tasks});
//         }
//     })
// })

app.delete('/cakes/:id', function(req, res){
    var cake_id = req.params.id;
    Cake.findByIdAndDelete({_id: cake_id}, function(err, cakes){
        if(err){
            res.json({message:"Error"});
        }
        else {
            console.log("Successfully deleted");
            res.json({cakes});
        }
    })
})

app.listen(5000, function() {
    console.log("listening on port 5000");
})