function valiDate(StringDate, status, i) {
  // const date = new Date(StringDate).getTime();
  const date = new Date(StringDate);
  const now = new Date();

  let expired = false;
  let arrayResult = [];
  if (date.getDate() >= now.getDate() && date.getMonth() >= now.getMonth() && date.getFullYear() >= now.getFullYear()) {
    expired = false;
  } else {
    expired = true;
  }

  if (status === "complete") {
    arrayResult[0] = "text-success";
    arrayResult[1] = "Completed";
  } else if (!expired && status === "ongoing") {
    arrayResult[0] = "text-primary";
    arrayResult[1] = "On-going";
  } else if (expired && status === "ongoing") {
    arrayResult[0] = "text-danger";
    arrayResult[1] = "Failed";
  }

  return arrayResult[i];
}

export default valiDate;
