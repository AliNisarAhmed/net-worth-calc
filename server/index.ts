import app from "./src/app";

const port = process.env.PORT || 3000;

app().then((app) =>
  app.listen(port, () => {
    console.log("Listening on port: ", port);
  })
);
