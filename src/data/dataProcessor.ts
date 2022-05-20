import { writable } from 'svelte/store';
import type { RawData, typeOfElement, IProjectCategorized, IAwardCategorized, IActivityCategorized, IGroupedElement } from './types';

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

async function processRawContentData (){
    const rawData = await getRawContentData();
    const activityList = rawData.data.allActivities;
    const projectList = rawData.data.allProjects;
    const awardList = rawData.data.allAward;


    const categorizedElement = [
        ...activityList.map((activity) => {return {
        ...activity,
        typeOfElement : "activity" as typeOfElement
    } as IActivityCategorized}),
    ...projectList.map((project) => {return {
        ...project,
        typeOfElement : "project" as typeOfElement
    } as IProjectCategorized }),
    ...awardList.map((award) => {return {
        ...award,
        typeOfElement : "award" as typeOfElement
    } as IAwardCategorized})
]

    const groupedElement : IGroupedElement = {
        student : categorizedElement.filter((element) => element.details[element.details.length - 1].partOfMunEnthusiast)
    }

}

export async function getContentData () {
    return await processRawContentData()
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