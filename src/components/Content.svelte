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
  $: shownElementList = <elementCategorizedType[]>(
    (showAllElement ? usedData : [])
  );

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
  <div id="title-box">
    <div id="title-container">
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
    <div id="show-toggle-container">
      <button
        class="show-toggle"
        class:toggle-shown={usedData.length >= 1}
        class:rotated-toggle={showAllElement}
        on:click={() => (showAllElement = !showAllElement)}
      >
        <i class="fa-solid fa-caret-down" />
      </button>
    </div>
  </div>
  <div id="element-list-container">
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

  #title-box {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
  }

  #title-container {
    display: grid;
    grid-template-columns: auto 1fr auto;
    grid-template-rows: 1fr;
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
  .show-toggle {
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    cursor: pointer;
    display: none;
    font-size: 2em;
    margin: 0;
    justify-content: center;
    padding: 0;
    transition: transform 0.25s;
    transition-timing-function: ease-in-out;
    grid-column: 2/3;
  }

  #show-toggle-container {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr auto 1fr;
  }

  .rotated-toggle {
    transform: rotate(180deg);
  }

  .toggle-shown {
    display: flex;
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
