import axios from "axios";

const getPrediction = async (baseUrl, image, options, update) => {
  const formData = new FormData();
  formData.append("file", image);
  await axios
    .post(baseUrl + "/predict_image", formData, options)
    .then((val) => {
      const pred = JSON.parse(val.data);
      const image = pred["prediction"];
      update(image);
    })
    .catch((e) => {
      throw new Error("image is not fetched" + e);
    });
};

export { getPrediction };
