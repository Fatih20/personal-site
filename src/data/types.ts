export interface IActivity {
    title : string,
    details : [
        {
            institution : string,
            insitutionLink : string
        },
        {
            ongoing: boolean,
            monthStart : number,
            yearStart : number,
            monthEnd : number,
            yearEnd : number
        },
        {
            description : string
        },
        {
            partOfStudent : boolean,
            partOfDeveloper : boolean,
            partOfMunEnthusiast: boolean,
        }
    ]
}

export interface IProject {
    title : string,
    details : [
        {
            institution : string,
            insitutionLink : string
        },
        {
            ongoing: boolean,
            monthStart : number,
            yearStart : number,
            monthEnd : number,
            yearEnd : number
        },
        {
            description : string
        },
        {
            partOfStudent : boolean,
            partOfDeveloper : boolean,
            partOfMunEnthusiast: boolean,
        }
    ]
}

export interface IAward {
    title : string,
    yearAchieved: number,
    monthAchieved: number,
    details : [
        {
            institution : string,
            insitutionLink : string
        },
        {
            partOfStudent : boolean,
            partOfDeveloper : boolean,
            partOfMunEnthusiast: boolean,
        }
    ]
}


export interface RawData {
    data : {
        allActivities : IActivity[],
        allProjects : IProject[],
        allAwards : IAward[]
    }
}

export interface IProjectCategorized {
    title : string,
    institution : string,
    insitutionLink : string,
    ongoing: boolean,
    monthStart : number,
    yearStart : number,
    monthEnd : number,
    yearEnd : number
    description : string,
    partOfStudent : boolean,
    partOfDeveloper : boolean,
    partOfMunEnthusiast: boolean,
    typeOfElement : typeOfElement,
}

export interface IActivityCategorized {
    title : string,
    institution : string,
    insitutionLink : string,
    ongoing: boolean,
    monthStart : number,
    yearStart : number,
    monthEnd : number,
    yearEnd : number
    description : string,
    partOfStudent : boolean,
    partOfDeveloper : boolean,
    partOfMunEnthusiast: boolean,
    typeOfElement : typeOfElement,

}

export interface IAwardCategorized {
    title : string,
    yearAchieved: 2021,
    monthAchieved: 11,
    institution : string,
    insitutionLink : string,
    partOfStudent : boolean,
    partOfDeveloper : boolean,
    partOfMunEnthusiast: boolean,
    typeOfElement : typeOfElement,
}

export type IGroupedElement = {
    [key in typeOfTitle] : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[]
}

export const possibleTitle = ["student", "developer", "mun"] as const;
export type typeOfTitle = typeof possibleTitle[number];
export type typeOfElement = "project" | "activity" | "award";
export type elementType = IActivity | IAward | IProject;
