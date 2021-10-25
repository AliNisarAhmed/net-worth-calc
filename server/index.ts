import app from "./src/app";

const { PORT, API_KEY } = process.env;

app().then((app) =>
  app.listen(PORT, () => {
    console.log("Listening on port: ", PORT);
  })
);
