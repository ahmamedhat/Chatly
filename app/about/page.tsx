const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done!");
    }, 4000);
  });
};

export default async function About() {
  const data = await fetchData();
  console.log("data is", data);

  return (
    <div>
      <p className="text-gray-400 mb-6">About</p>
      <br />
      <br />
      <p className="mb-2">
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries, but also the leap into electronic typesetting, remaining
        essentially unchanged. It was popularised in the 1960s with the release
        of Letraset sheets containing Lorem Ipsum passages, and more recently
        with desktop publishing software like Aldus PageMaker including versions
        of Lorem Ipsum.
      </p>
      <br />
      <p>
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled it to make a type specimen book. It has survived not only five
        centuries.
      </p>
    </div>
  );
}
