import express from "express";
import bodyParser from "body-parser";
import { filterImageFromURL, deleteLocalFiles } from "./util/util";

(async () => {
  // Init the Express application
  const app = express();

  // Set the network port
  const port = process.env.PORT || 8082;

  // Use the body parser middleware for post requests
  app.use(bodyParser.json());

  // GET /filteredimage?image_url={{URL}}
  app.get("/filteredimage", async (req, res) => {
    //Filter an image and return it
    const url = req.query.image_url;

    if (!url) {
      return res.status(400).send("No image url provided");
    }

    try {
      const localImage = await filterImageFromURL(url);
      res.sendFile(localImage, async () => {
        await deleteLocalFiles([localImage]);
      });
    } catch (error) {
      res.status(422).send("Item with that url does not exist");
    }
  });

  // Root Endpoint
  // Displays a simple message to the user
  app.get("/", async (req, res) => {
    res.send("try GET /filteredimage?image_url={{}}");
  });

  // Start the Server
  app.listen(port, () => {
    console.log(`server running http://localhost:${port}`);
    console.log(`press CTRL+C to stop server`);
  });
})();
