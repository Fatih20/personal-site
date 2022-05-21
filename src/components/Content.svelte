<script lang="ts">
  import type { IGroupedElement, ITitleCodeToTitle } from "../data/types";

  export let contentData: IGroupedElement;
  export let titleCodeToTitleData: ITitleCodeToTitle;

  $: possibleTitleList = Object.keys(titleCodeToTitleData);
  $: maxIndex = possibleTitleList.length - 1;

  let nthTitle = 0;

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
  <div class="element-container" />
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
