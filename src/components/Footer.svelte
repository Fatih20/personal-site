<script lang="ts">
  import type { IContact } from "../data/types";

  export let contactData: IContact[];
  let contactDataExceptEmail: IContact[];
  let contactDataEmail: IContact;

  $: {
    if (contactData !== undefined) {
      contactDataExceptEmail = contactData.filter(
        (contact) => contact.typeOfContact !== "Email"
      );
      contactDataEmail = contactData.filter(
        (contact) => contact.typeOfContact === "Email"
      )[0];
    }
  }
</script>

<head>
  <script
    src="https://kit.fontawesome.com/31a5898fa1.js"
    crossorigin="anonymous"></script>
</head>

<main>
  <div class="contact-container">
    {#each contactDataExceptEmail as contact}
      <button
        class="icon-container"
        on:click={() => {
          window.open(contact.link);
        }}
      >
        <i class={`${contact.iconPackage} ${contact.iconName}`} />
      </button>
    {/each}
  </div>
  {#if contactDataEmail !== undefined}
    <button
      class="email-button"
      on:click={() => {
        window.open(`mailto:${contactDataEmail.link}`);
      }}
    >
      <i
        class={`${contactDataEmail.iconPackage} ${contactDataEmail.iconName}`}
      />
      <p>Shoot an email!</p>
    </button>
  {/if}
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .contact-container {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .icon-container {
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    cursor: pointer;
    display: flex;
    font-size: 2em;
    justify-content: center;
  }

  .email-button {
    /* If you wonder why this button for some reason has a padding, it comes from global.css */
    align-items: center;
    display: flex;
    justify-content: center;
    gap: 1em;
  }

  .fa-envelope {
    font-size: 1.5em;
  }
</style>
