<script>
  import archie from "../data/archie.json";
  import Inner from "./Inner.svelte";

  const { terminal, peopleMover, runways } = archie.projects;
  const { images } = archie;
</script>

<Inner projects={terminal} title="Intl Terminal" />

<Inner
  projects={peopleMover}
  title="People Movers"
  banner={images.peopleMover} />

<Inner projects={runways} title="Runways" banner={images.runways} />
