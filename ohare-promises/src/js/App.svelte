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

<Inner projects={terminal} title="Intl Terminal" />
<hr />
<Inner projects={peopleMover} title="People Mover" />
<hr />
<Inner projects={runways} title="Runways" />
