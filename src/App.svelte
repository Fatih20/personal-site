<script lang="ts">
  import NameSection from "./components/NameSection.svelte";
  import Content from "./components/Content.svelte";
  import Footer from "./components/Footer.svelte";
  import { onMount } from "svelte";
  import type { IContact, IGroupedElement } from "./data/types";
  import { getContactData, getContentData } from "./data/dataProcessor";

  let contentData: IGroupedElement;
  let contactData: IContact[];
  let pageIsFinishedLoading = false;

  onMount(async () => {
    contentData = await getContentData();
    contactData = await getContactData();
    pageIsFinishedLoading = true;
  });
</script>

<main>
  {#if pageIsFinishedLoading}
    <NameSection />
    <Content />
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
