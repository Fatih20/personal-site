import type { IRawContentData, IRawContactData, typeOfElement, IProjectCategorized, IAwardCategorized, IActivityCategorized, IGroupedElement, elementType, IRawTitleCodeToTitleData, ITitleCodeToTitle } from './types';

const token = '0f152262756de7481e3f7e037fee93';

const queryAll = `
{
    allActivities {
      title
      details {
        ... on PartOfXRecord {
          student
          developer
          mun
        }
        ... on DescriptionRecord {
          description
        }
        ... on InstitutionRecord {
          institution
          institutionLink
        }
        ... on DurationRecord {
          ongoing
          monthEnd
          yearEnd
          monthStart
          yearStart
        }
      }}
    allProjects {
      title
      projectLink
      details {
        ... on PartOfXRecord {
          student
          developer
          mun
        }
        ... on DescriptionRecord {
          description
        }
        ... on DurationRecord {
          ongoing
          monthEnd
          yearEnd
          monthStart
          yearStart
        }
      }
    }
  
  allAwards {
      title
        yearAchieved
        monthAchieved
        proof {
        blurhash
        colors {hex}
          id
        }
      details {
        ... on PartOfXRecord {
          student
          developer
          mun
        }
        ... on InstitutionRecord {
          institution
          institutionLink
        }
      }
    }  
  }      
  `

const queryContact = `{
    contactList {
      contactList {
        iconName
        iconPackage
        typeOfContact
        link
      }
    }
  }`

const queryTitleCodeToTitle = `
{
    titlecodetotitle {
      titlecodetotitle
    }
} 
`

export async function getRawTitleCodeToTitleData () {
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
            query: queryTitleCodeToTitle
            }),
        }
        )
    
        const data = await response.json() as IRawTitleCodeToTitleData;
        return data;
    } catch (err) {
        console.log(err)
    }
}

export async function getTitleCodeToTitleData () {
    const rawData = await getRawTitleCodeToTitleData();
    const processedData  = rawData.data.titlecodetotitle.titlecodetotitle
    return processedData;
}

async function getRawContentData (){

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
    
        const data = await response.json() as IRawContentData;
        return data;
    } catch (err) {
        console.log(err)
    }
}


export async function getContentData (titleCodeToTitle : ITitleCodeToTitle){
    const rawData = await getRawContentData();
    const activityList = rawData.data.allActivities;
    const projectList = rawData.data.allProjects;
    const awardList = rawData.data.allAwards;

    const possibleTitleCodeList = Object.keys(titleCodeToTitle);
    
    function detailsDismantler (element : elementType) {
        const {details, ...rest } = element;
        const newElement = Object.assign(rest,...details);
        return newElement;
    }

    const categorizedElement = [
        ...activityList.map(detailsDismantler).map((activity) => {return {
            ...activity,
            typeOfElement : "activity",
        } as IActivityCategorized}),
        ...projectList.map(detailsDismantler).map((project) => {return {
            ...project,
            typeOfElement : "project",
        } as IProjectCategorized}),
        ...(awardList.map(detailsDismantler)).map((award) => {return {
            ...award,
            typeOfElement : "award"
        } as IAwardCategorized})
]

    const groupedElement : IGroupedElement = Object.assign({}, ...possibleTitleCodeList.map((possibleTitleCode) => {
        const object = {}
        object[possibleTitleCode] = categorizedElement.filter((element : any) => element[possibleTitleCode])
        return object
    }))

    return groupedElement;
}


async function getRawContactData (){

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
            query: queryContact
            }),
        }
        )
    
        const data = await response.json() as IRawContactData;
        return data;
    } catch (err) {
        console.log(err)
    }
}

export async function getContactData (){
    const rawData = await getRawContactData();
    const processedData = rawData.data.contactList.contactList;
    return processedData
}