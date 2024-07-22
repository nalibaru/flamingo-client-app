export async function checkAuthentication(username, password) {
  try {
      const link = process.env.REACT_APP_ACCESSLINK; 
      const encodedUsername = encodeURIComponent(username);
      const encodedPassword = encodeURIComponent(password);
      const url = `${link}/api/users/authenticate?username=${encodedUsername}&password=${encodedPassword}`;
      
      const response = await fetch(url);
      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } 
      const data = await response.json();
      return data; 
  } catch (err) {
      throw err; 
  }
}

export async function resetPassword(username, password, cpassword) {
  try {
      const link = process.env.REACT_APP_ACCESSLINK;
      const encodedUsername = encodeURIComponent(username);
      const encodedPassword = encodeURIComponent(password);
      const url = `${link}/api/users/resetpassword`;

      const response = await fetch(url, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              username: encodedUsername,
              newpassword: encodedPassword,
              confirmpassword: encodeURIComponent(cpassword)
          }),
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      } 
      const data = await response.json();
      return data; 
  } catch (err) {
      throw err; 
  }
}


  
