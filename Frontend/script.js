//Navbar scroll

let lastScroll = window.scrollY;
const navbar = document.getElementById("nav");
window.addEventListener("scroll", () => {
  const currentScroll = window.scrollY;

  if (currentScroll > lastScroll) {
    navbar.classList.add("hiddenNav");
  } else {
    navbar.classList.remove("hiddenNav");
  }

  lastScroll = currentScroll;
});

//Form submission

document
  .getElementById("contactForm")
  .addEventListener("submit", function (event) {
    // Prevent form from refreshing the page
    event.preventDefault();

    const Name = document.getElementById("name").value;
    const Email = document.getElementById("email").value;
    const Role = document.getElementById("select").value;
    const Message = document.getElementById("message").value;
    const MarketingEmails = document.getElementById("opt1").checked;
    const NewsUpdatesEmails = document.getElementById("opt2").checked;
    const ProductionProcessEmails = document.getElementById("opt3").checked;
    if (!Name) {
      alert("Please enter the name");

      return;
    }
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    const isValid = emailPattern.test(Email);
    console.log(isValid);

    if (!isValid) {
      alert("Please enter the email id");
      return;
    }
    if (!Role) {
      alert("Please select the role");

      return;
    }
    if (!Message) {
      alert("Please enter the message");

      return;
    }
    const payload = {
      Name,
      Email,
      Role,
      Message,
      MarketingEmails,
      NewsUpdatesEmails,
      ProductionProcessEmails,
    };

    fetch("http://localhost:4000/submit-form", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log("Success:", data);
        alert(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        alert(error);
      });

    console.log(payload);
    document.getElementById("contactForm").reset();
  });
