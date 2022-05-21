export interface IInstitutionInDetail {
    institution : string,
    institutionLink : string
}

export interface IDurationInDetail {
    ongoing: boolean,
    monthStart : number,
    yearStart : number,
    monthEnd : number,
    yearEnd : number
}

export interface IDescriptionInDetail {
    description : string
}

export interface IPartOfXInDetail {

}

export interface IActivity {
    title : string,
    details : [IInstitutionInDetail, IDurationInDetail, IDescriptionInDetail, IPartOfXInDetail]
}

export interface IProject {
    title : string,
    details : [IInstitutionInDetail, IDurationInDetail, IDescriptionInDetail, IPartOfXInDetail]
}

export interface IAward {
    title : string,
    yearAchieved: number,
    monthAchieved: number,
    details : [IInstitutionInDetail, IPartOfXInDetail]
}


export interface IRawContentData {
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
    student : boolean,
    developer : boolean,
    mun: boolean,
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
    student : boolean,
    developer : boolean,
    mun: boolean,
    typeOfElement : typeOfElement,

}

export interface IAwardCategorized {
    title : string,
    yearAchieved: 2021,
    monthAchieved: 11,
    institution : string,
    insitutionLink : string,
    student : boolean,
    developer : boolean,
    mun: boolean,
    typeOfElement : typeOfElement,
}

export interface IGroupedElement {
    [key : string] : (IProjectCategorized | IActivityCategorized | IAwardCategorized)[]
}

export interface IRawContactData {
    data : {
        contactList : {
            contactList : IContact[]
        }
    }
} 

const possibleIconPackages = ["brands", "solid", "regular"] as const;

export interface IContact {
    link : string,
    typeOfContact : string,
    iconPackage : `fa-${typeof possibleIconPackages[number]}`,
    iconName : `fa-${string}`
}

export interface IRawTitleCodeToTitleData {
    data : {
        titlecodetotitle : {
            titlecodetotitle : ITitleCodeToTitle
        },
        titlecodearray : string[]
    }
}

export interface ITitleCodeToTitle {
    [key : string] : string
}

export type typeOfElement = "project" | "activity" | "award";
export type elementType = IActivity | IAward | IProject;
