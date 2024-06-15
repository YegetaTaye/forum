
  const questions = document.querySelector(".questions");
  const userName = document.querySelector(".user__name");
  const title = document.querySelector(".question__title");
  const search = document.querySelector(".searchInput");
  const select = document.querySelector("#question_select");

  function checkUser() {
    if (!localStorage.getItem("token")) {
      window.location.href = "/Login.html";
    }
  }
  checkUser();

  function updateUserName() {
    const user = document.querySelector("#user");
    const userName = localStorage.getItem("userName");
    // console.log(userName);
    user.innerHTML = userName;
  }
  updateUserName();

  const logoutButton = document.querySelector("#isLogged");
  logoutButton.addEventListener("click", async (event) => {
    event.preventDefault();
    console.log("am clicked");
    localStorage.setItem("token", "");
    localStorage.setItem("userId", "");
    localStorage.setItem("userName", "");
    window.location.href = "/Login.html";
  });

  let res;
  let data;
  try {
    const url = "http://localhost:8000/public/api/questions";
    const options = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // body: JSON.stringify()
    };

    res = await fetch(url, options);
    data = await res.json();
    const allQuestions = data;
    // console.log(data);

    const renderQuestions = (allQuestion) => {
      
      const htmlElements = allQuestion.map((item) => {
        
        // Create elements
        const questionDiv = document.createElement("div");
        questionDiv.classList.add("question__div");

        const hrElement = document.createElement("hr");
        hrElement.classList.add("question_hr");

        const anchorElement = document.createElement("a");
        anchorElement.classList.add("question__box");
        anchorElement.href = item.question_id;

        const questionElement = document.createElement("div");
        questionElement.classList.add("question");

        const userQuestionElement = document.createElement("span");
        userQuestionElement.classList.add("user_question");

        const avatarElement = document.createElement("img");
        avatarElement.classList.add("avatar");
        avatarElement.src = "/Images/avatar.png"; // Set your avatar image path
        avatarElement.alt = "avatar";

        const questionRapper = document.createElement("div");
        questionRapper.classList.add("questionRapper");

        const userNameElement = document.createElement("p");
        userNameElement.classList.add("user__name");
        userNameElement.textContent = item.user_name;

        const titleElement = document.createElement("p");
        titleElement.classList.add("question__title");
        titleElement.textContent = item.question;

        const descriptionElement = document.createElement("p");
        descriptionElement.classList.add("question__desc");
        const dotValue = item.question_description.length > 60 ? "..." : " ";
        descriptionElement.textContent =
          item.question_description.substring(0, 60) + dotValue;

        const leadingIconElement = document.createElement("img");
        leadingIconElement.classList.add("leading__icon");
        leadingIconElement.src = "/assets/right-arrow.png";

        // Construct the elements hierarchy
        userQuestionElement.appendChild(avatarElement);
        userQuestionElement.appendChild(userNameElement);

        questionRapper.appendChild(titleElement);
        questionRapper.appendChild(descriptionElement);

        questionElement.appendChild(userQuestionElement);
        questionElement.appendChild(questionRapper);
        questionElement.appendChild(leadingIconElement);

        anchorElement.appendChild(questionElement);

        questionDiv.appendChild(hrElement);
        questionDiv.appendChild(anchorElement);

        return questionDiv;
      });
      console.log(htmlElements)
      // Append the elements to the container
      questions.innerHTML = "";
      htmlElements.forEach((element) => {
        questions.appendChild(element);
        const questionPage = element.querySelector(".question__box");
        questionPage.addEventListener("click", async (event) => {
          event.preventDefault();
          const url = questionPage.href;
          // console.log(url)
          const question_id = url.substring(url.lastIndexOf("/") + 1);
          console.log(question_id);

          localStorage.setItem("question_id", question_id);
          window.location.href = "./Answer.html";
        });
      });
    };
    renderQuestions(allQuestions);
    search.addEventListener("input", () => {
      if (search.value === "" || search.value === null) {
        renderQuestions(allQuestions);
      } else {
        const query = search.value.toLowerCase();
        console.log(query);

        const filterQuestion = allQuestions.filter((question) =>
          question.question.toLowerCase().includes(query)
        );
        // console.log(filterQuestion);
        renderQuestions(filterQuestion);
      }
    });
    select.addEventListener("change", () => {

      if (select.value === "" || select.value === null) {
        renderQuestions(allQuestions);
      } else {
        const query = select.value.toLowerCase();
        console.log(allQuestions);

        const filterQuestion = allQuestions.filter((question) =>
          question.tags === select.value
        );
        // console.log(filterQuestion);
        renderQuestions(filterQuestion);
      }
    });
    // Initial render of all questions
    
  } catch (err) {
    console.log(err);
  }

