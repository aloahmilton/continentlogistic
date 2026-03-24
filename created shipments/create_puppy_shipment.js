import dotenv from 'dotenv';
dotenv.config();
import { sendShipmentEmail } from '../api/utils/email.js';
import connectDB from '../api/db.js';
import Shipment from '../api/models/Shipment.js';

const run = async () => {
    await connectDB();
    const trackingNumber = `CT${Math.floor(10000000 + Math.random() * 90000000)}`.toUpperCase();
    
    // Albany, NY is about 2.5 - 3 hours from NYC (Manhattan)
    const originLocation = "Albany, NY"; 
    
    const shipmentData = {
        trackingNumber,
        sender: {
            name: "Hoppy bunny",
            email: "contact@hoppybunny.com",
           
        },
        receiver: {
            name: "solani mone",
            email: "solanimone@gmail.com",
            phone: "+13475919589"
        },
        origin: originLocation,
        destination: "516 west 72nd st, New York, NY",
        currentLocation: `${originLocation} - Available for Rehoming, white color`,
        status: "pending",
        serviceType: "Pet Relocation",
        weight: 12, // approx weight in kg for 5 month puppy
        dimensions: "Pet Carrier",
        productDetails: "Live Animal: Puppy (White, 5 months old)",
        estimatedDelivery: new Date(Date.now() + 1 * 24 * 60 * 60 * 1000), // Expected in 1 day
        updates: [{
            status: 'pending',
            location: originLocation,
            description: 'Shipment information received and registered in system. Pet health confirmed for travel.',
            timestamp: new Date()
        }]
    };
    
    try {
        const shipment = new Shipment(shipmentData);
        const newShipment = await shipment.save();
        
        console.log(`Success! Tracking Number: ${trackingNumber}`);
        
        try {
            await sendShipmentEmail(newShipment);
            console.log("Notification email dispatched to the receiver and admin BCC.");
        } catch (emailError) {
            console.error("Warning: Shipment created but email failed to send.", emailError.message);
        }
        
    } catch (e) {
        console.error("Failed to create shipment: ", e.message);
    } finally {
        process.exit(0);
    }
};

run();
