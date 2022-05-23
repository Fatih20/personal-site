<script lang="ts">
  import NameSection from "./components/NameSection.svelte";
  import Content from "./components/Content.svelte";
  import Footer from "./components/Footer.svelte";
  import { onMount } from "svelte";
  import type {
    IContact,
    IGroupedElement,
    ITitleCodeToTitle,
  } from "./data/types";
  import {
    getContactData,
    getContentData,
    getTitleCodeToTitleData,
  } from "./data/dataProcessor";

  let contentData: readonly [IGroupedElement, IGroupedElement];
  let contactData: IContact[];
  let titleCodeToTitleData: ITitleCodeToTitle;
  let pageIsFinishedLoading = false;

  onMount(async () => {
    contactData = await getContactData();
    titleCodeToTitleData = await getTitleCodeToTitleData();
    contentData = await getContentData(titleCodeToTitleData);
    pageIsFinishedLoading = true;
  });
</script>

<main>
  {#if pageIsFinishedLoading}
    <div id="main-content-container">
      <NameSection />
      <Content {titleCodeToTitleData} {contentData} />
    </div>
    <div class="spacer" />
    <Footer {contactData} />
  {:else}
    <!-- Loading image or something -->
  {/if}
</main>

<style>
  main {
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    padding: 1em;
    min-height: 100vh;
  }

  #main-content-container {
    align-items: center;
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: center;
    gap: 1em;
  }

  .spacer {
    flex-grow: 1;
  }
</style>
