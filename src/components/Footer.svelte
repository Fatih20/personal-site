<script lang="ts">
  import Icon from "svelte-awesome";
</script>

<head>
  <script
    src="https://kit.fontawesome.com/31a5898fa1.js"
    crossorigin="anonymous"></script>
</head>

<main>
  <div class="button-container">
    <button class="icon-container">
      <i class="fa-brands fa-github" />
    </button>
    <button class="icon-container">
      <i class="fa-brands fa-linkedin-in" />
    </button>
    <button class="icon-container">
      <i class="fa-brands fa-instagram" />
    </button>
  </div>
  <button class="email-button">
    <i class="fa-solid fa-envelope" />
    <p>Shoot an email!</p>
  </button>
</main>

<style>
  main {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
  .button-container {
    align-items: center;
    display: flex;
    justify-content: center;
  }

  .icon-container {
    align-items: center;
    background-color: rgba(0, 0, 0, 0);
    border: none;
    color: white;
    font-size: 2em;
    display: flex;
    justify-content: center;
    cursor: pointer;
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
