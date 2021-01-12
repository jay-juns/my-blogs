const TagType = (inquireTag) => {

  switch(inquireTag) {
    case '제안' :
       return 'greenBg';
    case '의견' :
      return 'blueBg';
    case '버그제보' :
      return 'redBg';
    case '기타' :
      return '';   
    default:
      return inquireTag;
  }
}

export default TagType;