exports.base_url = "http://localhost:8000/";
// exports.base_url = "https://api.pieme.info/";
// exports.base_url = "https://api.dev.pieme.info/";

exports.robot_keys = {
  // SITE_KEY: "6Lf0_nwpAAAAAJjykWXCKFHGEpsftIDRS12M2IpA",
  // SECRET_KEY: "6Lf0_nwpAAAAAC-7Bm1Hgh9WbmxqIbJm-aq2Zd9H",
  SITE_KEY: "6Le4PIMpAAAAAM72wEWFIyqzDbk7hIaZKl_38pmf",
  SECRET_KEY: "6Le4PIMpAAAAAPsZ0PyfcVMaRF14B_Wky9I5uXoa",
};

exports.url_gen = (str) => {
  let newStr = str.toLowerCase().replace(/\s+/g, " ");
  return newStr.replaceAll(" ", "-");
};

exports.numberFormatter = (number) => {
  const formatter = new Intl.NumberFormat("en-US");
  return formatter.format(number);
};

exports.formatDate = (date) => {
  const options = { day: "2-digit", month: "short", year: "numeric" };
  const formattedDate = new Date(date).toLocaleDateString("en-US", options);

  // Split the formatted date into day, month, and year parts
  const [month, day, year] = formattedDate.split(" ");

  // Convert the month abbreviation to uppercase
  const capitalizedMonth = month;

  // Return the formatted date with uppercase month abbreviation and desired format
  return `${day} ${capitalizedMonth} ${year}`;
};
