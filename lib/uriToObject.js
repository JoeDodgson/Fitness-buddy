module.exports = connectionUri => {
  const optionArr = connectionUri
    // Splitting the URI on special characters and
    .split(/[/:@]/g)
    // Removing empty elements in array due to regex
    .filter(el => el !== '')
    // removing dialect from start of uri
    .slice(1);
  // Destructuring values from optionArr
  const [dbUser, dbPass, dbHost, dbPort, dbTitle] = optionArr;
  return {
    user: dbUser,
    password: dbPass,
    host: dbHost,
    port: dbPort,
    database: dbTitle
  };
};
