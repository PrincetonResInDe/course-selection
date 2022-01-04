export const gradient = (num) => {
  const percentFade = num / 5;
  const startColor = { red: 212, green: 135, blue: 0 };
  const endColor = { red: 0, green: 146, blue: 19 };

  var diffRed = endColor.red - startColor.red;
  var diffGreen = endColor.green - startColor.green;
  var diffBlue = endColor.blue - startColor.blue;

  diffRed = diffRed * percentFade + startColor.red;
  diffGreen = diffGreen * percentFade + startColor.green;
  diffBlue = diffBlue * percentFade + startColor.blue;

  return `rgba(${diffRed}, ${diffGreen}, ${diffBlue})`;
};

export const opacity = (num, percentage) => {
  const percentFade = num / 5;
  const startColor = { red: 212, green: 135, blue: 0 };
  const endColor = { red: 0, green: 146, blue: 19 };

  var diffRed = endColor.red - startColor.red;
  var diffGreen = endColor.green - startColor.green;
  var diffBlue = endColor.blue - startColor.blue;

  diffRed = diffRed * percentFade + startColor.red;
  diffGreen = diffGreen * percentFade + startColor.green;
  diffBlue = diffBlue * percentFade + startColor.blue;

  return `rgba(${diffRed}, ${diffGreen}, ${diffBlue}, ${percentage})`;
};
