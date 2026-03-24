import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';
import connectDB from './api/db.js';
import Shipment from './api/models/Shipment.js';
import { geocodeAddress } from './api/utils/geocoder.js';

const runMigration = async () => {
    try {
        await connectDB();
        console.log("Connected to DB. Upgrading past shipments...");
        
        const shipments = await Shipment.find({});
        let updatedCount = 0;
        
        console.log(`Found ${shipments.length} total shipments in the database.`);
        
        for (const shipment of shipments) {
            let modified = false;
            
            // Fix main shipment current location
            if (!shipment.coordinates || (shipment.coordinates.lat === 0 && shipment.coordinates.lng === 0)) {
                const searchLoc = shipment.currentLocation || shipment.origin;
                if (searchLoc) {
                    const coords = await geocodeAddress(searchLoc);
                    if (coords.lat !== 0 || coords.lng !== 0) {
                        shipment.coordinates = coords;
                        modified = true;
                        console.log(`[${shipment.trackingNumber}] Geocoded Map Pin -> ${searchLoc}`);
                    }
                }
            }
            
            // Force save updates if modified
            if (modified) {
                await shipment.save();
                updatedCount++;
            }
            
            // Nominatim rate limit rule: 1 request per second
            await new Promise(r => setTimeout(r, 1100)); 
        }
        
        console.log(`Migration Complete! Retroactively fixed map locations for ${updatedCount} old shipments.`);
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

runMigration();
