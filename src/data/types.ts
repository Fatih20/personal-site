export interface IInstitutionInDetail {
    institution : string,
    institutionLink : string
}

export interface IDurationInDetail {
    ongoing: boolean,
    monthStart : number,
    yearStart : number,
    monthEnd : number | null,
    yearEnd : number | null
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
    projectLink : string,
    details : [IDurationInDetail, IDescriptionInDetail, IPartOfXInDetail]
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
    projectLink : string,
    ongoing: boolean,
    monthStart : number,
    yearStart : number,
    monthEnd : number | null,
    yearEnd : number | null,
    description : string,
    student : boolean,
    developer : boolean,
    mun: boolean,
    typeOfElement : "project",
}

export interface IActivityCategorized {
    title : string,
    institution : string,
    insitutionLink : string,
    ongoing: boolean,
    monthStart : number,
    yearStart : number,
    monthEnd : number | null,
    yearEnd : number | null,
    description : string,
    student : boolean,
    developer : boolean,
    mun: boolean,
    typeOfElement : "activity"
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
    typeOfElement : "award"
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

export const typeOfElementList = ["project", "activity", "award"] as const;

export type typeOfElement = typeof typeOfElementList[number];
export type elementType = IActivity | IAward | IProject;
export type elementCategorizedType = IActivityCategorized | IAwardCategorized | IProjectCategorized; 
export type visibilityOfElementTypeType = Record<typeOfElement, boolean>;

