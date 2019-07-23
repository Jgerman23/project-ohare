<script>
  import EventImage from "./EventImage";
  import md from "marked";

  export let events;

  String.prototype.hashCode = function() {
    var hash = 0,
      i = 0,
      len = this.length;
    while (i < len) {
      hash = ((hash << 5) - hash + this.charCodeAt(i++)) << 0;
    }
    return hash;
  };
</script>

<style lang="scss">
  .date-heading {
    margin-bottom: 0;
    padding-bottom: 1.2rem;
    line-height: 1;
    display: flex;
    align-items: center;
    font-size: 1.2rem;
    font-family: acumin-pro, sans-serif;
  }

  .date-heading:first-of-type {
    margin-top: 0;
  }

  .date-heading::before {
    content: "";
    display: inline-block;
    background: var(--timeline-color);
    width: 10px;
    height: 10px;
    border-radius: 50%;
    position: absolute;
    left: calc(var(--timeline-margin) - 4px);
  }

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

  .tl-event-container {
    padding-bottom: 3rem;
    padding-top: 2rem;
  }

  .tl-event {
    float: unset;
    margin-left: unset;
    max-width: unset;
  }

  .tl-event::before {
    content: "";
    display: block;
    width: 4rem;
    height: 4px;
    margin-bottom: 0.5rem;
  }

  .tl-event-container {
    display: flex;
    flex-direction: column;
    justify-content: center;

    height: auto;
    min-height: 100vh;
  }

  .tl-text {
    opacity: 0.5;
    transition: opacity 0.3s ease;

    :global(.is-active) & {
      opacity: 1;
    }
  }

  .tl-cutline {
    font-style: italic;
    font-size: small;
  }

  :global(.is-active) figure {
    pointer-events: all;
  }
</style>

<div class="timeline-events">
  {#each events as event, idx (event)}
    <div
      class="tl-event-container"
      id={`slide-${event.Description.hashCode()}`}>
      {#if event.image}
        <EventImage {...event.image} />
      {/if}
      <div class="tl-text">
        <div class="tl-text-contents">
          <h3 class="date-heading">{event.Date}</h3>
          <div class="tl-event">
            {@html md(event.Description)}
            {#if event.image}
              <p class="tl-cutline">{event.image.cutline}</p>
            {/if}
          </div>
        </div>
      </div>
    </div>
  {/each}
</div>
