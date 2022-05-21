import type { elementCategorizedType, IActivityCategorized, IAwardCategorized, IProjectCategorized } from "./types";

export const monthNumberToMonth = [
    "None",
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

export function timeCaptionGenerator ({ongoing, monthStart, yearStart, yearEnd, monthEnd} : IProjectCategorized | IActivityCategorized){
    let timeCaption : string;
    if (ongoing){
        timeCaption = `${monthNumberToMonth[monthStart]} ${yearStart} — Present`
    } else {
        if ((monthEnd === null) || (yearEnd === null)) {
            timeCaption = `${monthNumberToMonth[monthStart]} ${yearStart}`
        } else {
            timeCaption = `${monthNumberToMonth[monthStart]} ${yearStart} — ${monthNumberToMonth[monthEnd]} ${yearEnd}`
        }
    }
    return timeCaption;
}

export function monthAndYearGenerator (element : elementCategorizedType) {
    if (element.typeOfElement === "award") {
        return {
            month : element.monthAchieved,
            year : element.yearAchieved
        }
    } else if (element.typeOfElement === "project" || element.typeOfElement === "activity" ) {
        return {
            month : element.monthStart,
            year : element.yearStart
        }
    }
}

export function sortElementWrapper (arrayOfElement : elementCategorizedType[]) {
    let sortedOngoingElement = sortElement(arrayOfElement.filter((element) => 
        (element.typeOfElement === "activity" || element.typeOfElement === "project") ? element.ongoing : false
    ))
    let sortedDoneElement = sortElement(arrayOfElement.filter((element) => 
    (element.typeOfElement === "activity" || element.typeOfElement === "project") ? !element.ongoing : true
))
    return [...sortedOngoingElement, ...sortedDoneElement]
}


function sortElement (arrayOfElement : elementCategorizedType[]){
    if (arrayOfElement.length <= 1) {
        return arrayOfElement
    }
    const currentElement = arrayOfElement[0]
    const {month : monthCurrent, year : yearCurrent} = monthAndYearGenerator(currentElement)
    let olderElement = [] as elementCategorizedType[];
    let newerElement = [] as elementCategorizedType[];

    arrayOfElement.slice(1).forEach((element) => {
        const {month : monthCompared, year : yearCompared} = monthAndYearGenerator(element)

        if ((yearCompared > yearCurrent) || (yearCompared === yearCurrent && monthCompared >= monthCurrent)) {
            newerElement.push(element)
        } else {
            olderElement.push(element)
        }
    })
    return [...sortElement(newerElement), currentElement, ...sortElement(olderElement), ]

}