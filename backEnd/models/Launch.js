import mongoose from 'mongoose';

const LaunchSchema = new mongoose.Schema({
    flight_number: {
        type: Number, 
        required: true,
        },
    mission_name: {
        type: String, 
        required: true,
        },
    rocketName: {
        type: String,
        required: true,
        },
    costPerLaunch: {
        type: Number,
        required: true,
        },
    profitMargin: {
        type: Number,
        required: true,
        },
    totalPrice: {
        type: Number,
        required: true,
        },
    launchDate: {
        type: Date,
        required: true,
        },
    isLaunched: {
        type: Boolean,
        required: true,
        },
});

const Launch = mongoose.model('Launch', LaunchSchema);

export default Launch;
