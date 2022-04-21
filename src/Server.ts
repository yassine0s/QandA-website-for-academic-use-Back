import app from "./utils/app";
import {connect_to_db} from "./utils/database";



// Connecting to db
connect_to_db();

// set port, listen for requests
const PORT = process.env.NODE_DOCKER_PORT || 8080;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}.`);
});

