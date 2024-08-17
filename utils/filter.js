// trim 用于修剪字符串中的空白字符
function trim(str, pos = "both") {
  if (pos == "both") {
    return str.replace(/^\s+|\s+$/g, "");
  } else if (pos == "left") {
    return str.replace(/^\s*/, "");
  } else if (pos == "right") {
    return str.replace(/(\s*$)/g, "");
  } else if (pos == "all") {
    return str.replace(/\s+/g, "");
  } else {
    return str;
  }
}

export { trim };
