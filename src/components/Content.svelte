<script lang="ts">
  import Activity from "./elementComponent/Activity.svelte";
  import Project from "./elementComponent/Project.svelte";
  import Award from "./elementComponent/Award.svelte";

  import type {
    IGroupedElement,
    ITitleCodeToTitle,
    elementCategorizedType,
    visibilityOfElementTypeType,
  } from "../data/types";

  export let contentData: readonly [IGroupedElement, IGroupedElement];
  export let titleCodeToTitleData: ITitleCodeToTitle;

  type ongoingStatusSeenType = "all" | "ongoing" | "done";

  $: [dataFromNew, dataFromOld] = contentData;

  $: possibleTitleList = Object.keys(titleCodeToTitleData);
  $: maxIndex = possibleTitleList.length - 1;

  let nthTitle = 1;
  $: {
    if (nthTitle > maxIndex) {
      nthTitle = 0;
    } else if (nthTitle < 0) {
      nthTitle = maxIndex;
    }
  }
  $: currentTitleCode = possibleTitleList[nthTitle];
  $: currentTitle = titleCodeToTitleData[currentTitleCode];
  $: console.log(currentTitleCode);
  $: console.log(currentTitle);

  let fromNew = true;

  $: usedData = (fromNew ? dataFromNew : dataFromOld)[currentTitleCode];
  $: console.log(usedData);

  let showAllElement = false;
  $: shownElementList = showAllElement
    ? (usedData as elementCategorizedType[])
    : (usedData.slice(0, 1) as elementCategorizedType[]);

  $: console.log(shownElementList);

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

    return result;
  }

  $: filteredElementList = filteredElementListGenerator(
    shownElementList,
    ongoingStatusSeen,
    visibilityOfElementType
  );

  $: console.log(filteredElementList);
</script>

<head>
  <script
    src="https://kit.fontawesome.com/31a5898fa1.js"
    crossorigin="anonymous"></script>
</head>

<main>
  <div class="title-container">
    <button class="title-switcher" on:click={() => (nthTitle += 1)}>
      <i class="fa-solid fa-caret-left" />
    </button>
    <div id="title-box">
      <h1 id="title">{currentTitle}</h1>
    </div>
    <button class="title-switcher" on:click={() => (nthTitle -= 1)}>
      <i class="fa-solid fa-caret-right" />
    </button>
  </div>
  <div id="element-list-container">
    <button
      class="show-toggle"
      class:toggle-shown={showAllElement && usedData.length > 1}
      on:click={() => (showAllElement = false)}
    >
      <i class="fa-solid fa-caret-up" />
    </button>
    {#each filteredElementList as element (element.title)}
      <div class="element-container">
        {#if element.typeOfElement === "activity"}
          <Activity activityProps={element} />
        {:else if element.typeOfElement === "project"}
          <Project projectProps={element} />
        {:else if element.typeOfElement === "award"}
          <Award awardProps={element} />
        {/if}
      </div>
    {/each}
    <button
      class="show-toggle"
      class:toggle-shown={!showAllElement && usedData.length > 1}
      on:click={() => (showAllElement = true)}
    >
      <i class="fa-solid fa-caret-down" />
    </button>
  </div>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 1em;
    justify-content: start;
  }

  .title-container {
    align-items: flex-start;
    display: flex;
    justify-content: center;
    text-align: center;
    width: 100%;

    /* border: solid 1px white; */
  }

  #title-box {
    align-items: center;
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    justify-content: center;
    margin: 0;
    padding: 0;
  }

  #title {
    font-size: 1.5em;

    /* border: solid 1px white; */
  }

  .show-toggle {
    background-color: var(--foreground-element-color);
    border: none;
    color: var(--text-element-color);
    display: none;
    margin: 0;
    padding: 0;
    width: 100%;
  }

  .toggle-shown {
    display: block;
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
    padding: 0;

    /* border: solid 1px white; */
  }

  #element-list-container {
    display: flex;
    flex-direction: column;
    gap: 1em;
  }

  .element-container {
    --gap-between-parts: 0.5em;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    background-color: var(--foreground-element-color);
    border-radius: 0.4em;
    padding: 0.75em;
  }
</style>
