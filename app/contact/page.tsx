import React from "react";

const fetchData = async () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("done!");
    }, 1500);
  });
};

const Contact = async () => {
  const data = await fetchData();
  return (
    <div className="flex flex-col justify-center h-full items-center">
      Contact
    </div>
  );
};

export default Contact;
