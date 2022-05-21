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
    <NameSection />
    <Content {titleCodeToTitleData} {contentData} />
    <Footer {contactData} />
  {:else}
    <!-- Loading image or something -->
  {/if}
</main>

<style>
  main {
    padding: 0 1em;
  }
</style>
