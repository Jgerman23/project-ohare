<script>
  import archie from "../data/archie.json";
  import Dummy from "dummyjs";
  import Inner from "./Inner.svelte";

  const { terminal, peopleMover, runways } = archie.projects;
</script>

<style>
  hr {
    margin-left: auto;
    margin-right: auto;
  }
</style>

<section class="story">
  <p class="align-center">{Dummy.text(60)}</p>
  <hr />
  <Inner projects={terminal} title="Intl Terminal" />
  <hr />
  <Inner projects={peopleMover} title="People Mover" />
  <hr />
  <Inner projects={runways} title="Runways" />
</section>
