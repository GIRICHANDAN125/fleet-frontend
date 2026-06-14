SCOPE.md

## Project Scope

Fleet Management System for managing vehicles, drivers, trips, and maintenance records.

## Data Validation & Anomalies

* Missing vehicle registration number → record flagged for review.
* Invalid driver contact number → rejected during validation.
* Duplicate vehicle IDs → prevented using unique constraints.
* Missing maintenance date → marked as pending update.

## Handling Strategy

* Validation performed before database insertion.
* Invalid records logged for administrator review.
* Duplicate records ignored and reported.

## Database Schema

### Vehicles

* vehicle_id (PK)
* registration_number
* model
* status

### Drivers

* driver_id (PK)
* name
* phone

### Trips

* trip_id (PK)
* vehicle_id (FK)
* driver_id (FK)
* source
* destination

### Maintenance

* maintenance_id (PK)
* vehicle_id (FK)
* service_date
* remarks
