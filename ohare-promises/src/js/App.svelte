<script>
  import archie from "../data/archie.json";
  import Inner from "./Inner.svelte";

  const { terminal, peopleMover, runways } = archie.projects;
</script>

<Inner projects={terminal} title="Intl Terminal" />

<Inner projects={peopleMover} title="People Mover" />

<Inner projects={runways} title="Runways" />
