import { writable } from 'svelte/store';
import type { RawData, typeOfElement, IProjectCategorized, IAwardCategorized, IActivityCategorized, IGroupedElement, elementType } from './types';

const queryAll = '{ allActivities { title details { ... on PartOfXRecord { partOfStudent partOfDeveloper partOfMunEnthusiast } ... on DescriptionRecord { description } ... on InstitutionRecord { institution institutionLink } ... on DurationRecord { ongoing monthEnd monthStart } }} allProjects { title details { ... on PartOfXRecord { partOfStudent partOfDeveloper partOfMunEnthusiast } ... on DescriptionRecord { description } ... on InstitutionRecord { institution institutionLink } ... on DurationRecord { ongoing monthEnd monthStart } } } allAwards { title yearAchieved monthAchieved proof { blurhash colors {hex} id } details { ... on PartOfXRecord { partOfStudent partOfDeveloper partOfMunEnthusiast } ... on InstitutionRecord { institution institutionLink } } } }'

async function getRawContentData (){
    const token = '0f152262756de7481e3f7e037fee93';

    try {
        const response = await fetch(
        'https://graphql.datocms.com/',
        {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': `Bearer ${token}`,
            },
            body: JSON.stringify({
            query: queryAll
            }),
        }
        )
    
        const data = await response.json() as RawData;
        return data;
    } catch (err) {
        console.log(err)
    }
}


export async function getContentData (){
    const rawData = await getRawContentData();
    const activityList = rawData.data.allActivities;
    const projectList = rawData.data.allProjects;
    const awardList = rawData.data.allAwards;
    
    function detailsDismantler (element : elementType) {
        const {details, ...rest } = element;
        const newElement = Object.assign(rest,...details);
        return newElement;
    }

    const categorizedElement = [
        ...activityList.map(detailsDismantler).map((activity) => {return {
            ...activity,
            typeOfElement : "activity"
        } as IActivityCategorized}),
        ...projectList.map(detailsDismantler).map((project) => {return {
            ...project,
            typeOfElement : "project"
        } as IProjectCategorized}),
        ...(awardList.map(detailsDismantler)).map((award) => {return {
            ...award,
            typeOfElement : "award"
        } as IAwardCategorized})
]

    const groupedElement : IGroupedElement = {
        student : categorizedElement.filter((element) => element.partOfStudent),
        developer : categorizedElement.filter((element) => element.partOfDeveloper),
        mun : categorizedElement.filter((element) => element.partOfMunEnthusiast)
    }

    return groupedElement;
}

export const titleList = writable(["Aspiring Web Developer", "Student of STEI ITB"]);

export const AchievementList = writable({
    "Aspiring Web Developer" : [
        {
            
        }
    ],
    "Student of STEI ITB" : [
        {

        }
    ]
})