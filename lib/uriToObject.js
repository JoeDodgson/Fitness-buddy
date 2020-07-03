module.exports = connectionUri => {
  const optionArr = connectionUri
    // Splitting the URI on special characters and
    // removing 'mysql' from start of string
    .split(/\bmysql2\b|[/:@]/g)
    // Removing empty elements in array due to regex
    .filter(el => el !== '');
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
