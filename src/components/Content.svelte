<script lang="ts">
  import Activity from "./elementComponent/Activity.svelte";
  import Project from "./elementComponent/Project.svelte";
  import Award from "./elementComponent/Award.svelte";

  import {
    IGroupedElement,
    ITitleCodeToTitle,
    elementCategorizedType,
    visibilityOfElementTypeType,
    typeOfElementList,
    typeOfElement,
    elementColorCodeType,
  } from "../data/types";
  import { element } from "svelte/internal";

  export let contentData: readonly [IGroupedElement, IGroupedElement];
  export let titleCodeToTitleData: ITitleCodeToTitle;

  type ongoingStatusSeenType = "all" | "ongoing" | "done";
  type elementShownType = typeOfElement | "all";

  $: [dataFromNew, dataFromOld] = contentData;

  $: possibleTitleList = Object.keys(titleCodeToTitleData);
  $: maxIndex = possibleTitleList.length - 1;

  let nthTitle = 0;

  $: {
    if (nthTitle > maxIndex) {
      nthTitle = 0;
    } else if (nthTitle < 0) {
      nthTitle = maxIndex;
    }
  }
  $: currentTitleCode = possibleTitleList[nthTitle];
  $: currentTitle = titleCodeToTitleData[currentTitleCode];

  let fromNew = true;

  $: shownElementList = (fromNew ? dataFromNew : dataFromOld)[currentTitleCode];

  let showAllElement = false;

  let ongoingStatusSeen: ongoingStatusSeenType = "all";
  let visibilityOfElementType: visibilityOfElementTypeType = {
    project: true,
    activity: true,
    award: true,
  };

  let elementShown = "all" as elementShownType;

  let elementColorCode: elementColorCodeType = {
    project: "#64baff",
    award: "#ffe16b",
    activity: "#ffa154",
  };

  function showAnElement(elementShownName: elementShownType) {
    if (elementShownName !== "all") {
      Object.keys(visibilityOfElementType).forEach((element) => {
        visibilityOfElementType[element] = false;
      });
      visibilityOfElementType[elementShownName] = true;
    } else {
      Object.keys(visibilityOfElementType).forEach((element) => {
        visibilityOfElementType[element] = true;
      });
    }
  }

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

  $: showAnElement(elementShown);

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
  <div id="title-and-toggle-container">
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
        class:toggle-shown={shownElementList.length >= 1}
        class:rotated-toggle={showAllElement}
        on:click={() => (showAllElement = !showAllElement)}
      >
        <i class="fa-solid fa-caret-down" />
      </button>
    </div>
  </div>
  <div class="element-list-container" class:element-shown={showAllElement}>
    <div class="element-category-container">
      {#each typeOfElementList as elementName (elementName)}
        <h2
          class="element-category"
          on:click={elementShown === elementName
            ? () => (elementShown = "all")
            : () => (elementShown = elementName)}
          style:text-decoration-color={elementColorCode[elementName]}
          style:filter={elementShown === elementName || elementShown === "all"
            ? "none"
            : "opacity(50%)"}
        >
          {elementName.toUpperCase()}
        </h2>
      {/each}
    </div>
    {#if filteredElementList.length > 0}
      {#each filteredElementList as element (element.title)}
        <div
          class="element-container"
          style:border-color={elementColorCode[element.typeOfElement]}
          style={`--line-color: ${elementColorCode[element.typeOfElement]}`}
        >
          {#if element.typeOfElement === "activity"}
            <Activity activityProps={element} />
          {:else if element.typeOfElement === "project"}
            <Project projectProps={element} />
          {:else if element.typeOfElement === "award"}
            <Award awardProps={element} />
          {/if}
        </div>
      {/each}
    {:else}
      <div id="empty-message-container">
        <h2>Nothing here (yet!)</h2>
      </div>
    {/if}
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

  #title-and-toggle-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    gap: 0.5em;
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
    display: flex;
    font-size: 2em;
    grid-column: 2/3;
    margin: 0;
    justify-content: center;
    padding: 0;
    transition: transform 0.25s;
    transition-timing-function: ease-in-out;
  }

  #show-toggle-container {
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    grid-template-rows: 1fr;
  }

  .rotated-toggle {
    transform: rotate(180deg);
  }

  .element-list-container {
    align-items: center;
    display: none;
    flex-direction: column;
    justify-content: center;
    gap: 1em;
    width: 100%;
  }

  .element-shown {
    display: flex;
  }

  .element-category-container {
    align-items: center;
    display: flex;
    justify-content: space-between;
    gap: 0.5em;
    width: 100%;
  }

  .element-category {
    font-size: 1.15em;
    font-weight: 800;
    text-decoration: underline;
    transition: filter 0.2s;
    transition-timing-function: ease-in-out;
  }

  .element-container {
    --gap-between-parts: 0.5em;
    box-sizing: border-box;
    border-style: solid;
    border-radius: 0.4em;
    border-width: 2px;
    display: flex;
    flex-direction: column;
    background-color: var(--foreground-element-color);
    padding: 0.75em;
    width: 100%;
  }

  #empty-message-container {
    padding: 1em;
  }
</style>
