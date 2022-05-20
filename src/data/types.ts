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
    monthEnd : number,
    monthStart : number,
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
    monthEnd : number,
    monthStart : number,
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

export interface IGroupedElement {
    developer : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[],
    student : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[],
    mun : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[]
}

export type typeOfElement = "project" | "activity" | "award";
export type elementType = IActivity | IAward | IProject;
