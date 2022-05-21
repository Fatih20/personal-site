import type { IActivityCategorized, IProjectCategorized } from "./types";

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