import faunadb, { Collection, Ref } from "faunadb";

const client = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNADB_SECRET,
});

const getDocumentById = (id) => Ref(Collection("soil"), id);

export const streamDocument = async (id, onStart, onSnapshot, onUpdate) => {
  const ref = getDocumentById(id);

  let stream;

  const _startStream = async (ref) => {
    stream = client.stream
      .document(ref)
      .on("start", (ts) => {
        // We should aim to get historical data here.
        onStart(`Connected at ts=${ts}.`);
      })
      .on("snapshot", ({ data }) => {
        onSnapshot(data);
      })
      .on("version", ({ action, document }) => {
        const { data } = document;
        if (action === "update") onUpdate(data);
      })
      .on("error", (error) => {
        console.log("[ERROR] error=", error);
        stream.close();
      })
      .start();
  };

  _startStream(ref);
};
