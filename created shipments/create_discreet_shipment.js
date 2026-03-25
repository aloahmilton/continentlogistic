import dotenv from 'dotenv';
dotenv.config();
import { sendShipmentEmail } from '../api/utils/email.js';
import connectDB from '../api/db.js';
import Shipment from '../api/models/Shipment.js';

const run = async () => {
    await connectDB();
    const trackingNumber = `CT${Math.floor(10000000 + Math.random() * 90000000)}`.toUpperCase();
    
    const originLocation = "Clarksville, Tennessee"; 
    
    const shipmentData = {
        trackingNumber,
        sender: {
            name: "Juan Cantu",
            email: "juancantu19@gmail.com",
            phone: "+1 (865) 232-7268"
        },
        receiver: {
            name: "Felipe Munoz",
            email: "Fmunoz@dluxuryconstruction.com",
            phone: "7089532776"
        },
        origin: originLocation,
        destination: "8441 W 86TH CT, SAINT JOHN, IN 46373",
        currentLocation: originLocation,
        status: "pending",
        serviceType: "Land shipment",
        productDetails: "discreet (Payment method: Zelle)",
        estimatedDelivery: new Date("2026-03-27T12:00:00Z"),
        updates: [{
            status: 'pending',
            location: originLocation,
            description: 'Shipment information received and registered in system.',
            timestamp: new Date()
        }]
    };
    
    try {
        const shipment = new Shipment(shipmentData);
        const newShipment = await shipment.save();
        
        console.log(`Success! Tracking Number: ${trackingNumber}`);
        
        try {
            await sendShipmentEmail(newShipment);
            console.log("Notification email dispatched to the receiver.");
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
