exports.base_url = "http://localhost:8000/";
// exports.base_url = "192.168.1.7:8000";

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
