export const validateName = (name) => {
    const regex = /^[A-Za-z]+$/;
    return regex.test(name);
  };
  
  export const validateUsername = (username) => {
    const regex = /^[A-Za-z0-9]+$/;
    return regex.test(username);
  };
  
  export const validatePassword = (password) => {
    const regex = /^[A-Za-z0-9]{6,}$/; // Minimum 6 characters
    return regex.test(password);
  };
  
  export const validateNIC = (nic) => {
    const oldRegex = /^[0-9]{9}[Vv]$/; // Old NIC format
    const newRegex = /^[0-9]{12}$/; // New NIC format
    return oldRegex.test(nic) || newRegex.test(nic);
  };