$(() => {
  // Getting references to our form and input
  const signUpForm = $('form.signup');
  const forenameInput = $('#forename-input');
  const surnameInput = $('#surname-input');
  const emailInput = $('input#email-input');
  const passwordInput = $('input#password-input');

  // When the signup button is clicked, we validate the email and password are not blank
  signUpForm.on('submit', event => {
    event.preventDefault();
    const userData = {
      forename: forenameInput.val().trim(),
      surname: surnameInput.val().trim(),
      email: emailInput.val().trim(),
      password: passwordInput.val().trim()
    };

    if (!userData.email || !userData.password) {
      return;
    }
    // If we have an email and password, run the signUpUser function
    signUpUser(userData);
    forenameInput.val('');
    surnameInput.val('');
    emailInput.val('');
    passwordInput.val('');
  });

  // Does a post to the signup route. If successful, we are redirected to the exercises page
  // Otherwise we log any errors
  const signUpUser = async ({ forename, surname, email, password }) => {
    try {
      await $.post('/api/signup', {
        forename: forename,
        surname: surname,
        email: email,
        password: password
      });
      window.location.replace('/exercises');
    } catch (err) {
      console.error(`ERROR - signup.js - signUpUser(): ${err}`);
      const errorText = err.responseJSON.errors
        .map(err => `${err.message}\n`)
        .toString();
      alert(errorText);
    }
  };
});
