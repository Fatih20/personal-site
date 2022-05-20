export interface IActivity {
    title : string,
    details : [
        {
            institution : string,
            insitutionLink : string
        },
        {
            ongoing: boolean,
            monthEnd : number,
            monthStart : number
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
            monthEnd : number,
            monthStart : number
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
    yearAchieved: 2021,
    monthAchieved: 11,
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
        allAward : IAward[]
    }
}

export interface IProjectCategorized extends IProject {
    typeOfElement : typeOfElement
}

export interface IActivityCategorized extends IActivity {
    typeOfElement : typeOfElement
}
export interface IAwardCategorized extends IAward {
    typeOfElement : typeOfElement
}

export interface IGroupedElement {
    developer : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[],
    student : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[],
    mun : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[]
}

export type typeOfElement = "project" | "activity" | "award";
