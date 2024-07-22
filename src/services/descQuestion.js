//var replaceWords = ["and", "the", "was", "were", "has", "had", "an", "been", "in", "on", "of", "under", "over", "you", "your", "she", "he"];

export function regexValues(string)
  {
  var answer = string;
   /*  for (let i = 0; i < replaceWords.length; i++) {
      let find = replaceWords[i];
      const regex1 = /[-\/\^$*+?.()|[\]{}]\b/;
      let regularExpression1 = new RegExp(find.replace(regex1), 'gim');
      answer = answer.replace(regularExpression1, '');
    } */
  
  // Add additional conditions to match variations of <p><br></p> tags
  const regexTags = /<\/?p[^>]*>/gi;
  answer = answer.replace(regexTags, '');
  return answer;
}

function filteration(elm){
    return (elm != null && elm !== false && elm !== "");
}
  
function calculateMarks(diffarr,actarr)
{
    let [diffsize, actsize] = [diffarr.length, actarr.length];
    let marks = 0;
    // diffsize -> unanswered one 
    if (diffsize === actsize)
    {
        marks = 0;     
    }
    else {
        let answeredwsize = actsize - diffsize; //4-1 = 3
          if (diffsize === 0)
           {
            marks = 1;
           }
           else if (answeredwsize >= actsize / 2)
            {
                marks = 1; 
            }
            else if(answeredwsize <= diffsize) {
                marks = 0.5;
            }
            else {
                marks = 0.2;
            }     
    }
    return marks;
}

export function splitValuesAndFindDifference(string1,string2)
{
  let resultNInter1 = string1.split(" "); 
  let resultNInter2 = string2.split(" "); 
  let resultInter1 = resultNInter1.filter(filteration);
    let resultInter2 = resultNInter2.filter(filteration);
  const difference =
        resultInter2.filter((element) => !resultInter1.includes(element)); 
  let marks = calculateMarks(difference,resultInter2);
  return marks;
}

