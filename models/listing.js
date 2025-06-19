const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const review = require('./review');


const listingSchema = new Schema({
    title: { 
        type: String,
        required: true
    },
    description: String,
    image: {
        type: String,
        default: "",
        set: (v) => {
            if (typeof v === 'object' && v.url) {
                return v.url;
            }
            return v === "" ? "https://media.istockphoto.com/..." : v;
        }
    },
    price: Number,
    location: String,
    country: String, 
    reviews:[
        {
            type:Schema.Types.ObjectId, 
             ref:"Review",   
        }
    ]
});

listingSchema.post("findOneAndDelete",async(listing)=>{
    if(listing){
         await review.deleteMany({id:{$in: listing.reviews}});
    }
})

const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;

 