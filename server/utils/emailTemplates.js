export const welcomeEmail = (name) => `
  <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
    <h2 style="color: #2c3e50;">Welcome to TechQeeda 🐛</h2>
    <p>Hi <b>${name}</b>,</p>
    <p>Your account has been created successfully 🎉</p>
    <p>You can now log in and start exploring blogs.</p>
    <p>You can also create your own blogs and share your knowledge with the world.</p>

    <br />
    <p style="margin: 20px 0;">
      <a href="https://techqeeda.com/auth" 
         style="background-color: #007bff; color: #fff; padding: 10px 20px; 
                text-decoration: none; border-radius: 5px;">
        Login Now
      </a>
    </p>

    <p>Happy Learning 💻</p>
    <p><b>TechQeeda Team 🐛</b></p>
  </div>
`;