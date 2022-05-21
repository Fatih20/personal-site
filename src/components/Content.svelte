<script lang="ts">
  import Activity from "./elementComponent/activity.svelte";
  import type {
    IGroupedElement,
    ITitleCodeToTitle,
    elementCategorizedType,
    IProjectCategorized,
    IActivityCategorized,
    typeOfElementList,
    typeOfElement,
  } from "../data/types";
  import Project from "./elementComponent/project.svelte";
  import Award from "./elementComponent/award.svelte";

  export let contentData: readonly [IGroupedElement, IGroupedElement];
  export let titleCodeToTitleData: ITitleCodeToTitle;

  const [dataFromNew, dataFromOld] = contentData;

  let usedData: IGroupedElement;

  type ongoingStatusSeenType = "all" | "ongoing" | "done";
  type visibilityOfElementTypeType = Record<typeOfElement, boolean>;

  $: possibleTitleList = Object.keys(titleCodeToTitleData);
  $: maxIndex = possibleTitleList.length - 1;

  let nthTitle = 0;
  $: currentTitleCode = possibleTitleList[nthTitle];
  $: currentTitle = titleCodeToTitleData[currentTitleCode];

  let fromNew = true;
  $: usedData = fromNew ? dataFromNew : dataFromOld;

  let showAllElement = true;
  $: shownElementList = showAllElement
    ? (usedData[currentTitleCode] as elementCategorizedType[])
    : (usedData[currentTitleCode].slice(0, 1) as elementCategorizedType[]);

  let ongoingStatusSeen: ongoingStatusSeenType = "all";
  let visibilityOfElementType: visibilityOfElementTypeType = {
    project: true,
    activity: true,
    award: true,
  };

  function filteredElementListGenerator(
    elementList: elementCategorizedType[],
    ongoingStatusSeen: ongoingStatusSeenType,
    visibilityOfElementType: visibilityOfElementTypeType
  ) {
    let result = elementList;

    Object.keys(visibilityOfElementType).forEach((elementType) => {
      if (!visibilityOfElementType[elementType]) {
        result = result.filter(
          (element) => element.typeOfElement !== elementType
        );
      }
    });

    if (ongoingStatusSeen === "ongoing") {
      result = result.filter((element) =>
        element.typeOfElement === "activity" ||
        element.typeOfElement === "project"
          ? element.ongoing
          : false
      );
    } else if (ongoingStatusSeen === "done") {
      result = result.filter((element) =>
        element.typeOfElement === "activity" ||
        element.typeOfElement === "project"
          ? !element.ongoing
          : true
      );
    }
    console.log(result);

    return result;
  }

  $: filteredElementList = filteredElementListGenerator(
    shownElementList,
    ongoingStatusSeen,
    visibilityOfElementType
  );

  $: console.log(filteredElementList);

  function changeTitle(increment) {
    if (increment) {
      if (nthTitle === maxIndex) {
        nthTitle = 0;
      } else {
        nthTitle += 1;
      }
    } else {
      if (nthTitle === 0) {
        nthTitle = maxIndex;
      } else {
        nthTitle -= 1;
      }
    }
  }
</script>

<head>
  <script
    src="https://kit.fontawesome.com/31a5898fa1.js"
    crossorigin="anonymous"></script>
</head>

<main>
  <div class="title-container">
    <button class="title-switcher" on:click={() => changeTitle(true)}>
      <i class="fa-solid fa-caret-left" />
    </button>
    <h1 id="title">{titleCodeToTitleData[possibleTitleList[nthTitle]]}</h1>
    <button class="title-switcher" on:click={() => changeTitle(false)}>
      <i class="fa-solid fa-caret-right" />
    </button>
  </div>
  <div class="element-container">
    {#each filteredElementList as element}
      {#if element.typeOfElement === "activity"}
        <Activity activityProps={element} />
      {:else if element.typeOfElement === "project"}
        <Project projectProps={element} />
      {:else if element.typeOfElement === "award"}
        <Award awardProps={element} />
      {/if}
    {/each}
  </div>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: start;
  }

  .title-container {
    align-items: center;
    display: flex;
    justify-content: center;

    /* border: solid 1px white; */
  }

  #title {
    /* border: solid 1px white; */
  }

  .title-switcher {
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: 2em;
    margin: 0;
    justify-content: center;
    padding: none;

    /* border: solid 1px white; */
  }
</style>
