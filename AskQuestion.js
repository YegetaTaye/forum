const question = document.querySelector("#title");
const tag = document.querySelector("#question_select");
const questionDescription = document.querySelector("#question_desc");
const submit = document.querySelector(".question_post_btn");
const questionFile = document.querySelector("#question_file");

submit.addEventListener("click", async (event) => {
  event.preventDefault();
  // const form = new FormData();
  // form.append("question", question.value);
  // form.append("questionDescription", questionDescription.value);
  // form.append("tag", tag.value);
  // form.append("post_id", Math.floor(Math.random() * 100));
  // form.append("id", localStorage.getItem("userId"));
  // if (questionFile.files[0]) {
  //   form.append("question_file", questionFile.files[0]);
  // }

  const form = {
    question: question.value,
    questionDescription: questionDescription.value,
    tag: tag.value,
    post_id: Math.floor(Math.random() * 100),
    id: localStorage.getItem("userId"),
    question_file: questionFile.files[0],
  };
  console.log("After form ", form);

  try {
    const url = "http://localhost:8000/public/api/questions";
    const options = {
      method: "POST",
      body: JSON.stringify(form),
    };
    const res = await fetch(url, options);
    const data = await res.json();
    console.log(data);

    if (res.ok) {
      window.location.href = "/Home.html";
    } else {
      alert(data.msg);
    }
  } catch (err) {
    console.log(err);
  }
});

const logoutButton = document.querySelector("#isLogged");
logoutButton.addEventListener("click", async (event) => {
  event.preventDefault();
  // console.log("am clicked");
  localStorage.setItem("token", "");
  localStorage.setItem("userId", "");
  localStorage.setItem("userName", "");
  window.location.href = "/Login.html";
});
