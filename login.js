const signupBtn = document.querySelector("#login-btn");

signupBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const email = document.querySelector("#email").value;
  const password = document.querySelector("#password").value;

  const data = {
    email,
    password,
  };

  try {
    const response = await fetch("http://localhost:3000/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      const responseData = await response.json();

      console.log(responseData);

      alert(responseData.message);
    }

    const responseData = await response.json();

    console.log(responseData);

    const expirationDate = new Date(
      new Date().getTime() + 7 * 24 * 60 * 60 * 1000
    );

    document.cookie = `token=${
      responseData.token
    }; expires=${expirationDate.toUTCString()}; path=/`;

    window.location.replace("video-merge.html");
  } catch (error) {
    console.error(error);
    alert("Error signing up");
  }
});