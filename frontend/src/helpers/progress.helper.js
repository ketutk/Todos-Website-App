function progressBar(arr) {
  const trueArr = arr.filter((e) => {
    return e.status == true;
  });

  let progress = Math.ceil((trueArr.length / arr.length) * 100);

  return progress;
}

export default progressBar;
