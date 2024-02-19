const inputField = document.querySelector("#input-field");
const submitBtn = document.querySelector("#submit-btn");

const submitConsult = (e) => {
  e.preventDefault();
  const contactCode = inputField.value;
  const valueObj = {
    code: contactCode,
  };

  try {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(valueObj),
    };

    fetch("/contact", requestOptions);
  } catch (err) {
    console.log(`Error sending consult code: ${err}`);
  }
};

submitBtn.addEventListener("click", (e) => submitConsult(e));
