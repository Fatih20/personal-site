<script lang="ts">
</script>

<head>
  <script
    src="https://kit.fontawesome.com/31a5898fa1.js"
    crossorigin="anonymous"></script>
</head>

<main>
  <div class="title-container">
    <button class="title-switcher">
      <i class="fa-solid fa-caret-left" />
    </button>
    <h1 id="title">Title</h1>
    <button class="title-switcher">
      <i class="fa-solid fa-caret-right" />
    </button>
  </div>
  <div class="achievement-container" />
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
