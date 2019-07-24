<script>
  import EventContainer from "./EventContainer";

  export let events;
</script>

<style>
  .timeline-events {
    --timeline-color: ivory;
    --timeline-margin: 5px;
    position: relative;
    padding-left: 1.5rem;
  }

  .timeline-events::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    bottom: 0;
    background: var(--timeline-color);
    width: 2px;
    left: 0;
    left: var(--timeline-margin);
    z-index: 9;
  }
</style>

<div class="timeline-events">
  {#each events as event (event)}
    <EventContainer {event} />
  {/each}
</div>
